// @ts-nocheck
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import ProcessingBluePrintDialog from "../DialogComp/ProcessingBluePrintDialog";
import LogoBar from "../MenuBar/LogoBar";
import Button from "../ui/Button";
import config from "../utils/config";
import urlConfig from "../utils/appUrl";
import CreateNewDialog from "./../DialogComp/CreateNewDialog";

import TemplateTable from "@/DataTable/TemplateTable";

import { Link } from "react-router-dom";

import useSWR from "swr";

import { fetcher } from "../lib/fetcher";

import {
  useIsShosen,
  useSetIsShosen,
  useSetShowStartScreen,
  useSetUuid,
  useUuid,
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
  const projectID = localStorage.getItem("projectID");

  // https://api-test.ramanchada.ideaconsult.net/template/2fb538c8-094d-4cd4-a9d8-6faff5880fbf?format=xlsx&project={the-selected-project-id}
  const templateURL = `${apiUrl}/${idShosen}?format=xlsx&project=${projectID}`;

  const { data, isLoading, error } = useSWR(`${apiUrl}`, fetcher);

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
    ? `${window.location.href}?uuid=${idShosen}`
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
          id="Finalized"
          onClick={() => setMode("Finalized")}
          className={mode == "Finalized" ? "tabActive" : "tab"}
        >
          Finalized Blueprints
        </p>
        <p
          id="Draft"
          onClick={() => setMode("Draft")}
          className={mode == "Draft" ? "tabActive" : "tab"}
        >
          Drafts Blueprints
        </p>
      </div>

      <div className="tableViewWrap">
        <div className="inputWrap">
          <TemplateTable data={!isLoading && templateData} />

          <div className="buttonsWrap">
            <div
              onClick={() => {
                setUUID(idShosen);
                setStartScreen();
                window.localStorage.setItem(storageItemKey, "");
              }}
            >
              <Button
                disabled={!idShosen || error}
                label={mode == "Finalized" ? "View" : "Edit blueprint"}
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
            <Link to={"/wizard"}>
              <Button disabled={!idShosen} label="Customize Excel template" />
            </Link>
            {/* <ProcessingBluePrintDialog /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
