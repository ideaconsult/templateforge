import config from "../utils/config";

export const postRequestUUID = (data, uuid) => {
  if (uuid) {
    console.log(JSON.stringify(data))
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
  fetch(templateURL)
    .then((resp) => resp.blob())
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
    .catch(() => alert("oh no!"));
};
