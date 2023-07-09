import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Hero from "./Hero";

describe("<Hero />", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <Hero />
      </Router>
    );
  });

  it("renders", () => {
    cy.mount(
      <Router>
        <Hero />
      </Router>
    );
  });

  it("should render the background image", () => {
    cy.get(".hero-div").should("have.css","background-image")
  })

  it("should display the text correctly", () => {
   cy.get('.hero-text').should('be.visible')
   cy.get('h2').should('have.text','Discover Fashion at your fingertips');
   cy.get('h4').should('have.text','Est. 2023')
  })
});
