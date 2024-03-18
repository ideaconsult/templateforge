import { useEffect } from "react";
import { Model } from "survey-core";
import { FunctionFactory } from "survey-core";
import { Survey } from "survey-react-ui";
import { json } from "./json";
import { themeJson } from "./theme";

import { postRequestUUID } from "../lib/request";
import { useIsShosen, useUuid, useSetIntermediateData } from "../store/store";

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

  const id = idShosen ? idShosen : UUID;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getTemplateInfo() {
    const apiUrl = config.apiUrl;
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    survey.data = data;
  }

  console.log(survey.data.PROTOCOL_TOP_CATEGORY);

  useEffect(() => {
    getTemplateInfo();
  }, [getTemplateInfo, id]);

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

  const storageItemKey = "my-survey";

  function saveSurveyData(survey) {
    postRequestUUID(survey.data, id);
    setIntermediateData(survey.data);
  }

  // function saveinLocalSurveyData(survey) {
  //   setIntermediateData(survey.data);
  //   const data = survey.data;
  //   data.pageNo = survey.currentPageNo;
  //   window.localStorage.setItem(storageItemKey, JSON.stringify(data));
  // }

  // Save survey results to the local storage
  // survey.onValueChanged.add(saveinLocalSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);

  // Empty the local storage after the survey is completed
  survey.onComplete.add(() => {
    window.localStorage.setItem(storageItemKey, "");
  });

  survey.applyTheme(themeJson);

  survey.onComplete.add(function (sender, options) {
    setResult(sender.data);
    options.showSaveInProgress();
    postRequestUUID(sender.data, id);
  });
  return <Survey model={survey} />;
}

export default SurveyComponent;
