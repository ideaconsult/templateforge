import React, { useEffect } from "react";
import StartScreenComp from "../StartScreenComp/StartScreenComp";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuidParams = queryParams.get("uuid");

  const navigate = useNavigate();

  useEffect(() => {
    if (uuidParams) {
      navigate(`/template/${uuidParams}`);
    }
  }, [uuidParams]);

  return <StartScreenComp />;
}
