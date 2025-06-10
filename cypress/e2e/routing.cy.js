const testURLRoot = "http://127.0.0.1:50722/templates/";
const UUID = "8f85c8d4-f2c7-44cc-aed4-959d8694f7af";
const draftUUID = "2991fced-0cd5-4408-846a-61d446527489";
// const invalidUUID = "8f85c8d4-f2c7-44cc-aed4-959d8694f7afbj;jgjjg";

describe("Routing-related navigation", () => {
  beforeEach(() => {
    cy.visit(testURLRoot);
    cy.intercept(
      {
        method: "GET",
        url: "/template",
        hostname: "api.templates.ideaconsult.net",
      },
      {
        fixture: "json/bk_rcapi_templates_generated.json",
      }
    ).as("getAllTemplates");
  });

  it("can navigate to the Home page by default", () => {
    cy.get("#root").should("exist");
  });

  it("can navigate to a View Template page", () => {
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="View"]').click();
    cy.url().should("include", `/templates/${UUID}`);
    cy.get('[data-cy="template-page"]').should("exist");
  });

  it("can navigate to an Edit Template page", () => {
    cy.get('[data-cy="draft"]').click();
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="Edit blueprint"]').click();
    cy.url().should("include", `/templates/${draftUUID}?mode=edit`);
    cy.get('[data-cy="template-page"]').should("exist");
  });

  it("can navigate to the Home page by pressing Back button", () => {
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="View"]').click();
    cy.go("back");
    cy.get(".underDev").should("exist");
  });

  it("can remember last open tab", () => {
    cy.get('[data-cy="draft"]').click();
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="Edit blueprint"]').click();
    cy.get(".logoWrap").click();
    cy.get('[data-cy="draft"]').should("have.class", "tabActive");
  });
});
