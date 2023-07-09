import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "cypress-real-events";
import CategoryPage from "./CategoryPage";
import store from "../../slices/store";

describe("<CategoryPage /> - Completed", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <Router>
          <CategoryPage />
        </Router>
      </Provider>
    );
  });

  it("renders the LoadingPage component when the store status is 'loading'", () => {
    cy.stub(store, "getState").returns({
      products: {
        status: "Loading",
        categoryData: null,
      },
    });

    cy.get(".loading-page-container").should("exist")
  });

  it("renders the  <h3> element with the category name", () => {
    const mockData = [
      {
        id: 1,
        category_name: "Category Name",
      },
    ];

    cy.stub(store, "getState").returns({
      products: {
        status: "completed",
        categoryData: mockData,
      },
    });
    cy.get(".category-page-header h3").should("have.text", "Category Name");
  });
});
