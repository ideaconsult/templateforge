import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";

const MakeCopyDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <div className="">
        <Button label="Make a copy" />
      </div>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">
          Make a copy from your template
        </Dialog.Title>
        <Dialog.Description className="DialogDescription">
          You can change the template name here.
          <br />
          Click Make a Copy button when you're done.
        </Dialog.Description>
        <fieldset className="Fieldset">
          {/* <label className="Label" htmlFor="name">
            Template Name
          </label> */}
          <input className="Input" id="name" defaultValue="New Template Name" />
        </fieldset>
        {/* <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset> */}
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <button className="Button green">Make a copy</button>
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

export default MakeCopyDialog;
