import { useEffect } from "react";
import { Model } from "survey-core";
import { FunctionFactory } from "survey-core";
import { Survey } from "survey-react-ui";
import { json } from "./json";
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

var orcidPattern = /^\d{4}-\d{4}-\d{4}-(\d{4}|[Xx])$/;

function isValidOrcid([ORCID]) {
  return orcidPattern.test(ORCID);
}
FunctionFactory.Instance.register("isValidOrcid", isValidOrcid);

// eslint-disable-next-line react/prop-types
function SurveyComponent({ setResult }) {
  const survey = new Model(json);
  const UUID = useUuid();
  const idShosen = useIsShosen();
  const setIntermediateData = useSetIntermediateData();
  const viewMode = useViewMode();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuidParams = queryParams.get("uuid");
  const viewParams = queryParams.get("mode");

  const id = idShosen ? idShosen : UUID || uuidParams;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getTemplateInfo() {
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

  useEffect(() => {
    getTemplateInfo();
  }, [getTemplateInfo]);

  window["$"] = window["jQuery"] = $;
  // require("easy-autocomplete/dist/jquery.easy-autocomplete.js");
  autocomplete(SurveyCore);

  survey.addNavigationItem({
    id: "sv-nav-clear-page",
    title: "Clear Page",
    action: () => {
      survey.currentPage.questions.forEach((question) => {
        question.value = undefined;
      });
    },
    css: "nav-button",
    innerCss: "sd-btn nav-input",
  });

  survey.addLayoutElement({
    id: "new-el",
    component: "sv-progressbar-percentage",
    container: "sd-action-bar",
    data: survey,
  });
  // console.log("HasErrors", survey.isCurrentPageHasErrors);
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

  // Save survey results to the local storage
  survey.onValueChanged.add(saveinLocalSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);

  // Empty the local storage after the survey is completed
  survey.onComplete.add(() => {
    window.localStorage.setItem(storageItemKey, "");
  });

  survey.applyTheme(themeJson);

  survey.completedHtml = "Thank you for finalizing the template";

  survey.onComplete.add(function (sender, options) {
    // onCoplete Check
    if (survey.validationAllowComplete) {
      setResult(sender.data);
      options.showSaveInProgress();
      postRequestUUID(sender.data, id);
    }
  });
  return (
    <>
      <Survey model={survey} />
    </>
  );
}

export default SurveyComponent;
