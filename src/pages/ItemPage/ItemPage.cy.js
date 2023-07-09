import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "cypress-real-events";
import { Provider } from "react-redux";
import ItemPage from "./ItemPage";
import store from "../../slices/store";

describe("<ItemPage>", () => {
  beforeEach(() => {
    const mockData = [
      {
        id: 1,
        name: "Item 1",
        img_url: "https://example.com/img/1.jpg",
        price: "$9.99",
        quantity: 5,
      },
    ];

    cy.stub(store, "getState").returns({
      products: {
        status: "completed",
        itemData: mockData,
      },
    });

    cy.mount(
      <Provider store={store}>
        <Router>
          <ItemPage />
        </Router>
      </Provider>
    );
  });

  it("should render page properly", () => {
    cy.get(".item-page-header h2").should("have.text", "Item 1");
    cy.get(".item-page-image img").should("exist");
    cy.get(".item-page-image img").should(
      "have.attr",
      "src",
      "https://example.com/img/1.jpg"
    );
    cy.get(".item-description").should("exist");
    cy.get(".item-page-quantity h3").should("contain", "5");
    cy.get(".item-page-price h3").should("contain", "$9.99");
  });

  it("should render mobile elements properly", () => {
    cy.viewport(429, 429);

    cy.get(".down").should("exist");
    cy.get(".item-page-description").should("not.have.class", "open");
    cy.get(".item-page-description p").should("not.be.visible");

    cy.get(".down").click();
    cy.get(".item-page-description p").should("be.visible");
  });

  it("increasing and decreasing quantity should work properly", () => {
    cy.get(".item-page-quantity input").type("5");
    cy.get(".item-page-quantity p").should("contain", 5 * 9.99);

    cy.get(".item-page-quantity input").clear();

    cy.get(".item-page-quantity input").type("3");
    cy.get(".item-page-quantity p").should("contain", 3 * 9.99);
  });

  it("clicking on add to cart should work properly", () => {
    cy.intercept("POST", "https://house-of-fashion.onrender.com/cart/", {
      statusCode: 200,
      body: "Item added to cart successfully",
    }).as("addToCart");

    cy.get(".item-page-quantity input").type("3");

    cy.get("button").contains("Add To Cart").click();

    cy.get(".response").should("contain", "Item added to cart successfully");

    cy.get(".error").should("not.exist");
  });

  it("clicking on add to cart with no quantity should return error", () => {
    cy.intercept("POST", "https://house-of-fashion.onrender.com/cart/").as(
      "addToCart"
    );
    cy.get("button").contains("Add To Cart").click();
    cy.get(".error").contains("Please select a quantity").should("exist");
  });
  
});
