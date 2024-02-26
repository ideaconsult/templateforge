// @ts-nocheck
import React, { useState } from "react";
import Button from "../ui/Button";
import LogoBar from "../MenuBar/LogoBar";
import BluePrintsTable from "./BluePrintsTable";
import CreateNewDialog from "./../DialogComp/CreateNewDialog";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import config from "../utils/config";

import {
  useUuid,
  useSetUuid,
  useSetShowStartScreen,
  useIsShosen,
  useSetIsShosen,
} from "../store/store";

import { downloadFile } from "../lib/request";

import "./StartScreenComp.css";

export default function StartScreenComp({}) {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("Finalized");
  const [copied, setCopied] = useState(false);

  const UUID = useUuid();
  const setUUID = useSetUuid();
  const setStartScreen = useSetShowStartScreen();

  const idShosen = useIsShosen();
  const setIdShosen = useSetIsShosen();

  const apiUrl = config.apiUrl;
  const templateURL = `{apiUrl}${idShosen}?format=xlsx`;

  const dowloadXLS = () => {
    idShosen && downloadFile(idShosen, templateURL);
  };

  const urlToCopy = import.meta.env.PROD
    ? `https://enanomapper.adma.ai/designer?uuid=${idShosen}`
    : `http://localhost:5173/designer?uuid=${idShosen}`;

  const copyLink = () => {
    idShosen && navigator.clipboard.writeText(urlToCopy);
  };

  setTimeout(() => {
    setCopied(false);
  }, 3000);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const storageItemKey = "my-survey";
  return (
    <div className="screenWrap">
      <p className="underDev">
        The Template Designer App is under development right now
      </p>
      <LogoBar startScreen={true} setIdShosen={setIdShosen} />

      <div className="descriptionNew">
        <p className="description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
          itaque laudantium animi omnis, in mollitia rem velit quasi soluta,
          veniam eos libero. Animi voluptates error obcaecati beatae sed
          necessitatibus vero.
        </p>{" "}
        <CreateNewDialog />
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
            value={value}
            mode={mode}
            setIdShosen={setIdShosen}
            idShosen={idShosen}
          />

          <div className="buttonsWrap">
            <div
              onClick={() => {
                setUUID(idShosen);
                setStartScreen();
                window.localStorage.setItem(storageItemKey, "");
              }}
            >
              <Button
                disabled={!idShosen}
                label={mode == "Finalized" ? "View" : "Edit"}
              />
            </div>
            <MakeCopyDialog />
            <div
              onClick={() => {
                copyLink();
                setCopied(true);
              }}
            >
              <Button
                disabled={!idShosen}
                label={copied ? "Copied to clipboard!" : "Share a link"}
              />
            </div>
            <div onClick={dowloadXLS}>
              <Button disabled={!idShosen} label="Download XLS" />
            </div>
          </div>
        </div>
        <div className="view">
          {idShosen ? (
            <iframe
              width="100%"
              height="400"
              src={`${apiUrl}/${idShosen}`}
            ></iframe>
          ) : (
            <p className="previewPlaceholder">No preview yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
