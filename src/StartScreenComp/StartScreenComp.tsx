// @ts-nocheck
import React, { useState } from "react";
import Button from "../ui/Button";
import LogoBar from "../MenuBar/LogoBar";
import BluePrintsTable from "./BluePrintsTable";

import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

import "./StartScreenComp.css";

export default function StartScreenComp({
  setShowStartScreen,
  setSurveyReset,
  surveyReset,
}) {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("Finalized");
  const [UUID, setUUID] = useState(null);
  const [copied, setCopied] = useState(false);

  const { data } = useSWR(
    "https://api.ramanchada.ideaconsult.net/template",
    fetcher
  );
  const templateURL = `https://api.ramanchada.ideaconsult.net/template/${UUID}?format=xlsx`;

  const dowloadXLS = () => {
    UUID &&
      fetch(templateURL)
        .then((resp) => resp.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `${UUID}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => alert("oh no!"));
  };

  const copyLink = () => {
    UUID && navigator.clipboard.writeText(templateURL);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="screenWrap">
      <LogoBar startScreen={true} />
      <div className="descriptionNew">
        <p className="description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
          itaque laudantium animi omnis, in mollitia rem velit quasi soluta,
          veniam eos libero. Animi voluptates error obcaecati beatae sed
          necessitatibus vero.
        </p>{" "}
        {/* <Button label="Create a new Draft" /> */}
        <button
          className="createNewBtn"
          onClick={() => {
            setShowStartScreen(false);
            setSurveyReset(!surveyReset);
          }}
        >
          Create a new Draft
        </button>
      </div>
      <div className="tabsWrap">
        <p
          onClick={() => setMode("Finalized")}
          className={mode == "Finalized" ? "tabActive" : "tab"}
        >
          Finalized Blueprints
        </p>
        <p
          onClick={() => setMode("Draft")}
          className={mode == "Draft" ? "tabActive" : "tab"}
        >
          Drafts Blueprints
        </p>
      </div>

      <div className="tableViewWrap">
        <div className="inputWrap">
          <input
            className="inputSearch"
            placeholder="Please start typing to find your blueprint..."
            type="text"
            value={value}
            onChange={onChange}
          />
          <BluePrintsTable
            data={data}
            setUUID={setUUID}
            UUID={UUID}
            value={value}
          />
          <div className="buttonsWrap">
            <Button label={mode == "Finalized" ? "View" : "Edit"} />
            <Button label="Make a copy" />
            <div
              onClick={() => {
                copyLink();
                setCopied(true);
              }}
            >
              <Button
                label={copied ? "Copied to clipboard!" : "Share a link"}
              />
            </div>
            <div onClick={dowloadXLS}>
              <Button label="Download XLS" />
            </div>
          </div>
        </div>
        <div className="view">
          <iframe
            width="100%"
            height="400"
            src={`https://api.ramanchada.ideaconsult.net/template/${UUID}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
