// @ts-nocheck
import React, { useState } from "react";
import { useSetSaveOnServer } from "../store/store";
import Button from "../ui/Button";
import "./Header.css";

import {
  useAcknowledgment,
  useAuthor,
  useName,
  useSetAcknowledgment,
  useSetAuthor,
  useSetName,
  useSetUuid,
  useUuid,
} from "../store/store";

export default function TopMenuBar() {
  const [copied, setCopied] = useState(false);

  const save = useSetSaveOnServer();

  const uuid = useUuid();
  const setUUID = useSetUuid();
  const name = useName();
  const setName = useSetName();
  const author = useAuthor();
  const setAuthor = useSetAuthor();
  const acknowledgment = useAcknowledgment();
  const setAcknowledgment = useSetAcknowledgment();

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
    <div>
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
        {/* <CreateNewDialog /> */}
      </div>
    </div>
  );
}
