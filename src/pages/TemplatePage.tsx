import React, { useState } from "react";
import LogoBar from "../MenuBar/LogoBar";
import TopMenuBar from "../MenuBar/TopMenuBar";
import SurveyComponent from "../SurveyComp/SurveyComp";
import { useParams, useLoaderData } from "react-router-dom";

import "../App.css";

import { useIntermediateData } from "../store/store";

export default function TemplatePage() {
  const params = useParams<{ templateId: string }>();
  const data = useLoaderData();

  const interData = useIntermediateData();
  console.log(interData);

  const [result, setResult] = useState(null);
  const [surveyReset, setSurveyReset] = useState(false);
  return (
    <div>
      <div className="headerWrap">
        <LogoBar startScreen={false} uuid={params.templateId} />
        <TopMenuBar uuid={params.templateId} />
      </div>
      <div className="mainWrap">
        <SurveyComponent data={data} setResult={setResult} />
      </div>
    </div>
  );
}
