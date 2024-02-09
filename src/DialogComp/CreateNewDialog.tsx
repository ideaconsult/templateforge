import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";

import "./styles.css";
import { useSetShowStartScreen } from "../store/store";
import { postRequest } from "../lib/request";

const CreateNewDialog = () => {
  const setStartScreen = useSetShowStartScreen();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="">
          <Button label="Create New Draft (Alternative)" disabled={false} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Create New Draft</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Please define a draft's name and author.
            <br />
            Click a Create New Draft Button when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            {/* <label className="Label" htmlFor="name">
            Template Name
          </label> */}
            <input className="Input" id="name" defaultValue="New Draft Name" />
          </fieldset>
          <fieldset className="Fieldset">
            {/* <label className="Label" htmlFor="author">
            Username
          </label> */}
            <input className="Input" id="author" defaultValue="Author" />
          </fieldset>
          <fieldset className="Fieldset">
            {/* <label className="Label" htmlFor="author">
            Username
          </label> */}
            <input
              className="Input"
              id="template_acknowledgment"
              defaultValue="Template Acknowledgment"
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                className="Button green"
                onClick={() => {
                  setStartScreen();
                  postRequest({
                    template_name: "Test",
                    template_status: "DRAFT",
                    template_author: "Sergey",
                    template_acknowledgment: "test-test",
                  });
                }}
              >
                Create New Draft
              </button>
            </Dialog.Close>
          </div>
          {/* <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateNewDialog;
