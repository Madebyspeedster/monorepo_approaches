import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { LoginForm } from "./components/LoginForm/LoginForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
