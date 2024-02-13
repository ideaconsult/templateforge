// @ts-nocheck
import React from "react";
import { useSetSaveOnServer, useSetUuid, useUuid } from "../store/store";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function TopMenuBar({ uuid }) {
  const setUUID = useSetUuid();
  const save = useSetSaveOnServer();
  const navigate = useNavigate();

  const urlToCopy = import.meta.env.PROD
    ? `https://enanomapper.adma.ai/designer/template/${uuid}`
    : `http://localhost:5173/designer/template/${uuid}`;

  const copyLink = () => {
    uuid && navigator.clipboard.writeText(urlToCopy);
  };
  return (
    <div className="topMenuBar">
      <div className="saveUuid">
        <div onClick={() => save()}>
          <Button label="Save" />
        </div>
        <div onClick={() => copyLink()}>
          <Button label="Share" />
        </div>
      </div>
      <button
        className="createNewBtn"
        onClick={async () => {
          let res = await fetch(
            "https://api.ramanchada.ideaconsult.net/template",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          let result = await res.json();
          if (result.result_uuid) {
            navigate(`/template/${result.result_uuid}`);
          }
        }}
      >
        Create a new Draft
      </button>
    </div>
  );
}
