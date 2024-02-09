import { useEffect } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { json } from "./json";
import { themeJson } from "./theme";

import { useUuid } from "../store/store";
import { postRequestUUID } from "../lib/request";

import "survey-core/defaultV2.min.css";

// eslint-disable-next-line react/prop-types
function SurveyComponent({ setResult, surveyReset, data }) {
  const survey = new Model(json);
  const UUID = useUuid();

  useEffect(() => {
    surveyReset && !UUID && survey.clear();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyReset, UUID]);

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

  // function saveSurveyData(survey) {
  //   const data = survey.data;

  //   setResult(data);
  // }

  // survey.onValueChanged.add(saveSurveyData);
  // survey.onCurrentPageChanged.add(saveSurveyData);

  const prevData = window.localStorage.getItem(storageItemKey) || null;
  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
    // eslint-disable-next-line react/prop-types
    if (data.pageNo) {
      // eslint-disable-next-line react/prop-types
      survey.currentPageNo = data.pageNo;
    }
  }
  const fetchData = (data && data) || null;
  if (fetchData) {
    const data = fetchData;
    survey.data = data;
    // if (data.pageNo) {
    //   survey.currentPageNo = data.pageNo;
    // }
  }

  survey.applyTheme(themeJson);

  survey.onComplete.add(function (sender, options) {
    setResult(sender.data);
    options.showSaveInProgress();
    postRequestUUID(sender.data, UUID);
  });
  return <Survey model={survey} />;
}

export default SurveyComponent;
