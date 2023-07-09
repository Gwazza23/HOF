import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./LoginPage";

describe("<LoginPage />", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <LoginPage />
      </Router>
    );
  });

  it("renders", () => {
    cy.mount(
      <Router>
        <LoginPage />
      </Router>
    );
  });

  it("allows users to type into input fields", () => {
    const email = "test@example.com";
    const password = "password123";

    cy.get('input[id="email"]').type(email).should("have.value", email);
    cy.get('input[id="password"]')
      .type(password)
      .should("have.value", password);

    cy.get('[data-testid="signin-button"]').click();
  });

  it("should submit the form and make a POST request", () => {
    cy.intercept("POST", "https://house-of-fashion.onrender.com/users/login", {
      statusCode: 200,
    }).as("login");

    cy.get("#email").type("test@example");
    cy.get("#password").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.url().should("include", "/");
  });

  it("should handle errors during form submission", () => {
    cy.intercept("POST", "https://house-of-fashion.onrender.com/users/login", {
      statusCode: 400,
      body: "Incorrect email or password",
    }).as("login");

    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.eq(400);
      expect(interception.response.body).to.eq("Incorrect email or password");

      cy.get(".error").should("have.text","Incorrect email or password");
    });
  });
});
