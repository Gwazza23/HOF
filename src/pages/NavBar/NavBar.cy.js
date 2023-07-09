import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "cypress-real-events";
import NavBar from "./NavBar";
import store from "../../slices/store";

describe("<NavBar />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
  });

  it("should render the component", () => {
    cy.get("nav").should("exist");
    cy.get(".hamburger").should("exist");
    cy.get(".nav-logo h1").should("exist");
    cy.get(".nav-links li").should("exist");
  });

  it("render correctly while in isMobile state", () => {
    cy.viewport(574, 574);

    cy.get(".nav-logo h1").should("have.text", "H . O . F");
  });

  it("render correctly while not in isMobile state", () => {
    cy.viewport(575, 575);

    cy.get(".nav-logo h1").should("have.text", "House Of Fashion");
  });

  it("hamburger button should work correctly", () => {
    cy.get(".nav-links").should("not.have.class", "open");
    cy.get("body").should("not.have.class", "scroll-lock");
    cy.get(".nav-links li").should("not.be.visible");

    cy.get(".hamburger").click();
    cy.get(".nav-links").should("have.class", "open");
    cy.get("body").should("have.class", "scroll-lock");
    cy.get(".nav-links li").should("have.text", "Log in").should("exist");
  });

  it("nav-links should render different categories", () => {
    const mockData = [
      {
        id: 1,
        category_name: "Category 1",
      },
      {
        id: 2,
        category_name: "Category 2",
      },
    ];

    cy.stub(store, "getState").returns({
      products: {
        status: "completed",
        categoriesData: mockData,
      },
    });

    cy.get(".hamburger").click();
    cy.get(".nav-links li").should("have.length", 3);
  });

  it("clicking on Log in should take to log in page", () => {
    cy.get(".hamburger").click();
    cy.contains("Log in").click();
    cy.location("pathname").should("eq", "/login");
  });

  it("clicking on the profile link when a user is logged in takes them to the profile page", () => {
    const user = {
      data: [
        {
          firstname: "John",
        },
      ],
    };

    cy.stub(store, "getState").returns({
      user: {
        status: "completed",
        data: user,
      },
    });

    cy.setCookie("user_id", "1");

    cy.get(".hamburger").click();
    cy.contains("Profile -").click({ force: true });
    cy.location("pathname").should("eq", "/profile/1");
  });

  it("clicking on the cart link when a user is logged in takes them to the cart page", () => {
    const user = {
      data: [
        {
          firstname: "John",
        },
      ],
    };

    cy.stub(store, "getState").returns({
      user: {
        status: "completed",
        data: user,
      },
    });

    cy.setCookie("user_id", "1");

    cy.get(".hamburger").click();
    cy.contains("Cart ()").click({ force: true });
    cy.location("pathname").should("eq", "/cart/1");
  });
});
