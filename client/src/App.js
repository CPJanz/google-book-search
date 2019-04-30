// This is the main react component
// Importing react so that we can use jsx
import React from "react";
// Importing from the react-router-dom library so taht we can use the router in react
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// The next 4 imports are components which are being used as children to app.js
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// This is a functional component and is stateless
function App() {
  return (
    //TODO: get a good definintion for the router
    <Router>
      <div>
        {/* This component is a navbar and will be at the top of both of our pages */}
        <Nav />
        {/* TODO: What's up with this switch component? it looks to be built in */}
        <Switch>
          {/* These routes serve up the pages. We the exact keyword so that we don't accidentally match multiple routes. The component parameter passed is the page to be served.*/}
          <Route exact path="/" component={Home} />
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
