const getRecentPostion = () => {
  const sectionBlocks = document.querySelectorAll("section");
  let role = "";
  sectionBlocks.forEach((section) => {
    if (section.textContent.includes("Experience")) {
      role =
        section.children[2].children[0].children[0].children[0].children[1]
          .children[0].children[0].children[0].innerText;
      role = role.slice(0, role.indexOf("\n"));
      console.log(role);
      return role;
    }
  });

  return role;
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getProfile") {
    console.log({
      date: new Date().toLocaleString(),
      link: document.URL,
      name: document.querySelector("h1").textContent,
      role: getRecentPostion(),
    });
    sendResponse("sent");
  }
});
