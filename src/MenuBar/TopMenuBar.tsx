// @ts-nocheck
import React, { useState } from "react";
import { useSetSaveOnServer, useSetUuid, useUuid } from "../store/store";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import config from "../utils/config";

export default function TopMenuBar({ uuid }) {
  const [copied, setCopied] = useState(false);
  const setUUID = useSetUuid();
  const save = useSetSaveOnServer();
  const navigate = useNavigate();
  const apiUrl = config.apiUrl;
  const urlToCopy = import.meta.env.PROD
    ? `https://enanomapper.adma.ai/designer?uuid=${uuid}`
    : `http://localhost:5173/designer?uuid=${uuid}`;

  const copyLink = () => {
    uuid && navigator.clipboard.writeText(urlToCopy);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);
  
  return (
    <div className="topMenuBar">
      <div className="saveUuid">
        <div onClick={() => save()}>
          <Button label="Save" />
        </div>
        <div
          onClick={() => {
            copyLink();
            setCopied(true);
          }}
        >
          <Button label={copied ? "Copied to clipboard!" : "Share"} />
        </div>
      </div>
      <button
        className="createNewBtn"
        onClick={async () => {
          let res = await fetch(
            `${apiUrl}`,
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
