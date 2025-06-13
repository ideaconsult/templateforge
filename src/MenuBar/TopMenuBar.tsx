// @ts-nocheck
import React, { useState } from "react";
import { useSetSaveOnServer } from "../store/store";
import Button from "../ui/Button";
import Notification from "@/DialogComp/Notification";
import "./Header.css";

import config from "../utils/config";

import { useIntermediateData, useUuid, useProjectID } from "../store/store";

import { postRequestUUID, downloadFile } from "../lib/request";

export default function TopMenuBar() {
  const [copied, setCopied] = useState(false);

  const save = useSetSaveOnServer();

  const uuid = useUuid();
  const interData = useIntermediateData();
  const projectID = useProjectID();
  const [showNotification, setShowNotification] = useState(false);

  const apiUrl = config.apiUrl;

  const templateURL = `${apiUrl}/${uuid}?format=xlsx&project=${projectID}`;

  const urlToCopy = import.meta.env.PROD
    ? `${window.location.href}`
    : `http://localhost:5173/templates?uuid=${uuid}`;

  const copyLink = () => {
    uuid && navigator.clipboard.writeText(urlToCopy);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);

  setTimeout(() => {
    setShowNotification(false);
  }, 8000);

  return (
    <div>
      <div className="topMenuBar">
        <div className="saveUuid">
          <div onClick={() => postRequestUUID(interData, uuid)}>
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
          {showNotification && (
            <Notification mode="TemplateScreen">
              Project is not selected. &nbsp;
              <button
                onClick={() => downloadFile(uuid, templateURL)}
                className="genAnyway"
              >
                Generate anyway
              </button>
            </Notification>
          )}
          {projectID ? (
            <div onClick={() => downloadFile(uuid, templateURL)}>
              <Button label="Generate Excel Template" />
            </div>
          ) : (
            <div onClick={() => setShowNotification(true)}>
              <Button label="Generate Excel Template" />
            </div>
          )}
        </div>
        {uuid && (
          <p className="uuid">
            <span className="uuidWORD">UUID:</span> {uuid}
          </p>
        )}
      </div>
    </div>
  );
}
