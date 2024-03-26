// @ts-nocheck
import React, { useState } from "react";
import { useSetSaveOnServer } from "../store/store";
import Button from "../ui/Button";
import "./Header.css";

import config from "../utils/config";

import { useIntermediateData, useUuid } from "../store/store";

import { postRequestUUID, downloadFile } from "../lib/request";

export default function TopMenuBar() {
  const [copied, setCopied] = useState(false);

  const save = useSetSaveOnServer();

  const uuid = useUuid();
  const interData = useIntermediateData();

  const apiUrl = config.apiUrl;
  const templateURL = `${apiUrl}/${uuid}?format=xlsx`;

  const urlToCopy = import.meta.env.PROD
    ? `https://enanomapper.adma.ai/designer?uuid=${uuid}`
    : `http://localhost:5173/designer?uuid=${uuid}`;

  const copyLink = () => {
    uuid && navigator.clipboard.writeText(urlToCopy);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);

  console.log(interData);

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
          <div onClick={() => downloadFile(uuid, templateURL)}>
            <Button label="Generate Excel Template" />
          </div>
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
