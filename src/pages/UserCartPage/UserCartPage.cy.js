import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "cypress-real-events";
import { Provider } from "react-redux";
import UserCartPage from "./UserCartPage";
import store from "../../slices/store";

describe("<UserCartPage />", () => {
  beforeEach(() => {
    

    cy.mount(
      <Provider store={store}>
        <Router>
          <UserCartPage />
        </Router>
      </Provider>
    );
  });

  it("renders properly", () => {
    cy.get(".user-cart-page-div-header p")
      .eq(0)
      .should("have.text", "item name");
    cy.get(".user-cart-page-div-header p")
      .eq(1)
      .should("have.text", "quantity");
    cy.get(".cart-total")
      .should("exist")
      .should("have.text", "Cart Total : $0.00");
    cy.get('.check-out-button-div button').should('exist')
  });
});
