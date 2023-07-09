import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./RegisterPage";

describe("<RegisterPage />", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <RegisterPage />
      </Router>
    );
  });

  it("renders", () => {
    cy.mount(
      <Router>
        <RegisterPage />
      </Router>
    );
  });

  it("allows users to type into input fields", () => {
    const email = "test@example.com";
    const firstName = "John";
    const lastName = "Doe";
    const password = "password123";

    cy.get('input[id="email"]').type(email).should("have.value", email);
    cy.get('input[id="firstName"]')
      .type(firstName)
      .should("have.value", firstName);
    cy.get('input[id="lastName"]')
      .type(lastName)
      .should("have.value", lastName);
    cy.get('input[id="password"]')
      .type(password)
      .should("have.value", password);

    cy.get('[data-testid="signup-button"]').click();
  });

  it("should submit the form and make a POST request", () => {
    cy.intercept(
      "POST",
      "https://house-of-fashion.onrender.com/users/register",
      {
        statusCode: 201,
      }
    ).as("register");

    cy.get("#email").type("test@example.com");
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#password").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@register").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });

    cy.get(".response").should(
      "have.text",
      "Account successfully created! redirecting to login page..."
    );
    cy.url().should("include", "/login");
  });

  it("should handle errors during form submission", () => {
    cy.intercept(
      "POST",
      "https://house-of-fashion.onrender.com/users/register",
      {
        statusCode: 400,
        body: "Email already exists",
      }
    ).as("register");

    cy.get("#email").type("test@example.com");
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#password").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@register").then((interception) => {
      expect(interception.response.statusCode).to.eq(400);
      expect(interception.response.body).to.eq("Email already exists");

      cy.get(".error").should("have.text", "Email already exists");
      cy.get(".response").should("not.exist");
    });
  });
});
