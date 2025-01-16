const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("Basic site functionality", () => {
  beforeEach(() => {
    cy.visit(testURLRoot);
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
  });

  it("displays the under development notice", () => {
    cy.get("#root > div > p")
      .should("have.class", "underDev")
      .and("be.visible");
  });

  it("chooses draft templates", () => {
    cy.get('[data-cy="draft"]').click();
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="Edit blueprint"]').click();

    cy.get("#Save").click();

    cy.intercept("POST", "/template/*", {
      hostname: "api-test.ramanchada.ideaconsult.net",
      fixture: "json/bk_rcapi_template_default.json",
    }).as("saveTemplate");
  });
});
