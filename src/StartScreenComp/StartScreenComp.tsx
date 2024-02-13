// @ts-nocheck
import React, { useState } from "react";
import Button from "../ui/Button";
import LogoBar from "../MenuBar/LogoBar";
import BluePrintsTable from "./BluePrintsTable";
import CreateNewDialog from "./../DialogComp/CreateNewDialog";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { useUuid, useSetUuid } from "../store/store";

import { downloadFile } from "../lib/request";

import "./StartScreenComp.css";

import config from "../utils/config";


export default function StartScreenComp() {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("Finalized");
  const [copied, setCopied] = useState(false);

  const UUID = useUuid();
  const setUUID = useSetUuid();
  const navigate = useNavigate();
  const apiUrl = config.apiUrl;
  const templateURL = `${apiUrl}/${UUID}?format=xlsx`;

  const dowloadXLS = () => {
    UUID && downloadFile(UUID, templateURL);
  };

  // const copyLink = () => {
  //   UUID && navigator.clipboard.writeText(templateURL);
  // };

  const urlToCopy = import.meta.env.PROD
    ? `https://enanomapper.adma.ai/designer?uuid=${UUID}`
    : `http://localhost:5173/designer?uuid=${UUID}`;

  const copyLink = () => {
    UUID && navigator.clipboard.writeText(urlToCopy);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="screenWrap">
      <p className="underDev">
        The Template Designer App is under development right now
      </p>
      <LogoBar startScreen={true} />

      <div className="descriptionNew">
        <p className="description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
          itaque laudantium animi omnis, in mollitia rem velit quasi soluta,
          veniam eos libero. Animi voluptates error obcaecati beatae sed
          necessitatibus vero.
        </p>{" "}
        {/* <CreateNewDialog /> */}
        <button
          className="createNewBtn"
          onClick={async () => {
            let res = await fetch(
              apiUrl,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            let result = await res.json();

            if (result.result_uuid) {
              navigate(`?uuid=${result.result_uuid}`);
            }
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
            // setUUID={setUUID}
            // UUID={UUID}
            value={value}
            mode={mode}
          />

          <div className="buttonsWrap">
            <Link to={`?uuid=${UUID}`}>
              <Button
                disabled={!UUID}
                label={mode == "Finalized" ? "View" : "Edit"}
              />
            </Link>
            <Button disabled={!UUID} label="Make a copy" />
            <div
              onClick={() => {
                copyLink();
                setCopied(true);
              }}
            >
              <Button
                disabled={!UUID}
                label={copied ? "Copied to clipboard!" : "Share a link"}
              />
            </div>
            <div onClick={dowloadXLS}>
              <Button disabled={!UUID} label="Download XLS" />
            </div>
          </div>
        </div>
        <div className="view">
          {UUID ? (
            <iframe
              width="100%"
              height="400"
              src={`${apiUrl}/${UUID}`}
            ></iframe>
          ) : (
            <p className="previewPlaceholder">No preview yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
