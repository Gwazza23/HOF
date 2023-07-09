import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "cypress-real-events";
import { Provider } from "react-redux";
import ProfilePage from "./ProfilePage";
import store from "../../slices/store";

describe("<ProfilePage />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <Router>
          <ProfilePage />
        </Router>
      </Provider>
    );
  });

  it("renders properly - No additional info given", () => {
    const mockData = [
      {
        firstname: "John",
        lastname: "Doe",
        email: "test@example.com",
      },
    ];

    cy.stub(store, "getState").returns({
      users: {
        status: "completed",
        data: mockData,
      },
    });

    cy.get(".profile-page-div h2")
      .should("exist")
      .should("have.text", "Profile");
    cy.get(".profile-page-info p")
      .eq(0)
      .should("have.text", "First Name:  John  ");
    cy.get(".profile-page-info p").eq(1).should("have.text", "Last Name: Doe ");
    cy.get(".profile-page-info p")
      .eq(2)
      .should("have.text", "E-mail: test@example.com ");
    cy.get(".profile-page-info p").eq(3).should("have.text", "Phone: ");
    cy.get(".profile-page-info p").eq(4).should("have.text", "Address: ");

    cy.get(".form").should("be.visible");
  });

  it("renders properly - Additional info given", () => {
    const mockData = [
      {
        firstname: "John",
        lastname: "Doe",
        email: "test@example.com",
        phone: "11111112",
        addressline1: "No 12 baker street",
        addressline2: "Baker lane",
        city: "London",
        state: "Greater London",
        postcode: "LDN 12",
        country: "UK",
      },
    ];

    cy.stub(store, "getState").returns({
      users: {
        status: "completed",
        data: mockData,
      },
    });

    cy.get(".profile-page-div h2")
      .should("exist")
      .should("have.text", "Profile");
    cy.get(".profile-page-info p")
      .eq(0)
      .should("have.text", "First Name:  John  ");
    cy.get(".profile-page-info p").eq(1).should("have.text", "Last Name: Doe ");
    cy.get(".profile-page-info p")
      .eq(2)
      .should("have.text", "E-mail: test@example.com ");
    cy.get(".profile-page-info p").eq(3).should("have.text", "Phone: 11111112");
    cy.get(".profile-page-address div p").eq(0).should("have.text", "No 12 baker street");
    cy.get(".profile-page-address div p").eq(1).should("have.text", "Baker lane")
    cy.get(".profile-page-address div p").eq(2).should("have.text", "London")
    cy.get(".profile-page-address div p").eq(3).should("have.text", "Greater London")
    cy.get(".profile-page-address div p").eq(4).should("have.text", "LDN 12")
    cy.get(".profile-page-address div p").eq(5).should("have.text", "UK")

    cy.get(".form").should('not.exist')
  });
});
