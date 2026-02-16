import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { App, H5GroveProvider } from "@h5web/app";
import "@h5web/app/dist/styles.css";
import config from "@/utils/config";

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
    urlObj.pathname = urlObj.pathname.replace(/\/template$/, '/h5grove');
    const hdf5Url = urlObj.toString()
    console.log(hdf5Url)
    const filePath = `${datasetId}.nxs`;             // relative filename inside NEXUS_DIR


    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = hdf5Url;
        link.download = `${datasetId}.nxs`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (onDownload) {
            onDownload();
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content
                    className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                     w-[90vw] max-w-[1200px] h-[85vh] bg-white rounded-lg shadow-xl 
                     border border-gray-200 p-6 z-50 focus:outline-none"
                >
                    <div className="flex flex-col h-full">
                        <div className="mb-4">
                            <Dialog.Title className="text-2xl font-semibold text-gray-900">
                                NeXus File Preview
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-gray-600 mt-1">
                                Explore the NeXus file structure and data using the interactive viewer below.
                            </Dialog.Description>
                        </div>

                        <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
                            <H5GroveProvider url={hdf5Url} filepath={filePath}>
                                <App />
                            </H5GroveProvider>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => onOpenChange(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                         border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleDownload}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border 
                         border-transparent rounded-md hover:bg-blue-700 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Download NeXus File
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
