import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { insertRow, insertData, getAuth } from "./lib/oauth";
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

  const getOtta = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
    });
    console.log("sending message");
    const response = await chrome.tabs.sendMessage(tab.id!, {
      data: "getData",
    });
    setData(response);
    console.log(response);
    // const values = [
    //   [
    //     response.date,
    //     response.title,
    //     response.company,
    //     response.location,
    //     response.description,
    //   ],
    // ];
    const token = await getAuth();
    console.log(token);
    // const { updatedSpreadsheet } = await insertRow(
    //   token!,
    //   spreadsheetId,
    //   sheetId
    // );
    // if (updatedSpreadsheet.spreadsheetId === spreadsheetId) {
    //   await insertData(token!, spreadsheetId, sheetTitle, values);
    // }
    // save data
    // authorize()
    //   .then((auth) => appendValues(auth, response))
    //   .catch(console.error);

    // // do something with response here, not outside the function
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
        <p>{data.description}</p>
        <button onClick={getOtta}>Get Data</button>
      </header>
    </div>
  );
}

export default App;
