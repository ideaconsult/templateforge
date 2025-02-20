import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";

import Select from "@/ui/Select";

import "./styles.css";
const selectUrl = "https://enanomapper.adma.ai/api/projects.json";

const PreferencesDialog = ({ setProjectName, projectName }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          data-cy="preferences-btn"
          id="preferences"
          className="buttonMenu"
        >
          Preferences
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Choose Project</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            You can choose your project.
            <br />
          </Dialog.Description>

          <Select
            url={selectUrl}
            setProjectName={setProjectName}
            projectName={projectName}
          />

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button data-cy="ok-btn" id="okBtn" className="Button">
                Ok
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PreferencesDialog;
