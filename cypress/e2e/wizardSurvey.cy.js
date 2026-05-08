const testURLRoot = "http://127.0.0.1:50722/templates/";
const templateUrl =
  "https://api.templates.ideaconsult.net/template/8eb6a363-d1c3-4380-8562-2651db4d227b?format=json&data_entry=true";
const testUuid = "8f85c8d4-f2c7-44cc-aed4-959d8694f7af";

function setIntercepts() {
  cy.intercept(
    {
      method: "GET",
      url: "/template",
      hostname: "api-test.templates.ideaconsult.net",
    },
    {
      fixture: "json/bk_rcapi_templates_generated.json",
    },
  ).as("getAllTemplates");

  cy.intercept(
    {
      method: "GET",
      url: "/template/" + testUuid + "?format=json&data_entry=true",
      hostname: "api-test.templates.ideaconsult.net",
    },
    {
      fixture: "json/bk_rcapi_template_uuid.json",
    },
  ).as("getTemplateUuid");
}

describe("Survey wizard functionality", () => {
  beforeEach(() => {
    cy.visit(testURLRoot);
    setIntercepts();
  });
  it("goes to wizard page", () => {
    cy.scrollTo("bottom");
    cy.get(".nonSelected td").eq(1).click();

    cy.get("#Customize-Excel-template").click();
  });
  // it("fills in the survey form", () => {
  //   // cy.wait("@getTemplateUuid").then(() => {
  //   //   cy.get("#sq_2339i").type("test");
  //   // });
  //   // cy.get("#sq_2339i").type("test");
  // });
});
