let accessToken = "";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "TOKEN") {
    accessToken = event.data.token;
    console.log(accessToken);
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(event.request.url);

  if (
    accessToken &&
    url.origin.startsWith("https://") &&
    url.origin.endsWith(".ideaconsult.net/template") &&
    request.method === "GET" &&
    url.origin !== "https://iam.ideaconsult.net" &&
    url.origin !== "https://idp.ideaconsult.net" &&
    // request.destination === "image" &&
    event.request.headers["Authorization"] == undefined
  ) {
    const authRequest = new Request(request, {
      headers: new Headers({
        ...request.headers,
        Authorization: `Bearer ${accessToken}`,
      }),
      mode: "cors",
    });
    event.respondWith(fetch(authRequest));
    console.log("with token");
  } else {
    console.log("without token");
  }
});
