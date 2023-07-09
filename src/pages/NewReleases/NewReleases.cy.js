import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import NewReleases from "./NewReleases";
import store from "../../slices/store";

describe("<NewReleases />", () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <Router>
          <NewReleases />
        </Router>
      </Provider>
    );
  });

  it("renders", () => {
    cy.get(".new-releases-div").should("exist");
    cy.contains("New Releases").should("exist");
  });
});
