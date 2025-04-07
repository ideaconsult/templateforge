// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MakeCopyDialog from "../DialogComp/MakeCopyDialog";
import Notification from "../DialogComp/Notification";
import { useFetchTemplates } from "./hooks/useFetchTemplates";

import { onLookup } from "../DataTable/CategoryLookUp";

import LogoBar from "../MenuBar/LogoBar";
import Button from "../ui/Button";
import config from "../utils/config";
import CreateNewDialog from "./../DialogComp/CreateNewDialog";

import TemplateTable from "@/DataTable/TemplateTable";

import { Link } from "react-router-dom";

import {
  useIsShosen,
  useMode,
  useProjectID,
  useSetIsShosen,
  useSetMode,
  useSetShowStartScreen,
  useSetUuid,
  useSetViewMode,
  useUuid,
} from "../store/store";

import { downloadFile } from "../lib/request";
import { useLocalStorage } from "./hooks/useLocalStorage";

import UnderDev from "@/ui/UnderDev";
import DescriptionComp from "./DescriptionComp";
import "./StartScreenComp.css";
import Tabs from "./Tabs";

export default function StartScreenComp({}) {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const UUID = useUuid();
  const setUUID = useSetUuid();
  const setStartScreen = useSetShowStartScreen();
  const setViewMode = useSetViewMode();
  const projectID = useProjectID();
  const mode = useMode();
  const setMode = useSetMode();

  const { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } =
    useLocalStorage("mode");

  const tabsMode = getLocalStorageItem() || mode;

  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const idShosen = useIsShosen();
  const setIdShosen = useSetIsShosen();

  const apiUrl = config.apiUrl;

  const templateURL = `${apiUrl}/${idShosen}?format=xlsx&project=${projectID}`;

  const { data, isLoading, error } = useFetchTemplates();

  const mappedCategoryData = data?.template.map((item) => ({
    ...item,
    PROTOCOL_CATEGORY_CODE: onLookup(item["PROTOCOL_CATEGORY_CODE"]),
  }));

  const templateData = [];
  data &&
    mappedCategoryData.map((item) => {
      if (tabsMode == "Finalized" && item.template_status == "FINALIZED") {
        return templateData.push(item);
      }
      if (tabsMode == "Draft" && item.template_status == "DRAFT") {
        return templateData.push(item);
      }
    });

  const downloadXLS = () => {
    idShosen && downloadFile(idShosen, templateURL);
  };

  const urlToCopy = import.meta.env.PROD
    ? `${window.location.href}${idShosen}`
    : `http://localhost:5173/templates/${idShosen}`;

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
      <UnderDev />
      <LogoBar startScreen={true} setIdShosen={setIdShosen} />
      <div className="descriptionNew">
        <DescriptionComp />
        <CreateNewDialog />
      </div>
      <Tabs setMode={setMode} tabsMode={tabsMode} />
      <div className="tableViewWrap">
        <div className="inputWrap">
          <TemplateTable data={!isLoading && templateData} />
          <div className="buttonsWrap">
            {tabsMode == "Draft" && (
              <div
                onClick={() => {
                  setUUID(idShosen);
                  setStartScreen();
                  setViewMode(true);
                  navigate(`/${idShosen}`);
                }}
              >
                <Button disabled={!idShosen || error} label="View" />
              </div>
            )}
            <div
              onClick={() => {
                setUUID(idShosen);
                setStartScreen();

                if (tabsMode == "Finalized") {
                  setViewMode(true);
                  navigate(`/${idShosen}`);
                } else {
                  setViewMode(false);
                  navigate(`/${idShosen}?mode=edit`);
                }
                window.localStorage.setItem(storageItemKey, "");
              }}
            >
              <Button
                disabled={!idShosen || error}
                label={tabsMode == "Finalized" ? "View" : "Edit blueprint"}
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
            {showNotification && (
              <Notification mode={mode}>
                Project is not selected. &nbsp;
                <button onClick={downloadXLS} className="genAnyway">
                  Generate anyway
                </button>
              </Notification>
            )}
            {projectID ? (
              <div onClick={downloadXLS}>
                <Button disabled={!idShosen} label="Generate Excel Template" />
              </div>
            ) : (
              <div onClick={() => setShowNotification(true)}>
                <Button disabled={!idShosen} label="Generate Excel Template" />
              </div>
            )}
            <Link to={`/wizard/${idShosen}`}>
              <Button disabled={!idShosen} label="Customize Excel template" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
