import { useEffect } from "react";
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";
import { Survey } from "survey-react-ui";
import { json } from "./json";
import { themeJson } from "./theme";

import { fetcher } from "../lib/fetcher";

import useSWR from "swr";

// eslint-disable-next-line react/prop-types
function SurveyComponent({ setResult, surveyReset, templateURL }) {
  const { data } = useSWR(templateURL ? `${templateURL}` : null, fetcher);

  const survey = new Model(json);

  useEffect(() => {
    surveyReset && survey.clear();
    surveyReset && window.localStorage.setItem(storageItemKey, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyReset]);

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

  // survey.addNavigationItem({
  //   id: "sv-nav-clear-all",
  //   title: "Start Over",
  //   action: () => {
  //     survey.clear();
  //   },
  //   css: "nav-button",
  //   innerCss: "sd-btn nav-input",
  // });

  survey.addLayoutElement({
    id: "new-el",
    component: "sv-progressbar-percentage",
    container: "sd-action-bar",
    data: survey,
  });

  const storageItemKey = "my-survey";

  // function saveSurveyData(survey) {
  //   const data = survey.data;
  //   data.pageNo = survey.currentPageNo;
  //   window.localStorage.setItem(storageItemKey, JSON.stringify(data));
  //   setResult(JSON.stringify(data, null, 3));
  // }

  // survey.onValueChanged.add(saveSurveyData);
  // survey.onCurrentPageChanged.add(saveSurveyData);

  const prevData = window.localStorage.getItem(storageItemKey) || null;
  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
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

  // survey.onComplete.add(() => {
  //   window.localStorage.setItem(storageItemKey, "");
  // });

  survey.applyTheme(themeJson);

  survey.onComplete.add(function (sender, options) {
    console.log(JSON.stringify(sender.data, null, 3));

    setResult(sender.data);

    options.showSaveInProgress();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.ramanchada.ideaconsult.net/template");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = xhr.onerror = function () {
      if (xhr.status == 200) {
        // Display the "Success" message (pass a string value to display a custom message)
        options.showSaveSuccess();
        // Alternatively, you can clear all messages:
        // options.clearSaveMessages();
      } else {
        // Display the "Error" message (pass a string value to display a custom message)
        options.showSaveError();
      }
    };
    xhr.send(JSON.stringify(sender.data));
  });
  return <Survey model={survey} />;
}

export default SurveyComponent;
