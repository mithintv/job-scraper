window.addEventListener("load", main, false);

function main() {
  const getName = () => {
    return document.querySelector("h1").textContent;
  };
  const getRecentPostion = () => {
    try {
      if (document.querySelector("section > div#experience")) {
        const experienceSection = document.querySelector(
          "section > div#experience"
        );
        const latest = experienceSection.parentElement.querySelectorAll(
          "div > ul > li > div > div"
        )[1];

        let role;
        let company;
        if (
          latest.children.length > 1 &&
          latest.querySelectorAll("ul.pvs-list").length === 1
        ) {
          company =
            latest.querySelectorAll("div > span")[0].children[0].textContent;
          role = latest.querySelectorAll("span.mr1 > span")[2].textContent;
        } else {
          role =
            latest.querySelectorAll("div > div > span")[0].children[0]
              .textContent;
          const companyAndType =
            latest.querySelectorAll("div > div > span")[1].children[0]
              .textContent;
          if (companyAndType.indexOf("·") > -1) {
            company = companyAndType.slice(0, companyAndType.indexOf("·") - 1);
          } else company = companyAndType;
        }
        return { role, company };
      } else return "";
    } catch (error) {
      console.log(error);
    }
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
