// @ts-nocheck
import React from "react";

import { useSetUuid, useUuid } from "../store/store";

import "./StartScreenComp.css";

export default function BluePrintsTable({ data, value, mode }) {
  const setUUID = useSetUuid();
  const UUID = useUuid();

  return (
    <div className="tableFixHead">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.template
              .filter((item) => {
                const searchResult = value.toLowerCase();
                const name = item.EXPERIMENT.toLowerCase();
                if (value) {
                  return (
                    searchResult &&
                    name.toLowerCase().includes(searchResult.toLowerCase()) &&
                    name !== searchResult
                  );
                } else {
                  return item;
                }
              })
              .map((item) => {
                if (mode == "Draft" && item.template_status == "DRAFT") {
                  return (
                    <tr
                      key={item.uuid}
                      onClick={() => {
                        setUUID(item.uuid);
                      }}
                      className={item.uuid == UUID ? "choosen" : ""}
                    >
                      <td>{item.template_name}</td>
                      <td>{item.template_author}</td>
                      <td>{item.timestamp}</td>
                    </tr>
                  );
                }
                if (
                  mode == "Finalized" &&
                  item.template_status == "FINALIZED"
                ) {
                  return (
                    <tr
                      key={item.uuid}
                      onClick={() => setUUID(item.uuid)}
                      className={item.uuid == UUID && "choosen"}
                    >
                      <td>{item.EXPERIMENT}</td>
                      <td>{item.template_author}</td>
                      <td>{item.timestamp}</td>
                    </tr>
                  );
                }
              })}
        </tbody>
      </table>
    </div>
  );
}
