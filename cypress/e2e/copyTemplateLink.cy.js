const testURLRoot = "http://127.0.0.1:50722/templates/";
const fixture = "json/templates_generated.json";

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
        fixture,
      }
    ).as("getAllTemplates");
  });

  it("can copy the link to the clipboard", () => {
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="Share a link"]').as("copyButton");

    cy.get("@copyButton").click();

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(
          "http://127.0.0.1:50722/templates/?uuid=cbe07283-c4c0-416a-a784-4a0274592bee"
        );
      });
    });
  });
});
