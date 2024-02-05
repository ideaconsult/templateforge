export const postRequest = (data, uuid) => {
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
