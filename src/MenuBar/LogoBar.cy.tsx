import React from "react";
import LogoBar from "./LogoBar";

describe("<LogoBar />", () => {
  it("renders", () => {
    // @ts-ignore
    cy.mount(<LogoBar startScreen={true} setProjectID="" uuid="" />);
  });
});
