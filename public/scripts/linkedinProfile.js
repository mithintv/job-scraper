window.addEventListener("load", main, false);

function main() {
  const getName = () => {
    return document.querySelector("h1").textContent;
  };
  const getRecentPostion = () => {
    if (document.querySelector("section > div#experience")) {
      const expereinceSection = document.querySelector(
        "section > div#experience"
      );
      const latest = expereinceSection.parentElement.querySelectorAll(
        "div > ul > li > div > div"
      )[1];
      const role =
        latest.querySelectorAll("div > div > span")[0].children[0].textContent;
      const company =
        latest.querySelectorAll("div > div > span")[1].children[0].textContent;
      return { role, company };
    } else return "";
  };

  const getConnectionDegree = () => {
    return document
      .querySelector("span.dist-value")
      .textContent.replaceAll("\n", "")
      .trim();
  };

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const getProfileData = {
      date: new Date().toLocaleString(),
      name: getName(),
      title: getRecentPostion().role,
      company: getRecentPostion().company,
      link: document.URL,
      connectionDegree: getConnectionDegree(),
    };
    console.log(getProfileData);
    if (request.data === "getProfile") {
      sendResponse(getProfileData);
    }
  });
}
