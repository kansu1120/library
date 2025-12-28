document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre > code.language-cpp").forEach(code => {
    const pre = code.parentElement;

    const button = document.createElement("button");
    button.textContent = "Copy";
    button.style.position = "absolute";
    button.style.top = "6px";
    button.style.right = "6px";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";

    pre.style.position = "relative";
    pre.appendChild(button);

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(code.innerText).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => button.textContent = "Copy", 1000);
      });
    });
  });
});
