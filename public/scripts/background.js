chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("hi");
  if (message.type === "inject_css") {
    chrome.scripting.insertCSS({
      target: {
        tabId: sender.tab.id,
      },
      files: ["styles/button.css"],
    });
  }
});
