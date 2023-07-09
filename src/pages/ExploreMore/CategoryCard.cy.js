import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "cypress-real-events";
import CategoryCard from "./CategoryCard";

describe("<CategoryCard />", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <CategoryCard category={{ category_name: "Jackets" }} />
      </Router>
    );
  });

  it("renders", () => {
    cy.get("div").should('exist')
    cy.get('div h3').should("contain", "Jackets")
  })
});
