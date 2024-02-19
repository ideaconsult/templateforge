import { useEffect } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { json } from "./json";
import { themeJson } from "./theme";

import { postRequestUUID } from "../lib/request";
import { useIsShosen, useUuid } from "../store/store";

import config from "../utils/config";

import "survey-core/defaultV2.min.css";
import "../App.css";

// eslint-disable-next-line react/prop-types
function SurveyComponent({ setResult }) {
  const survey = new Model(json);
  const UUID = useUuid();
  const idShosen = useIsShosen();

  const id = idShosen ? idShosen : UUID;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getTemplateInfo() {
    const apiUrl = config.apiUrl;
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    survey.data = data;
  }

  useEffect(() => {
    getTemplateInfo();
    console.log("effect mount");
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
  }

  survey.onCurrentPageChanged.add(saveSurveyData);

  // Restore survey results
  const prevData = window.localStorage.getItem(storageItemKey) || null;
  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

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
