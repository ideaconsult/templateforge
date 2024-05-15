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

import config from "../utils/config";
import { Link } from "react-router-dom";
import Button from "@/ui/Button";

const ProcessingBluePrintDialog = () => {
  const [mode, setMode] = useState("Option#1");

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
          id="makeCopy"
          className="buttonMenu"
          disabled={!idShosen ? true : false}
          onClick={() => {
            getTemplateInfo();
          }}
        >
          Customize Excel template
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Processing Template
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            You can choose any of these options to process your template.
            <br />
          </Dialog.Description>
          <div className="tabsWrap">
            <p
              id="Finalized"
              onClick={() => setMode("Option#1")}
              className={mode == "Option#1" ? "tabActive" : "tab"}
            >
              Option #1
            </p>
            <p
              id="Draft"
              onClick={() => setMode("Option#2")}
              className={mode == "Option#2" ? "tabActive" : "tab"}
            >
              Option #2
            </p>
            <p
              id="Draft"
              onClick={() => setMode("Option#3")}
              className={mode == "Option#3" ? "tabActive" : "tab"}
            >
              Option #3
            </p>
          </div>
          <p>Some explanatory text to choose proccessing template options.</p>
          {mode == "Option#3" && (
            <Link to="/wizard">
              <Button label="Editing in Template Wizard" disabled={false} />
            </Link>
          )}
          {mode == "Option#2" && (
            <fieldset className={name ? "FieldsetFilled" : "Fieldset"}>
              <input
                autoFocus
                className="Input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Enter parameter"
              />
            </fieldset>
          )}
          {mode == "Option#2" && !name && (
            <p className="warning">Please enter some parameters</p>
          )}
          {/* {!name && <p className="warning">Please enter Draft name</p>}
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
          )} */}
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
                Processing Template
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProcessingBluePrintDialog;
