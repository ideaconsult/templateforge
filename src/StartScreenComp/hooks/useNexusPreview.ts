import { useState } from "react";
import config from "@/utils/config";
import { downloadFile } from "@/lib/request";

const apiUrl = config.apiUrl;

interface UseNexusPreviewProps {
    templateId: string | null;
    projectID?: string;
}

interface UseNexusPreviewReturn {
    isGenerating: boolean;
    showPreview: boolean;
    datasetId: string | null;
    error: string | null;
    generateAndPreview: () => Promise<void>;
    downloadNexus: () => void;
    closePreview: () => void;
}

export const useNexusPreview = ({
    templateId,
    projectID,
}: UseNexusPreviewProps): UseNexusPreviewReturn => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [datasetId, setDatasetId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateAndPreview = async () => {
        if (!templateId) {
            setError("No template selected");
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            // Step 1: Generate NeXus file from template
            const nexusUrl = `${apiUrl}/template/${templateId}?format=nxs${projectID ? `&project=${projectID}` : ""
                }`;

            const response = await fetch(nexusUrl);
            if (!response.ok) {
                throw new Error(`Failed to generate NeXus file: ${response.statusText}`);
            }

            const nexusBlob = await response.blob();

            // Step 2: Upload to /dataset endpoint for preview
            const formData = new FormData();
            formData.append("file", nexusBlob, `${templateId}.nxs`);

            const uploadResponse = await fetch(`${apiUrl}/dataset?dataset_type=ambit_json`, {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload NeXus file: ${uploadResponse.statusText}`);
            }

            const uploadResult = await uploadResponse.json();

            // Extract dataset UUID from task result
            const task = uploadResult.task?.[0];
            if (task && task.result_uuid) {
                setDatasetId(task.result_uuid);
                setShowPreview(true);
            } else {
                throw new Error("No dataset ID returned from upload");
            }
        } catch (err) {
            console.error("Error generating/uploading NeXus file:", err);
            setError(err instanceof Error ? err.message : "Unknown error occurred");
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadNexus = () => {
        if (!templateId) {
            console.info("No template chosen, skipping download.");
            return;
        }

        const nexusUrl = `${apiUrl}/template/${templateId}?format=nxs${projectID ? `&project=${projectID}` : ""
            }`;

        downloadFile(templateId, nexusUrl);
    };

    const closePreview = () => {
        setShowPreview(false);
        setDatasetId(null);
        setError(null);
    };

    return {
        isGenerating,
        showPreview,
        datasetId,
        error,
        generateAndPreview,
        downloadNexus,
        closePreview,
    };
};
