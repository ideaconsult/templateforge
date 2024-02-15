import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LogoBar from "../MenuBar/LogoBar";
import TopMenuBar from "../MenuBar/TopMenuBar";
import SurveyComponent from "../SurveyComp/SurveyComp";

import "../App.css";

export default function TemplatePage({ uuid }) {
  const params = useParams<{ templateId: string }>();

  const [result, setResult] = useState(null);

  return (
    <div>
      <div className="headerWrap">
        <LogoBar startScreen={false} uuid={uuid} />
        <TopMenuBar uuid={uuid} />
      </div>
      <div className="mainWrap">
        <SurveyComponent setResult={setResult} uuid={uuid} />
      </div>
    </div>
  );
}
