/* eslint-disable no-undef */
const testURLRoot = "http://127.0.0.1:50722/templates/";
const uuidToCopy = "8f85c8d4-f2c7-44cc-aed4-959d8694f7af";
const uuidNew = "2991fced-0cd5-4408-846a-61d446527489";
const nameInput = "M`{9&{.  <(TfYjbu|I6 [^3 fgKi:^-";
const authorInput = "(r<wY Cj0TfZ] Y4Q 0W%n ~645m# :c";
const acknowledgmentInput = "0!utyx.?< }I1Z ymhpn <-~t}U &E<X";

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
      url: `/template/${uuidToCopy}`,
      hostname: "api-test.ramanchada.ideaconsult.net",
    },
    {
      fixture: "json/bk_rcapi_template_uuid_generated.json",
    }
  ).as("getTemplateToCopy");

  cy.intercept(
    {
      method: "POST",
      url: `/template/${uuidToCopy}/copy`,
      hostname: "api-test.ramanchada.ideaconsult.net",
    },
    {
      fixture: "json/bk_rcapi_templates_generated.json",
    }
  ).as("postTemplateCopy");

  cy.intercept(
    {
      method: "GET",
      url: `/template/${uuidNew}`,
      hostname: "api-test.ramanchada.ideaconsult.net",
    },
    {
      fixture: "json/bk_rcapi_template_uuid_generated.json",
    }
  ).as("getNewTemplate");
}

describe("Make a copy functionality", () => {
  beforeEach(() => {
    setIntercepts();
    cy.visit(testURLRoot);
  });

  it("opens Make a Copy Dialog and makes copy", () => {
    cy.get(".nonSelected td").eq(1).click();
    cy.get('[data-cy="copy-btn"]').click();
    cy.get(".DialogContent").should("be.visible");
    cy.get('[data-cy="name-input"]').should("have.value", nameInput);
    cy.get('[data-cy="author-input"]').should("have.value", authorInput);
    cy.get('[data-cy="acknowledgment-input"]').should(
      "have.value",
      acknowledgmentInput
    );

    cy.get('[data-cy="make-copy-btn"]').click();
    cy.url().should("include", `/${uuidToCopy}`);
  });
});
