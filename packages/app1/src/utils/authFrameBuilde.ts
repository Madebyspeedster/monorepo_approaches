export const injectAuthFrame = (element: HTMLDivElement) => {
  const frame = document.createElement("iframe");
  console.log(`${process.env.REACT_APP_API_URL}/v1/auth0/get-token-silently`);
  frame.src = `${process.env.REACT_APP_API_URL}/v1/auth0/get-token-silently`;
  frame.style.display = "none";
  frame.addEventListener("load", () => {
    setTimeout(() => {
      frame.remove();
    }, 100);
  });
  element.appendChild(frame);
};
