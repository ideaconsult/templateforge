// @ts-nocheck
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import Notification from "../DialogComp/Notification";

import { onLookup } from "../DataTable/CategoryLookUp";

import LogoBar from "../MenuBar/LogoBar";
import Button from "../ui/Button";
import config from "../utils/config";
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
  useProjectID,
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
  const projectID = useProjectID();

  const [showNotification, setShowNotification] = useState(false);

  const idShosen = useIsShosen();
  const setIdShosen = useSetIsShosen();

  const apiUrl = config.apiUrl;

  const templateURL = `${apiUrl}/${idShosen}?format=xlsx&project=${projectID}`;

  const { data, isLoading, error } = useSWR(`${apiUrl}`, fetcher, {
    cachePolicy: "no-cache",
  });

  const mappedCategoryData =
    data &&
    data.template.map((item) => ({
      ...item,
      PROTOCOL_CATEGORY_CODE: onLookup(item["PROTOCOL_CATEGORY_CODE"]),
    }));

  const templateData = [];
  data &&
    mappedCategoryData.map((item) => {
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
    : `http://localhost:5173/templates?uuid=${idShosen}`;

  const copyLink = () => {
    idShosen && navigator.clipboard.writeText(urlToCopy);
  };

  setTimeout(() => {
    setCopied(false);
  }, 5000);

  setTimeout(() => {
    setShowNotification(false);
  }, 8000);

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
          data-cy="finalized"
          id="Finalized"
          onClick={() => setMode("Finalized")}
          className={mode == "Finalized" ? "tabActive" : "tab"}
        >
          Finalized Blueprints
        </p>
        <p
          data-cy="draft"
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
            {UUID && <Navigate to={`?uuid=${UUID}`} replace={true} />}
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
            {showNotification && (
              <Notification>
                Project is not selected. &nbsp;
                <button onClick={dowloadXLS} className="genAnyway">
                  Generate anyway
                </button>
              </Notification>
            )}
            {projectID ? (
              <div onClick={dowloadXLS}>
                <Button disabled={!idShosen} label="Generate Excel Template" />
              </div>
            ) : (
              <div onClick={() => setShowNotification(true)}>
                <Button disabled={!idShosen} label="Generate Excel Template" />
              </div>
            )}
            <Link to={`?wizard=${idShosen}`}>
              <Button disabled={!idShosen} label="Customize Excel template" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
