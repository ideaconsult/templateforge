const testURLRoot = "http://localhost:5173/templates";

describe("Searching for Template", () => {
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

  it("Find search template field", () => {
    cy.get(".search").click().type("Dose response");
    cy.get(".nonSelected td").eq(1).click();
  });
});
