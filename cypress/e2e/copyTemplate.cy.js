const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("Copy existing template", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/template",
        hostname: "api-test.ramanchada.ideaconsult.net",
      },
      {
        fixture: "json/bk_rcapi_template_default.json",
      }
    ).as("getAllTemplates");

    cy.visit(testURLRoot);
  });

  it("Find template by searching", () => {
    cy.get(".search").click().type("Dose response");
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="copy-btn"]').click();
  });

  //   it("Make a copy", () => {

  //   });
});
