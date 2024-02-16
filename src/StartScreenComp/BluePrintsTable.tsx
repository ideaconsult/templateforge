// @ts-nocheck
import React from "react";
import useSWR from "swr";

import { fetcher } from "../lib/fetcher";

import "./StartScreenComp.css";

import {
  useUuid,
  useSetUuid,
  useName,
  useSetName,
  useAuthor,
  useSetAuthor,
  useAcknowledgment,
  useSetAcknowledgment,
  useIsShosen,
  useSetIsShosen,
} from "../store/store";

export default function BluePrintsTable({ value, mode }) {
  const setUUID = useSetUuid();
  const UUID = useUuid();

  const idShosen = useIsShosen();
  const setIdShosen = useSetIsShosen();

  const name = useName();
  const setName = useSetName();
  const author = useAuthor();
  const setAuthor = useSetAuthor();
  const acknowledgment = useAcknowledgment();
  const setAcknowledgment = useSetAcknowledgment();

  console.log("store", idShosen);

  const { data, isLoading } = useSWR(
    `https://api.ramanchada.ideaconsult.net/template/`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const filteredData =
    data &&
    data.template.filter((item) => {
      const searchResult = value.toLowerCase();
      const name = item.template_name.toLowerCase();
      if (value) {
        return (
          searchResult &&
          name.toLowerCase().includes(searchResult.toLowerCase()) &&
          name !== searchResult
        );
      } else {
        return item;
      }
    });

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
            filteredData.map((item) => {
              if (mode == "Draft" && item.template_status == "DRAFT") {
                return (
                  <tr
                    key={item.uuid}
                    onClick={() => {
                      setIdShosen(item.uuid);
                    }}
                    className={item.uuid == idShosen ? "choosen" : ""}
                  >
                    <td onClick={() => setName(item.template_name)}>
                      {item.template_name}
                    </td>
                    <td>{item.template_author}</td>
                    <td>{item.timestamp}</td>
                  </tr>
                );
              }
              if (mode == "Finalized" && item.template_status == "FINALIZED") {
                return (
                  <tr
                    key={item.uuid}
                    onClick={() => setUUID(item.uuid)}
                    className={item.uuid == idShosen && "choosen"}
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
