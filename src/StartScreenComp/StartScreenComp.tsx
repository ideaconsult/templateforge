// @ts-nocheck
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../ui/Button";
// import { Button } from "@/components/ui/button";
import LogoBar from "../MenuBar/LogoBar";
import BluePrintsTable from "./BluePrintsTable";
import CreateNewDialog from "./../DialogComp/CreateNewDialog";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import config from "../utils/config";

import { Template, columns } from "@/DataTable/columns";
import { DataTable } from "@/DataTable/DataTable";

import useSWR from "swr";

import { fetcher } from "../lib/fetcher";

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
  const templateURL = `${apiUrl}/${idShosen}?format=xlsx`;

  const { data, isLoading } = useSWR(config.apiUrl, fetcher);

  const templateData = [];
  data &&
    data.template.map((item) => {
      if (mode == "Finalized" && item.template_status == "FINALIZED") {
        return templateData.push(item);
      }
      if (mode == "Draft" && item.template_status == "DRAFT") {
        return templateData.push(item);
      }
    });

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
          Are you in search of the{" "}
          <a
            href="https://enanomapper.adma.ai/help/#templatewizard"
            target="enm"
          >
            Template Wizard
          </a>{" "}
          within the{" "}
          <a href="https://enanomapper.adma.ai" target="enm">
            Nanosafety Data Interface
          </a>
          ? Perhaps the existing templates don't quite align with your
          experiment requirements.
          <br />
          Enter the <a href="">Template Designer</a>, a powerful tool that
          enables you to create a 'blueprint' for your data entry template,
          tailored to report experiment results. Once your 'blueprint' is ready,
          both you and fellow researchers can effortlessly generate and download
          Excel templates based on your specifications. The templates generated
          adhere to the{" "}
          <a href="https://enanomapper.adma.ai/fair/" target="enm">
            FAIR
          </a>{" "}
          data principles, including machine readability, and can be can be
          seamlessly converted to formats such as JSON and{" "}
          <a href="https://www.nexusformat.org/" target="_blank">
            NeXus
          </a>
          . The templates can be effortlessly imported into the{" "}
          <a href="https://enanomapper.adma.ai/" target="enm">
            eNanoMapper database
          </a>
          , enhancing the efficiency and interoperability of your research data.
          Elevate your data reporting experience with the{" "}
          <a href="">Template Designer</a> app.
          <br />
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
          {/* <input
            className="inputSearch"
            placeholder="Please start typing to find your blueprint..."
            type="text"
            value={value}
            onChange={onChange}
          /> */}
          {/* <BluePrintsTable
            value={value}
            mode={mode}
            setIdShosen={setIdShosen}
            idShosen={idShosen}
          /> */}
          <DataTable columns={columns} data={!isLoading && templateData} />
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
            {UUID && <Navigate to={`?uuid=${idShosen}`} replace={true} />}
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
              <Button disabled={!idShosen} label="Generate Excel Template" />
            </div>
          </div>
        </div>
        {/* <div className="view">
          {idShosen ? (
            <iframe
              width="100%"
              height="400"
              src={`${apiUrl}/${idShosen}`}
            ></iframe>
          ) : (
            <p className="previewPlaceholder">No preview yet</p>
          )}
        </div> */}
      </div>
    </div>
  );
}
