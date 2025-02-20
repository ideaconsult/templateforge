const testURLRoot = "http://127.0.0.1:50722/templates/";
const expectedUrl = testURLRoot + "?uuid=d8fcd5b6-75b9-4794-80c6-462c00bb33b8"

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
