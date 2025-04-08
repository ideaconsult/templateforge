import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validate } from "uuid";
import LogoBar from "../MenuBar/LogoBar";
import TopMenuBar from "../MenuBar/TopMenuBar";
import SurveyComponent from "../SurveyComp/SurveyComp";
import { useSetUuid } from "../store/store";

import "../App.css";

export default function TemplatePage({ uuid }) {
  const params = useParams<{ templateId: string }>();
  const setUUID = useSetUuid();
  const navigate = useNavigate();

  useEffect(() => {
    if (!uuid) setUUID(params.templateId);

    if (!validate(params.templateId)) {
      navigate(`/404`);
    }
  }, [params.templateId]);

  const [result, setResult] = useState(null);

  return (
    <div>
      <div className="headerWrap">
        <LogoBar startScreen={false} />
        <TopMenuBar />
      </div>
      <div className="mainWrap">
        <SurveyComponent setResult={setResult} uuid={uuid} />
      </div>
    </div>
  );
}
