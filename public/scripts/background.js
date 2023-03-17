chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "inject_css") {
    chrome.scripting.insertCSS({
      target: {
        tabId: sender.tab.id,
      },
      files: ["styles/button.css"],
    });
  }
});
