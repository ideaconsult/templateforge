import React from "react";

import "./StartScreenComp.css";

export default function BluePrintsTable({ data }) {
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
            data.template.map((item) => {
              return (
                <tr key={item.uuid}>
                  <td>{item.template_name}</td>
                  <td>{item.template_author}</td>
                  <td>{item.timestamp}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
