import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { App, H5GroveProvider } from "@h5web/app";
import "@h5web/app/dist/styles.css";
import config from "@/utils/config";
import "./styles.css";

const apiUrl = config.apiUrl;

interface NexusPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  datasetId: string | null;
  onDownload?: () => void;
}

export function NexusPreviewDialog({
  open,
  onOpenChange,
  datasetId,
  onDownload,
}: NexusPreviewDialogProps) {
  if (!datasetId) return null;

  const urlObj = new URL(apiUrl);
  urlObj.pathname = urlObj.pathname.replace(/\/template$/, "/h5grove");
  const hdf5Url = urlObj.toString();
  const filePath = `${datasetId}.nxs`; // relative filename inside NEXUS_DIR

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = hdf5Url;
    link.download = `${datasetId}.nxs`;

    if (onDownload) {
      onDownload();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="H5webDialogContent">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <Dialog.Title className="DialogTitle">
                NeXus File Preview
              </Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Explore the NeXus file structure and data using the interactive
                viewer below.
              </Dialog.Description>
            </div>

            <div className="contentWrap">
              <H5GroveProvider url={hdf5Url} filepath={filePath}>
                <App />
              </H5GroveProvider>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={() => onOpenChange(false)}
                className="buttonMenu"
              >
                Close
              </button>
              <button onClick={handleDownload} className="buttonMenu">
                Download NeXus File
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
