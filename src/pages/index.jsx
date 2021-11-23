import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home";
import BlindBox from "./blind-box";

import Dashboard from "./dashboard";

import LBP from "./lbp";
import AboutUs from "./about-us";

function PageNotFont() {
  return <div>404</div>;
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/blindBox" exact>
          <BlindBox />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/lbp" exact>
          <LBP />
        </Route>
        <Route path="/aboutUs" exact>
          <AboutUs />
        </Route>
        <Route path="*">
          <PageNotFont />
        </Route>
      </Switch>
    </Router>
  );
}
