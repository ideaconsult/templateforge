import React from "react";
import Button from "./Button";

describe("<Button />", () => {
  it("renders Button Component", () => {
    // @ts-ignore
    cy.mount(<Button label="View" disabled={false} />);
    cy.get("[data-cy=View]").should("have.text", "View");
  });
});
