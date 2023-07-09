import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "cypress-real-events";
import { Provider } from "react-redux";
import ExtraInfoForm from "./ExtraInfoForm";
import store from "../../slices/store";

describe("<ExtraInfoForm />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <Router>
          <ExtraInfoForm />
        </Router>
      </Provider>
    );
  });

  it("renders properly", () => {
    cy.get(".extra-info-title h3")
      .should("exist")
      .should("have.text", "Contact Details");

    cy.get(".extra-info div").eq(0).should("have.text", "Phone:");
    cy.get(".extra-info div").eq(1).should("have.text", "Address Line 1:");
    cy.get(".extra-info div").eq(2).should("have.text", "Address Line 2:");
    cy.get(".extra-info div").eq(3).should("have.text", "City:");
    cy.get(".extra-info div").eq(4).should("have.text", "State/Province:");
    cy.get(".extra-info div").eq(5).should("have.text", "Postal Code:");
    cy.get(".extra-info div").eq(6).should("contain", "Country:");
    cy.get("#country").should("have.value", "");
    cy.get("button").should("exist");
  });

  it("allows users to submit contact details", () => {
    cy.get(".extra-info input").eq(0).type("1234567");
    cy.get(".extra-info input").eq(1).type("No 15 example lane");
    cy.get(".extra-info input").eq(2).type("test street");
    cy.get(".extra-info input").eq(3).type("is this a town city?");
    cy.get(".extra-info input").eq(4).type("the best state");
    cy.get(".extra-info input").eq(5).type("C3 PO");
    cy.get("#country").select("Canada");
    cy.get("form").submit();
  });
});
