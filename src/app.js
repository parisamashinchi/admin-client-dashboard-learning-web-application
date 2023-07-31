import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import config from "./config";
import { IntlProvider } from "react-intl";
import AppLocale from "localization";
import GlobalStyle from "theme/injectGlobal";
import { store, history } from "store";
import PublicRoutes from "src/router";
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000'
}

TagManager.initialize(tagManagerArgs)

const appLang = store.getState().getIn(["PANEL", "appLang"], config.language);
const currentAppLocale = AppLocale[appLang];

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <GlobalStyle />
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                    <Provider store={store}>
                        <PublicRoutes history={history} />
                    </Provider>
                </IntlProvider>
            </Fragment>
        );
    }
}
