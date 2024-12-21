import React from 'react'
import StartScreenComp from './StartScreenComp'

describe('<StartScreenComp />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<StartScreenComp />)
  })
})