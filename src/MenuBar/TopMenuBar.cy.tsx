import React from "react";
import TopMenuBar from "./TopMenuBar";

describe("<TopMenuBar />", () => {
  it("renders", () => {
    // @ts-ignore
    cy.mount(<TopMenuBar />);
    cy.get("#Save > span").contains("Save");
    cy.get("#Share > span").contains("Share");
    cy.get("#Generate-Excel-Template > span").contains(
      "Generate Excel Template"
    );
  });
});
