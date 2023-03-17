chrome.runtime.sendMessage({ type: "inject_css" });

const getTitle = () => {
  return document.querySelector(".posting-headline > h2").textContent;
};

const getCompany = () => {
  const fullCompanyLink = document.querySelector(
    ".main-footer-text a"
  ).textContent;
  if (fullCompanyLink === "Jobs powered by ") {
    const url = document.URL;
    const sliced = url.slice(22);
    return sliced[0].toUpperCase() + sliced.slice(1, sliced.indexOf("/"));
  } else return fullCompanyLink.slice(0, fullCompanyLink.indexOf("Home") - 1);
};

const getLocation = () => {
  const fullCategory = document.querySelector(
    ".posting-categories"
  ).textContent;
  return fullCategory.slice(0, fullCategory.indexOf("/") - 1);
};

const getSalary = () => {
  return "";
};

const getLink = () => {
  return document.URL;
};

const jobData = {
  date: new Date().toLocaleString(),
  title: getTitle(),
  company: getCompany(),
  location: getLocation(),
  salary: getSalary(),
  description: getLink(),
  platform: "Direct (Lever)",
};

const div = document.querySelector(".postings-btn-wrapper");
const applyButton = document.querySelector(".postings-btn");
const body = document.querySelector("body");
const addButton = document.createElement("a");
addButton.textContent = "Add To Sheets";
addButton.setAttribute("id", "scraper-button");
addButton.classList.add("postings-btn", "template-btn-submit");
body.append(addButton);

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("sent from tab.id=", sender.tab.id);
//   (async () => {
//     await chrome.scripting.insertCSS({
//       files: ["styles/button.css"],
//       tabId: sender.tab.id,
//     });
//   })();
// });

addButton.addEventListener("click", async () => {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.log(json));
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getData") {
    console.log(response);
    sendResponse(response);
  }
});
