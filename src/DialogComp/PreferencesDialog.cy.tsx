import React from "react";
import PreferencesDialog from "./PreferencesDialog";

describe("<PreferencesDialog />", () => {
  it("renders", () => {
    // @ts-ignore
    cy.mount(<PreferencesDialog setProjectName="" projectName="" />);
    cy.get('[data-cy="preferences-btn"]').should("have.text", "Preferences");
    cy.contains("Preferences").click();
  });
});
