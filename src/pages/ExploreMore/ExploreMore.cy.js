import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ExploreMore from './ExploreMore';
import store from "../../slices/store";

describe('<ExploreMore />', () => {
    beforeEach(() => {
        cy.mount(
            <Provider store={store}>
            <Router>
                <ExploreMore />
            </Router>
            </Provider>
        )
    })

    it("renders", () => {
        cy.get('.explore-more-div').should('exist')
    })
})