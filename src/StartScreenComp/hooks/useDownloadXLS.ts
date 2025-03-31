import { downloadFile } from "@/lib/request";
import config from "@/utils/config";

const apiUrl = config.apiUrl;

export const useDownloadXLS = ({ idShosen, projectID }) => {
  if (!idShosen) {
    console.info("No template chosen, skipping download.");
    return;
  }
  const templateURL = `${apiUrl}/${idShosen}?format=xlsx&project=${projectID}`;
  if (idShosen) {
    return downloadFile(idShosen, templateURL);
  }
};
