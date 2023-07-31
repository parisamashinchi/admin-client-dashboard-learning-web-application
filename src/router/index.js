import React from "react";
import {Route, Redirect, Switch} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router/immutable";
import {connect} from "react-redux";
import asyncComponent from "utils/helpers/AsyncComponent";
import * as constants from "utils/globalRedux/user/constants";
import * as routes from "./constants";
import * as panelConstants from "utils/globalRedux/panel/constants";

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            <Component {...props} />
        }
    />
);
const PublicRoutes = ({history, isLoggedIn, rtlLayout}) => {
    if (rtlLayout) {
        document.body.classList.add("datta-rtl");
    } else {
        document.body.classList.remove("datta-rtl");
    }
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route
                    exact
                    path={routes.ROUTE_AUTH_SIGN_IN}
                    component={asyncComponent(() => import("pages/user/signIn/auth"))}
                />
                <Route
                    exact
                    path={routes.ROUTE_AUTH_FORGOT_PASSWORD}
                    component={asyncComponent(() =>
                        import("pages/auth/forgotPassword/forgotPassword")
                    )}
                />
                <Route
                    exact
                    path={routes.ROUTE_AUTH_RESET_PASSWORD}
                    component={asyncComponent(() =>
                        import("pages/auth/resetPassword/resetPassword")
                    )}
                />
                <RestrictedRoute
                    path={routes.ROUTE_HOME}
                    isLoggedIn={isLoggedIn}
                    component={asyncComponent(() => import("layouts/adminLayout"))}
                />

                <Route
                    path={routes.ROUTE_NON}
                    component={asyncComponent(() => import("pages/error/404"))}
                />

            </Switch>
        </ConnectedRouter>
    );
};

export default connect(
    state => ({
        isLoggedIn: state.getIn([constants.USER, "data", "access_token"], null) !== null,
        rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"], false),
    }),
    null
)(PublicRoutes);

export {routes};
