import * as React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import FlickrComponent from "./components/FlickrComponent";
// import "./css/styles.css";

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <BrowserRouter>
      <div>
        <main>
          <Route exact={true} path="/" component={FlickrComponent} />
          <Redirect from="*" to="/" />
        </main>
      </div>
    </BrowserRouter>
  );
};