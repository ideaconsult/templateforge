const testURLRoot = "http://localhost:5173/templates";

describe("Basic site functionality", () => {
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
  it("displays the under development notice", () => {
    cy.get("#root > div > p")
      .should("have.class", "underDev")
      .and("be.visible");
  });

  it("Choosing Draft Templates", () => {
    cy.contains("Drafts Blueprints").click();
    cy.wait(1000);
    cy.get(".nonSelected td").eq(1).click();
    cy.wait(1000);
    cy.contains("Edit blueprint").click();

    cy.intercept("GET", "/template/*", {
      fixture: "json/bk_rcapi_template_default.json",
    }).as("getTemplate");

    cy.wait("@getTemplate")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);

    cy.get("#Save").click();

    cy.intercept("POST", "/template/*", {
      fixture: "json/bk_rcapi_template_default.json",
    }).as("saveTemplate");

    cy.wait("@saveTemplate", { timeout: 10000 }).should(({ request }) => {
      expect(request.body).to.include("template_name");
      expect(request.body).to.include("template_author");
      expect(request.body).to.include("template_acknowledgment");
    });
  });
});
