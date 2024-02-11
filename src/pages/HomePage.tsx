import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import StartScreenComp from "../StartScreenComp/StartScreenComp";

export default function HomePage() {
  const [surveyReset, setSurveyReset] = useState(false);
  const [templateURL, setTemplateURL] = useState("");

  const data = useLoaderData();

  return <StartScreenComp setSurveyReset={setSurveyReset} data={data} />;
}
