const testURLRoot = "http://127.0.0.1:50722/templates/";

describe("Table column sorting functionality", () => {
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

  it('extracts text from the "Template Name" column and sorts them in ascending order', () => {
    const originalNames = [];

    cy.get('[data-cy="Template Name"]').click();

    cy.get(".nonSelected").each((el) => {
      let text = el.find("td:nth-child(1)").text();
      originalNames.push(text);

      const ascendingNames = [...originalNames].sort();

      expect(originalNames).to.deep.equal(ascendingNames);
    });
  });

  it('extracts text from the "Template Name" column and sorts them in descending order', () => {
    const originalNames = [];

    cy.get('[data-cy="Template Name"]').click();
    cy.get('[data-cy="Template Name"]').click();

    cy.get(".nonSelected").each((el) => {
      let text = el.find("td:nth-child(1)").text();
      originalNames.push(text);

      const descendingNames = [...originalNames].sort().reverse();

      expect(originalNames).to.deep.equal(descendingNames);
    });
  });
});
