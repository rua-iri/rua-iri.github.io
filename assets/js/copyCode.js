async function buttonClickAction(copyText, button, icon) {
  await navigator.clipboard.writeText(copyText);
  button.removeChild(icon);
  button.innerText = "Copied";

  setTimeout(() => {
    button.innerText = "";
    button.appendChild(icon);
  }, 500);
}

function generateCopyButton(copyText) {
  // Generate unique copy button with relevant text
  // and Font Awesome icon
  const button = document.createElement("button");
  button.classList.add("btn", "btn-sm", "copy-code-button");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-clipboard");

  button.appendChild(icon);

  button.addEventListener("click", async () => {
    buttonClickAction(copyText, button, icon);
  });

  return button;
}

function applyCopyButton() {
  const codeElements = document.querySelectorAll("code");

  const a = document.createElement("i");
  a.classList += 1;

  for (codeElement of codeElements) {
    // iterate only over <code> elements that have
    // the data-lang attribute (they will be multiline code blocks)
    if (codeElement.attributes["data-lang"]) {
      const copyButton = generateCopyButton(codeElement.innerText);
      codeElement.parentElement.appendChild(copyButton);
    }
  }
}

applyCopyButton();
