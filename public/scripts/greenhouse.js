window.addEventListener("load", main, false);

function main() {
  const getTitle = () => {
    return document.querySelector("h1.app-title").textContent;
  };

  const getCompany = () => {
    const fullCompany = document.querySelector("span.company-name").textContent;
    return fullCompany.replaceAll("\n", "").trim().slice(3);
  };

  const getLocation = () => {
    return document
      .querySelector("div.location")
      .textContent.replaceAll("\n", "")
      .trim();
  };

  const getSalary = () => {
    const salaryBlock = document.evaluate(
      "//p[contains(., 'salary range')] | //span[contains(., 'salary range')]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    const match = salaryBlock.iterateNext();
    if (match) {
      const sentence = match.textContent;
      const start = sentence.indexOf("$");
      const end = sentence.indexOf("USD");
      if (start && end) return sentence.slice(start, end - 1);
      else return "";
    } else return "";
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
    platform: "Direct (Greenhouse)",
  };

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const url = document.URL;
    console.log(url);
    if (request.data === "getData") {
      console.log(jobData);
      sendResponse(jobData);
    }
  });
}
