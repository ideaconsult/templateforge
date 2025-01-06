import React from "react";
import LogoBar from "./LogoBar";

describe("<LogoBar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LogoBar startScreen={true} setProjectID="" uuid="" />);
  });
});
