import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "cypress-real-events";
import ItemCard from "./ItemCard";

describe("<ItemCard />", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <ItemCard
          item={{
            id: 1,
            img_url: "/path/to/image.jpg",
            name: "Item 1",
            price: 10,
            quantity: 5,
          }}
        />
      </Router>
    );
  });

  it("renders", () => {
    cy.get(".item-card-div").should("exist");
    cy.get("img").should("have.attr", "alt", "Item 1");
    cy.get("p").contains("Item 1");
    cy.get(".item-price").contains("10");
    cy.get(".buy-now").contains("In-Stock: 5");
  });

  it("should trigger hover animations on mouseover", () => {
    cy.get(".item-card-div").realHover({ pointer: "mouse" });
    cy.get("p").should("have.css", "margin-left", "0px");
    cy.get(".item-price").should("have.css", "margin-left", "0px");
    cy.get(".buy-now").should("have.css", "opacity", "1");
  });
});
