// @ts-nocheck
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";

import {
  useAcknowledgment,
  useAuthor,
  useIsShosen,
  useName,
  useSetAcknowledgment,
  useSetAuthor,
  useSetIsShosen,
  useSetName,
  useSetUuid,
} from "../store/store";
import "./styles.css";

import MakeCopyIcon from "@/IconsComponents/MakeCopyIcon";

import config from "../utils/config";

const MakeCopyDialog = () => {
  const setUUID = useSetUuid();

  const idShosen = useIsShosen();
  const setIdShosen = useSetIsShosen();
  const [data, setData] = useState<{} | null>(null);
  const [newUUID, setNewUUID] = useState(null);

  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [acknowledgment, setAcknowledgment] = useState();

  const apiUrl = config.apiUrl;

  async function getTemplateInfo() {
    const response = await fetch(`${apiUrl}/${idShosen}`);
    const data = await response.json();
    setData(data);
    setName(data?.template_name || "");
    setAuthor(data?.template_author || "");
    setAcknowledgment(data?.template_acknowledgment || "");
  }

  async function postRequestCopy() {
    const response = await fetch(`${apiUrl}/${idShosen}/copy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        template_name: name,
        template_status: "DRAFT",
        template_author: author,
        template_acknowledgment: acknowledgment,
      }),
    });
    let result = await response.json();

    if (result.result_uuid) {
      setUUID(result.result_uuid);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="buttonMenu">
          <MakeCopyIcon disabled={!idShosen ? true : false} />
          <button
            style={{ backgroundColor: "transparent" }}
            id="makeCopy"
            data-cy="copy-btn"
            disabled={!idShosen ? true : false}
            onClick={() => {
              getTemplateInfo();
            }}
          >
            Make a Copy
          </button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Make a Copy</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Please define a draft's name and author.
            <br />
            Click a Make a Copy button when you're done.
          </Dialog.Description>
          <fieldset className={name ? "FieldsetFilled" : "Fieldset"}>
            <input
              autoFocus
              className="Input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              data-cy="name-input"
            />
          </fieldset>
          {!name && <p className="warning">Please enter Draft name</p>}
          <fieldset className={author ? "FieldsetFilled" : "Fieldset"}>
            <input
              className="Input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              id="author"
              data-cy="author-input"
            />
          </fieldset>
          {!author && <p className="warning">Please enter Author name</p>}
          <fieldset className={acknowledgment ? "FieldsetFilled" : "Fieldset"}>
            <input
              className="Input"
              value={acknowledgment}
              onChange={(e) => setAcknowledgment(e.target.value)}
              id="template_acknowledgment"
              data-cy="acknowledgment-input"
            />
          </fieldset>
          {!acknowledgment && (
            <p className="warning">Please enter Acknowledgment name</p>
          )}
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                disabled={name == "" && author == "" && acknowledgment == ""}
                className="Button"
                onClick={() => {
                  postRequestCopy();
                  setIdShosen(newUUID);
                }}
              >
                Make a Copy
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MakeCopyDialog;
