const testURLRoot = 'http://127.0.0.1:50722/templates/'

describe('Basic site functionality', () => {

  it('displays the under development notice', () => {
    cy.intercept({
      method: 'GET',
      url: '/template',
      hostname: 'api-test.ramanchada.ideaconsult.net',
    }, {
      fixture: 'json/bk_rcapi_template_default.json',
    })
    cy.visit(testURLRoot)
    cy.get("#root > div > p")
      .should('have.class', 'underDev')
      .and('be.visible')
  })

})
