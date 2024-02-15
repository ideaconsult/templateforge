// @ts-nocheck
import React, { useState } from "react";
import CreateNewDialog from "../DialogComp/CreateNewDialog";
import { useSetSaveOnServer } from "../store/store";
import Button from "../ui/Button";
import "./Header.css";

import {
  useUuid,
  useSetUuid,
  useName,
  useSetName,
  useAuthor,
  useSetAuthor,
  useAcknowledgment,
  useSetAcknowledgment,
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
          </div>{" "}
          <p className="name">
            <span className="uuidWORD">NAME:</span> {name}
          </p>
          <p className="name">
            <span className="uuidWORD">AUTHOR:</span> {author}
          </p>
          <p className="name">
            <span className="uuidWORD">acknowledgment:</span> {acknowledgment}
          </p>
        </div>
        {/* <CreateNewDialog /> */}
      </div>
    </div>
  );
}
