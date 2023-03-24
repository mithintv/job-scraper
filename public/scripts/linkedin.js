const getTitle = () => {
  return (
    document.getElementsByClassName("jobs-unified-top-card__job-title")[0]
      .textContent || document.querySelector("h1").textContent
  );
};

const getCompany = () => {
  return (
    document
      .getElementsByClassName("jobs-unified-top-card__company-name")[0]
      .textContent.replaceAll("\\n")
      .trim() ||
    document
      .querySelector("h1")
      .nextElementSibling.children[0].children[0].textContent.replaceAll(
        "\n",
        ""
      )
      .trim()
  );
};

const getLocation = () => {
  return (
    document
      .getElementsByClassName("jobs-unified-top-card__bullet")[0]
      .textContent.replaceAll("\\n")
      .trim() ||
    document
      .querySelector("h1")
      .nextElementSibling.children[0].children[1].textContent.replaceAll(
        "\n",
        ""
      )
      .trim()
  );
};

const getSalary = () => {
  const salaryBlock = document.querySelector("a[href='#SALARY']");
  if (salaryBlock) return salaryBlock.textContent;
  else return "";
};

const getLink = () => {
  if (document.URL.includes("view")) return document.URL;
  else
    return document
      .getElementsByClassName("jobs-unified-top-card__content--two-pane")[0]
      .getElementsByTagName("a")[0].href;
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const url = document.URL;
  console.log(url);
  if (request.data === "getData") {
    const response = {
      date: new Date().toLocaleString(),
      title: getTitle(),
      company: getCompany(),
      location: getLocation(),
      salary: getSalary(),
      description: getLink(),
      platform: "Linkedin",
    };
    console.log(response);
    sendResponse(response);
  }
});
