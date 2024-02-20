import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";

import {
  useSetUuid,
  useName,
  useSetName,
  useAuthor,
  useSetAuthor,
  useAcknowledgment,
  useSetAcknowledgment,
  useIsShosen,
  useSetIsShosen,
} from "../store/store";
import "./styles.css";

import config from "../utils/config";
import { postRequestCopy } from "../lib/request";

const MakeCopyDialog = () => {
  const setUUID = useSetUuid();
  const name = useName();
  const setName = useSetName();
  const author = useAuthor();
  const setAuthor = useSetAuthor();
  const acknowledgment = useAcknowledgment();
  const setAcknowledgment = useSetAcknowledgment();

  const idShosen = useIsShosen();
  const setIdShosen = useSetIsShosen();
  const [data, setData] = useState<{} | null>(null);
  const [newUUID, setNewUUID] = useState(null);

  const apiUrl = config.apiUrl;

  async function getTemplateInfo() {
    const response = await fetch(`${apiUrl}/${idShosen}`);
    const data = await response.json();
    setData(data);
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
        <button
          className="buttonMenu"
          disabled={!idShosen ? true : false}
          onClick={() => {
            getTemplateInfo();
          }}
        >
          Make a Copy
        </button>
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
              placeholder="copy"
            />
          </fieldset>
          {!name && <p className="warning">Please enter Draft name</p>}
          <fieldset className={author ? "FieldsetFilled" : "Fieldset"}>
            <input
              className="Input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              id="author"
            />
          </fieldset>
          {!author && <p className="warning">Please enter Author name</p>}
          <fieldset className={acknowledgment ? "FieldsetFilled" : "Fieldset"}>
            <input
              className="Input"
              value={acknowledgment}
              onChange={(e) => setAcknowledgment(e.target.value)}
              id="template_acknowledgment"
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
