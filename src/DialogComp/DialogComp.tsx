import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import formatHighlight from "json-format-highlight";
import ShowPreviewIcon from "../IconsComponents/ShowPreviewIcon";

import { useIntermediateData } from "../store/store";

import "../App.css";
const customColorOptions = {
  keyColor: "#3a3a3a",
  numberColor: "blue",
  stringColor: "red",
  trueColor: "#00cc00",
  falseColor: "#ff8080",
  nullColor: "cornflowerblue",
};

const DialogComp = ({ result }) => {
  const [open, setOpen] = React.useState(false);
  const jsonPreview = useIntermediateData();
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild className="showPreview">
        <button className="showBtn">
          <ShowPreviewIcon />
          {open ? "Close Preview" : "Show Preview"}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="previewModal">
          <Dialog.Title className="DialogTitle">JSON Preview</Dialog.Title>
          {/* <Dialog.Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description> */}
          <p
            className="modalJson"
            dangerouslySetInnerHTML={{
              __html: formatHighlight(
                jsonPreview
                  ? "<pre>\n" + jsonPreview + "\n</pre>"
                  : "No preview yet",
                customColorOptions
              ),
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            {/* <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close> */}
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

export default DialogComp;
