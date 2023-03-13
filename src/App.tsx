import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { insertRow, insertData, getAuth, getLinksColumn } from "./lib/sheets";
import { DataObj } from "./lib/types";
// import { authorize, appendValues } from "./lib/auth";

const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID!;
const sheetId = parseInt(process.env.REACT_APP_SHEET_ID!);
const sheetTitle = process.env.REACT_APP_SPREADSHEET_NAME!;

function App() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<DataObj>({
    date: "",
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    platform: "",
  });

  const getData = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    console.log("sending message");
    chrome.runtime.lastError;
    const response = await chrome.tabs.sendMessage(tab.id!, {
      data: "getData",
    });

    if (response) {
      setData(response);
      console.log(response);
      const values = [
        [
          response.date,
          response.title,
          response.company,
          response.location,
          response.salary,
          response.description,
          response.platform,
        ],
      ];
      const token = await getAuth();
      const { updatedSpreadsheet } = await insertRow(
        token!,
        spreadsheetId,
        sheetId
      );
      if (updatedSpreadsheet.spreadsheetId === spreadsheetId) {
        await insertData(token!, spreadsheetId, sheetTitle, values);
      }
    } else {
      console.log("Something went wrong");
    }

    // save data
    // authorize()
    //   .then((auth) => appendValues(auth, response))
    //   .catch(console.error);

    // // do something with response here, not outside the function
  };

  const getProfile = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    console.log("sending message");
    chrome.runtime.lastError;
    const response = await chrome.tabs.sendMessage(tab.id!, {
      data: "getProfile",
    });
    console.log(response);
  };

  const updateData = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    console.log("sending message");
    chrome.runtime.lastError;
    const response = await chrome.tabs.sendMessage(tab.id!, {
      data: "getData",
    });
    console.log(response);
    if (response) {
      setData(response);
      const values = [
        [
          response.date,
          response.title,
          response.company,
          response.location,
          response.salary,
          response.description,
          response.platform,
        ],
      ];
      const token = await getAuth();
      const { values: linkColumn } = await getLinksColumn(
        token!,
        spreadsheetId,
        sheetTitle
      );
      const row = linkColumn[0].indexOf(response.description);
      console.log(row);
      const a1Notation = `A${row + 1}:G`;
      await insertData(token!, spreadsheetId, sheetTitle, values, a1Notation);
    } else console.error("Couldn't receive response");
  };

  useEffect(() => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      setUrl(tab.url!);
    });

    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      console.log(
        sender.tab
          ? "from a content script:" + sender.tab.url
          : "from the extension"
      );
      console.log(request);
    });
  });

  // useEffect(() => {
  //   const queryInfo = { active: true, lastFocusedWindow: true };

  //   chrome.tabs &&
  //     chrome.tabs.query(queryInfo, (tabs) => {
  //       const url = tabs[0].url;
  //       setUrl(url!);
  //     });
  // }, [url]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.date}</p>
        <p>{data.title}</p>
        <p>{data.company}</p>
        <p>{data.location}</p>
        <p>{data.salary}</p>
        {data.description !== "" && <a href={data.description}>Description</a>}
        <p>{data.platform}</p>
        <button onClick={getData}>Get Data</button>
        <button onClick={updateData}>Update Data</button>
        <button onClick={getProfile}>Get Profile</button>
      </header>
    </div>
  );
}

export default App;
