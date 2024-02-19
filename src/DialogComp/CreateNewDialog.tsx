import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";

import {
  useSetUuid,
  useName,
  useSetName,
  useAuthor,
  useSetAuthor,
  useAcknowledgment,
  useSetAcknowledgment,
  useSetIsShosen,
} from "../store/store";
import "./styles.css";

const CreateNewDialog = () => {
  const setUUID = useSetUuid();
  const name = useName();
  const setName = useSetName();
  const author = useAuthor();
  const setAuthor = useSetAuthor();
  const acknowledgment = useAcknowledgment();
  const setAcknowledgment = useSetAcknowledgment();

  const setIdShosen = useSetIsShosen();
  const storageItemKey = "my-survey";

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
                disabled={name == "" && author == "" && acknowledgment == ""}
                className="Button"
                onClick={async () => {
                  let res = await fetch(
                    "https://api.ramanchada.ideaconsult.net/template",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        template_name: name,
                        template_status: "DRAFT",
                        template_author: author,
                        template_acknowledgment: acknowledgment,
                      }),
                    }
                  );
                  let result = await res.json();

                  if (result.result_uuid) {
                    setUUID(result.result_uuid);
                  }
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
