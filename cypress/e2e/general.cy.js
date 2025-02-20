const testURLRoot = "http://127.0.0.1:50722/templates/";

function setIntercepts() {
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

  cy.intercept(
    {
      method: "GET",
      url: "/api/projects.json",
      hostname: "enanomapper.adma.ai",
    },
    {
      fixture: "json/bk_11ty_projects_default.json",
    }
  ).as("getAllProjects");
}

describe("General site functionality", () => {
  beforeEach(() => {
    setIntercepts();
    cy.visit(testURLRoot);
  });

  it("displays the under development notice", () => {
    cy.get("#root > div > p")
      .should("have.class", "underDev")
      .and("be.visible");
  });

  it("can create a new empty draft", () => {
    cy.get('[data-cy="create-new-btn"]').click();
    cy.get('[data-cy="name-input"]').type("name: test");
    cy.get('[data-cy="author-input"]').type("author: test");
    cy.get('[data-cy="acknowledgment-input"]').type("acknowledgment: test");
  });

  it("can set and unset a specific project", () => {
    cy.get('[data-cy="preferences-btn"]').click();
    cy.get('[data-cy="select-btn"]').click();
    cy.get('[data-project="enanomapper"]').click();
    cy.get('[data-cy="ok-btn"]').click();

    cy.get('[data-cy="preferences-btn"]').click();
    cy.get('[data-cy="clean-btn"]').click();
    cy.get('[data-cy="ok-btn"]').click();
  });

  it("can find an existing draft by searching", () => {
    cy.get('[data-cy="draft"]').click();
    cy.get(".search")
      .click()
      .type("hu@9n[2 FoPZZ|=T0}L]E=UB?yF4Efd");
    cy.get(".nonSelected td").eq(1).click();
  });

  it("can switch to the next page and back", () => {
    cy.get('[data-cy="draft"]').click();
    cy.get('[data-cy="current-page-number"]').should("have.text", "1");
    cy.get('[data-cy="next-page"]').click();
    cy.get('[data-cy="current-page-number"]').should("have.text", "2");
    cy.get('[data-cy="previous-page"]').click();
    cy.get('[data-cy="current-page-number"]').should("have.text", "1");
  });
});
