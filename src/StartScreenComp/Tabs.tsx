import React from "react";
import "./StartScreenComp.css";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function Tabs({ setMode, tabsMode }) {
  const { setLocalStorageItem } = useLocalStorage("mode");
  return (
    <div className="tabsWrap">
      <p
        data-cy="finalized"
        id="Finalized"
        onClick={() => {
          setMode("Finalized");
          setLocalStorageItem("Finalized");
        }}
        className={tabsMode == "Finalized" ? "tabActive" : "tab"}
      >
        Finalized Blueprints
      </p>
      <p
        data-cy="draft"
        id="Draft"
        onClick={() => {
          setMode("Draft");
          setLocalStorageItem("Draft");
        }}
        className={tabsMode == "Draft" ? "tabActive" : "tab"}
      >
        Drafts Blueprints
      </p>
    </div>
  );
}
