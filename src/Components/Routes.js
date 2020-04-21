import { Route, Switch, Router } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import index from "../Routes/Search/index";
import Profile from "../Routes/Profile";


const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route exact path="/search" component={index} />
        <Route path="/:username" component={Profile} />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
    </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
);
AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;