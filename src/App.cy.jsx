import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("<App />", () => {
  it("renders App component", () => {
    cy.mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
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

    // cy.wait("@getAllTemplates").then((interception) => {
    //   expect(interception.response.statusCode).to.eq(200);
    // });
  });
});
