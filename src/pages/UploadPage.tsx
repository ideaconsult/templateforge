import ViewIcon from "@/IconsComponents/ViewIcon";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NexusPreviewDialog } from "../DialogComp/NexusPreviewDialog";
import Download from "@/IconsComponents/Download";
import config from "../utils/config";
import "./UploadPage.css";

const apiUrl = config.apiUrl;

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (
        !selectedFile.name.endsWith(".xlsx") &&
        !selectedFile.name.endsWith(".xls")
      ) {
        setError("Please select an Excel file (.xlsx or .xls)");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const uploadAndConvert = async (withPreview: boolean = false) => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const urlObj = new URL(apiUrl);
      urlObj.pathname = urlObj.pathname.replace(/\/template$/, "/dataset");
      urlObj.searchParams.set("dataset_type", "template_wizard");

      const url = urlObj.toString();
      const response = await fetch(`${url}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      const task = result.task?.[0];

      if (task && task.result_uuid) {
        setTaskId(task.id);
        setDatasetId(task.result_uuid);

        // Poll for task completion
        await pollTaskStatus(task.id, withPreview);
      } else {
        throw new Error("No task ID returned from upload");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setUploading(false);
    }
  };

  const pollTaskStatus = async (taskId: string, withPreview: boolean) => {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = async () => {
      try {
        const taskUrl = apiUrl.replace(/\/template\/?$/, "/task");
        const response = await fetch(`${taskUrl}/${taskId}`);
        const task = await response.json();

        // 1. Check if the backend says it's done
        if (task.status === "Completed") {
          console.log(task);
          // 2. NOW the result_uuid is guaranteed to be there
          const finalUuid = task.result_uuid;

          if (task.error) {
            setError(task.error);
          }

          setDatasetId(finalUuid);
          setUploading(false);

          if (withPreview) {
            setShowPreview(true);
          } else {
            finalUuid && downloadNexus(finalUuid);
          }
        } else if (task.status === "Error") {
          setUploading(false);
          setError(task.error || "Conversion failed");
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 1000); // Wait and try again
        } else {
          setUploading(false);
          setError("Conversion timed out");
        }
      } catch (err) {
        setUploading(false);
        setError("Failed to check conversion status");
      }
    };

    poll();
  };

  const downloadNexus = (uuid: string) => {
    const link = document.createElement("a");
    const urlObj = new URL(apiUrl);
    urlObj.pathname = urlObj.pathname.replace(/\/template$/, "/dataset");
    const url = urlObj.toString();

    link.href = `${url}/${uuid}?format=nxs`;
    link.download = `${uuid}.nxs`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    uploadAndConvert(true);
  };

  const handleDownload = () => {
    uploadAndConvert(false);
  };

  const resetForm = () => {
    setFile(null);
    setError(null);
    setDatasetId(null);
    setTaskId(null);
    setShowPreview(false);
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-card">
          <div className="upload-form">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="excel-file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                disabled={uploading}
                className="file-input"
              />
              <label htmlFor="excel-file" className="file-input-label">
                {file ? file.name : "Choose Excel file..."}
              </label>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {file && !uploading && (
              <div className="file-info">
                <span className="file-icon">📄</span>
                <div className="file-details">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
            )}

            <div className="button-group">
              <button
                onClick={handlePreview}
                disabled={!file || uploading}
                className="btn btn-primary"
              >
                <ViewIcon disabled={!file || uploading} mode="dark" />
                {uploading ? "Converting..." : "Preview NeXus"}
              </button>

              <button
                onClick={handleDownload}
                disabled={!file || uploading}
                className="btn btn-secondary"
              >
                <Download disabled={!file || uploading} />
                {uploading ? "Converting..." : "Download NeXus"}
              </button>

              {file && !uploading && (
                <button onClick={resetForm} className="btn btn-outline">
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <NexusPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        datasetId={datasetId}
        onDownload={() => datasetId && downloadNexus(datasetId)}
      />
    </div>
  );
}
