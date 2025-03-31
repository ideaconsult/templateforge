import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LogoBar from "../MenuBar/LogoBar";
import TopMenuBar from "../MenuBar/TopMenuBar";
import SurveyComponent from "../SurveyComp/SurveyComp";
import { useSetUuid } from "../store/store";

import "../App.css";

export default function TemplatePage({ uuid, setProjectID, projectID }) {
  const params = useParams<{ templateId: string }>();
  const setUUID = useSetUuid();

  if (!uuid) setUUID(params.templateId);

  const [result, setResult] = useState(null);

  return (
    <div>
      <div className="headerWrap">
        <LogoBar
          startScreen={false}
          uuid={uuid}
          setProjectID={setProjectID}
          projectID={projectID}
        />
        <TopMenuBar />
      </div>
      <div className="mainWrap">
        <SurveyComponent setResult={setResult} uuid={uuid} />
      </div>
    </div>
  );
}
