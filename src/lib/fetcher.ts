export const fetcher = (url: RequestInfo | URL) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  }).then((res) => res.json());
