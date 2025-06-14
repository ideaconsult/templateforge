import { useEffect, useState } from "react";
import { Model, FunctionFactory } from "survey-core";
import { Survey } from "survey-react-ui";
import { themeJson } from "./theme";

import $ from "jquery";
import * as SurveyCore from "survey-core";
import { autocomplete } from "surveyjs-widgets";

import { postRequestUUID } from "../lib/request";
import {
  useIsShosen,
  useUuid,
  useSetIntermediateData,
  useViewMode,
} from "../store/store";

import { useLocation } from "react-router-dom";
import config from "../utils/config";

import "survey-core/defaultV2.min.css";
import "../App.css";

const orcidPattern = /^\d{4}-\d{4}-\d{4}-(\d{4}|[Xx])$/;

function isValidOrcid([ORCID]) {
  return orcidPattern.test(ORCID);
}
FunctionFactory.Instance.register("isValidOrcid", isValidOrcid);

// eslint-disable-next-line react/prop-types
function SurveyComponent({ setResult }) {
  const [surveyJson, setSurveyJson] = useState(null);
  const [survey, setSurvey] = useState(null);

  const UUID = useUuid();
  const idShosen = useIsShosen();
  const setIntermediateData = useSetIntermediateData();
  const viewMode = useViewMode();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuidParams = queryParams.get("uuid");
  const viewParams = queryParams.get("mode");

  const id = idShosen ? idShosen : UUID || uuidParams;

  // Load schema once (from localStorage or API)
  useEffect(() => {
    async function loadSchema() {
      try {
        const response = await fetch(`${config.apiUrl}/../definition/template_designer`);
        const json = await response.json();
        localStorage.setItem("surveyJson", JSON.stringify(json));
        setSurveyJson(json);
      } catch (err) {
        console.error("Failed to fetch survey schema", err);
      }
    }

    loadSchema();
  }, []);

  // Create Survey model once JSON is available
  useEffect(() => {
    if (!surveyJson) return;

    const model = new Model(surveyJson);
    model.applyTheme(themeJson);

    window["$"] = window["jQuery"] = $;
    autocomplete(SurveyCore);

    model.addNavigationItem({
      id: "sv-nav-clear-page",
      title: "Clear Page",
      action: () => {
        model.currentPage.questions.forEach((question) => {
          question.value = undefined;
        });
      },
      css: "nav-button",
      innerCss: "sd-btn nav-input",
    });

    model.addLayoutElement({
      id: "new-el",
      component: "sv-progressbar-percentage",
      container: "sd-action-bar",
      data: model,
    });

    const storageItemKey = "my-survey";

    function saveSurveyData(survey) {
      postRequestUUID(survey.data, id);
      setIntermediateData(survey.data);
    }

    function saveinLocalSurveyData(survey) {
      setIntermediateData(survey.data);
      const data = survey.data;
      data.pageNo = survey.currentPageNo;
      window.localStorage.setItem(storageItemKey, JSON.stringify(data));
    }

    model.onValueChanged.add(saveinLocalSurveyData);
    model.onCurrentPageChanged.add(saveSurveyData);

    model.onComplete.add(() => {
      window.localStorage.setItem(storageItemKey, "");
    });

    model.completedHtml = "Thank you for finalizing the template";

    model.onComplete.add(function (sender, options) {
      if (model.validationAllowComplete) {
        setResult(sender.data);
        options.showSaveInProgress();
        postRequestUUID(sender.data, id);
      }
    });

    setSurvey(model);
  }, [surveyJson]);

  // Fetch survey data (answers) by ID
  useEffect(() => {
    async function getTemplateInfo() {
      if (!survey) return;

      try {
        const apiUrl = config.apiUrl;
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();

        setIntermediateData(data);
        survey.data = data;
        if (viewMode || !viewParams) {
          survey.mode = "display";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getTemplateInfo();
  }, [survey, id, viewMode, viewParams, setIntermediateData]);

  if (!survey) return <div>Loading survey...</div>;

  return <Survey model={survey} />;
}

export default SurveyComponent;
