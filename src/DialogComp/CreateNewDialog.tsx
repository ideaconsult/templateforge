import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import config from "../utils/config";
import { Model } from "survey-core";
import { json } from "../SurveyComp/json";
import Button from "@/ui/Button";

import {
  useSetUuid,
  useUuid,
  useName,
  useSetName,
  useAuthor,
  useSetAuthor,
  useAcknowledgment,
  useSetAcknowledgment,
  useSetIsShosen,
} from "../store/store";
import "./styles.css";
import { Navigate } from "react-router-dom";

const CreateNewDialog = () => {
  const setUUID = useSetUuid();
  const UUID = useUuid();
  const name = useName();
  const setName = useSetName();
  const author = useAuthor();
  const setAuthor = useSetAuthor();
  const acknowledgment = useAcknowledgment();
  const setAcknowledgment = useSetAcknowledgment();

  const setIdShosen = useSetIsShosen();
  const storageItemKey = "my-survey";

  var survey_data = new Model(json).data;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          onClick={() => {
            setIdShosen(null);
            setName("");
            setAuthor("");
            setAcknowledgment("");

            window.localStorage.setItem(storageItemKey, "");
          }}
          className="createNewBtn"
        >
          Create a new Draft
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Create New Draft</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Please define a draft's name and author.
            <br />
            Click a Create New Draft button when you're done.
          </Dialog.Description>
          <fieldset className={name ? "FieldsetFilled" : "Fieldset"}>
            <input
              autoFocus
              className="Input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
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
                id="create_new"
                disabled={name == "" && author == "" && acknowledgment == ""}
                className="Button"
                onClick={async () => {
                  survey_data["template_name"] = name;
                  survey_data["template_status"] = "DRAFT";
                  survey_data["template_author"] = author;
                  survey_data["template_acknowledgment"] = acknowledgment;

                  let res = await fetch(
                    config.apiUrl,

                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(survey_data),
                    }
                  );
                  let result = await res.json();

                  if (result.result_uuid) {
                    setUUID(result.result_uuid);
                  }
                  {
                    UUID && (
                      <Navigate
                        to={`?uuid=${result.result_uuid}`}
                        replace={true}
                      />
                    );
                  }
                  // <Navigate
                  //   to={`?uuid=${result.result_uuid}`}
                  //   replace={true}
                  // />;
                }}
              >
                Create New Draft
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateNewDialog;
