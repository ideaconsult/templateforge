import React from "react";
import CreateNewDialog from "./CreateNewDialog";

describe("<CreateNewDialog />", () => {
  it("renders", () => {
    // @ts-ignore
    cy.mount(<CreateNewDialog />);
    cy.get('[data-cy="create-new-btn"]').click();
    cy.get('[data-cy="name-input"]').type("name: test");
    cy.get('[data-cy="author-input"]').type("author: test");
    cy.get('[data-cy="acknowledgment-input"]').type("acknowledgment: test");
  });
});
