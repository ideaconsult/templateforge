import config from "../utils/config";

export const getRequest = async () => {
  const apiUrl = config.apiUrl;
  const res = await fetch(`${apiUrl}`);
  const data = await res.json();
  return data;
};

export const postRequestCopy = (data, uuid) => {
  if (uuid) {
    console.log(JSON.stringify("request", data));
    const apiUrl = config.apiUrl;
    fetch(`${apiUrl}/${uuid}/copy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }
};

export const postRequestUUID = (data, uuid) => {
  if (uuid) {
    const apiUrl = config.apiUrl;
    fetch(`${apiUrl}/${uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }
};
export const getRequestUUID = async (uuid) => {
  const apiUrl = config.apiUrl;
  const res = await fetch(`${apiUrl}/${uuid}`);
  const data = await res.json();
  return data;
};

export const postRequest = (data) => {
  const apiUrl = config.apiUrl;
  fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};



export const downloadFile = (uuid, templateURL) => {
  fetch(templateURL, { cache: "no-cache" })
  .then((resp) => {
    if (!resp.ok) {
      return resp.text().then((body) => {
        throw new Error(`Failed to download the file: \n${body}`);
      });
    }
    return resp.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${uuid}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      const errorMessage = error.message;
      const detailsButton = document.createElement("button");
      detailsButton.textContent = "Details";
      detailsButton.addEventListener("click", () => {
        alert(errorMessage);
      });
      alert(errorMessage);
   
    });
};
