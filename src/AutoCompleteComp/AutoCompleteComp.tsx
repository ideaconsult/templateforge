// @ts-nocheck
import React, { useState } from "react";
import "./AutoCompleteComp.css";

import { mockTamplates } from "../data/MockTemplates";

export default function AutoCompleteComp({ setOpen }) {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (v) => {
    setValue(v);
    setOpen(false);
    console.log(v);
  };
  return (
    <div>
      <div className="InputWrap">
        <input
          className="Input"
          type="text"
          value={value}
          onChange={onChange}
        />
        <button className="Button" onClick={() => onSearch(value)}>
          Choose
        </button>
      </div>
      <div className="List">
        {mockTamplates
          .filter((item) => {
            const searchResult = value.toLowerCase();
            const name = item.toLowerCase();

            return (
              searchResult &&
              name.startsWith(searchResult) &&
              name !== searchResult
            );
          })
          // .slice(0, 10)
          .map((item, i) => (
            <div className="Option" onClick={() => setValue(item)} key={i}>
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}
