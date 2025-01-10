import React from "react";
import PreferencesDialog from "./PreferencesDialog";

describe("<PreferencesDialog />", () => {
  it("renders", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    // @ts-ignore
    cy.mount(<PreferencesDialog setProjectName={onChangeSpy} projectName="" />);
    cy.get('[data-cy="preferences-btn"]').should("have.text", "Preferences");
    cy.contains("Preferences").click();
  });
});
