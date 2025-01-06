import React from "react";
import Select from "./Select";

const url = "https://enanomapper.adma.ai/api/projects.json";

describe("<Select />", () => {
  it("renders Select Component", () => {
    // @ts-ignore
    cy.mount(<Select url={url} projectName="" />);
  });
});
