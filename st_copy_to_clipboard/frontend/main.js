// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

function sendValue(value) {
  Streamlit.setComponentValue(value);
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    const { text } = event.detail.args;

    const button = document.querySelector("#copy-button");

    function copyToClipboard() {
      navigator.clipboard.writeText(text);
      button.textContent = "클립보드에 복사되었습니다"; // Change label after copying
      button.style.color = "rgb(23, 114, 51)";
      button.style.backgroundColor = "#d4edda";

      setTimeout(() => {
        if (!button) return;
        button.textContent = "복사하기"; // Revert to original label after 1 second
        button.style.color = "inherit";
        button.style.backgroundColor = "transparent";
      }, 1000);
    }

    button.addEventListener("click", copyToClipboard);
    Streamlit.setComponentValue(true);
    window.rendered = true;
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady();
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(100);
