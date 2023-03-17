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

const getProfileData = {
  date: new Date().toLocaleString(),
  link: document.URL,
  name: document.querySelector("h1").textContent,
  title: getRecentPostion().role,
  company: getRecentPostion().company,
  connectionDegree: getConnectionDegree(),
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getProfile") {
    console.log(getProfileData);
    sendResponse("sent");
  }
});
