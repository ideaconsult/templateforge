const testURLRoot = "http://127.0.0.1:50722/templates/";
const expectedUrl = testURLRoot + "?uuid=a7b58a49-4ead-4a1b-beb4-46b09f061401";

describe("Copy Template Link Functionality", () => {
  beforeEach(() => {
    cy.visit(testURLRoot);
    cy.intercept(
      {
        method: "GET",
        url: "/template",
        hostname: "api-test.ramanchada.ideaconsult.net",
      },
      {
        fixture: "json/bk_rcapi_templates_generated.json",
      }
    ).as("getAllTemplates");
  });

  it("can copy the link to the clipboard", () => {
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="Share a link"]').as("copyButton");

    cy.get("@copyButton").click();

    cy.window().its("navigator.clipboard")
      .then((clip) => clip.readText())
      .should("equal", expectedUrl);
  });
});
