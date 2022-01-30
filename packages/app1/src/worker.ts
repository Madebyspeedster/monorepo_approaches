export default () => {
  self.onmessage = (message) => {
    if (message?.data?.msg === "silentAuth") {
      return fetch("http://localhost:4000//v1/auth0/get-token-silently")
        .then((response) => response.json())
        .then((data) => {
          postMessage({
            msg: "token-success",
            token: data.token,
          });
        });
    }
  };
};
