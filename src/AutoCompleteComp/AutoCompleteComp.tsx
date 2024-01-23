// @ts-nocheck
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

import "./AutoCompleteComp.css";

export default function AutoCompleteComp({ setOpen }) {
  const { data } = useSWR(
    "https://api.ramanchada.ideaconsult.net/template",
    fetcher
  );

  const [value, setValue] = useState("");
  const [templateURL, setTemplateURL] = useState("");
  console.log(templateURL);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (v) => {
    setValue(v);
    setOpen(false);
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
        {data &&
          data.template
            .filter((item) => {
              const searchResult = value.toLowerCase();
              const name = item.PROTOCOL_CATEGORY_CODE.toLowerCase();

              return (
                searchResult &&
                name.startsWith(searchResult) &&
                name !== searchResult
              );
            })
            // .slice(0, 10)
            .map((item, i) => (
              <div
                className="Option"
                onClick={() => {
                  setValue(item.PROTOCOL_CATEGORY_CODE);
                  setTemplateURL(item.uri);
                }}
                key={i}
              >
                {item.PROTOCOL_CATEGORY_CODE}
              </div>
            ))}
      </div>
    </div>
  );
}
