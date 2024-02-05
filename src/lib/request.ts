export const postRequestUUID = (data, uuid) => {
  if (uuid) {
    fetch(`https://api.ramanchada.ideaconsult.net/template/${uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }
};

export const postRequest = (data) => {
  fetch(`https://api.ramanchada.ideaconsult.net/template/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};
