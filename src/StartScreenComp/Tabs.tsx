import React from "react";
import "./StartScreenComp.css";

export default function Tabs({ mode, setMode }) {
  return (
    <div className="tabsWrap">
      <p
        data-cy="finalized"
        id="Finalized"
        onClick={() => {
          setMode("Finalized");
        }}
        className={mode == "Finalized" ? "tabActive" : "tab"}
      >
        Finalized Blueprints
      </p>
      <p
        data-cy="draft"
        id="Draft"
        onClick={() => {
          setMode("Draft");
        }}
        className={mode == "Draft" ? "tabActive" : "tab"}
      >
        Drafts Blueprints
      </p>
    </div>
  );
}
