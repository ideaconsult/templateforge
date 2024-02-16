import { useEffect, useRef } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { json } from "./json";
import { themeJson } from "./theme";

import { useUuid, useIsShosen, useSaveOnServer } from "../store/store";
import { postRequestUUID } from "../lib/request";

import useSWR from "swr";

import { fetcher } from "../lib/fetcher";

import "survey-core/defaultV2.min.css";
import "../App.css";

// eslint-disable-next-line react/prop-types
function SurveyComponent({ setResult }) {
  const survey = new Model(json);
  const UUID = useUuid();
  const idShosen = useIsShosen();

  const didMount = useRef(false);
  const toggle = useSaveOnServer();

  const id = idShosen ? idShosen : UUID;

  const { dataTemp } = useSWR(
    `https://api.ramanchada.ideaconsult.net/template/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log("survey UUID", UUID);
  console.log("survey Shosen", idShosen);

  useEffect(() => {
    if (didMount.current) {
      postRequestUUID(survey.data, id);
    } else {
      didMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

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
  const fetchData = (dataTemp && dataTemp) || null;
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
    postRequestUUID(sender.data, id);
  });
  return <Survey model={survey} />;
}

export default SurveyComponent;
