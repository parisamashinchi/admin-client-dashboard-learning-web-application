import {createStore, applyMiddleware} from "redux";
import {combineReducers} from "redux-immutable";
import createHistory from "history/createBrowserHistory";
import {composeWithDevTools} from "redux-devtools-extension";
import {connectRouter} from "connected-react-router/immutable";
import {routerMiddleware} from "connected-react-router/immutable";
import {all} from "redux-saga/effects";
import {createLogger} from "redux-logger";
import {fromJS} from "immutable";
import {FLUSH} from "utils/middlewares/redux";
import {updateLocalStorage} from "utils/localStorage";
import season from "pages/season";
import album from "pages/album";
import department from "pages/department";
import discount from "pages/discount";
import exam from "pages/exam";
import Package from "pages/package";
import adminCourse from "pages/course";
import createSagaMiddleware from "redux-saga";
import localStorage from "localStore";
import config from "config";
import signIn from "pages/auth/signIn";
import forgotPassword from "pages/auth/forgotPassword";
import loading from "utils/globalRedux/loading/reducer";
import userReducers from "utils/globalRedux/user/reducers";
import panelReducers from "utils/globalRedux/panel/reducers";
import settingReducers from "utils/globalRedux/setting/reducers";
import courseReducers from "pages/user/course/reducers";
import userDashboardReducers from "pages/user/dashboard/reducers";
import userProfileReducers from "pages/user/profile/reducers";
import userCertificateReducers from "pages/user/certificate/reducers";
import table from "containers/table";
import upload from "containers/upload";
import selector from "containers/selector";
import form from "containers/form";
import adminSagas from "layouts/adminLayout/sagas";
import resetPassword from "pages/auth/resetPassword";
import profile from "pages/profile";
import dashboard from "pages/dashboard";
import signUp from "pages/user/signIn";
import course from "pages/user/course";
import userDashboard from "pages/user/dashboard";
import certificate from "pages/user/certificate";
import userProfile from "pages/user/profile";
import comment from "pages/comments";

const rootSage = function* () {
    yield all([
        ...signIn.sagas,
        ...forgotPassword.sagas,
        ...resetPassword.sagas,
        ...table.sagas,
        ...upload.sagas,
        ...selector.sagas,
        ...form.sagas,
        ...adminSagas,
        ...profile.sagas,
        ...dashboard.sagas,
        ...season.sagas,
        ...album.sagas,
        ...department.sagas,
        ...course.sagas,
        ...forgotPassword.sagas,
        ...resetPassword.sagas,
        ...table.sagas,
        ...upload.sagas,
        ...selector.sagas,
        ...form.sagas,
        ...adminSagas,
        ...profile.sagas,
        ...dashboard.sagas,
        ...signUp.sagas,
        ...course.sagas,
        ...userDashboard.sagas,
        ...certificate.sagas,
        ...userProfile.sagas,
        ...adminCourse.sagas,
        ...discount.sagas,
        ...exam.sagas,
        ...Package.sagas,
        ...comment.sagas,
    ]);
};
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const logger = createLogger(); // eslint-disable-line

const rootReducer = (state, action) => {
    if (action.type === FLUSH) {
        state = undefined;
    }
    return combineReducers({
        router: connectRouter(history),
        loading,
        ...panelReducers,
        ...userReducers,
        ...settingReducers,
        ...table.reducers,
        ...upload.reducers,
        ...selector.reducers,
        ...form.reducers,
        ...forgotPassword.reducers,
        ...dashboard.reducers,
        ...season.reducers,
        ...album.reducers,
        ...department.reducers,
        ...course.reducers,
        ...panelReducers,
        ...userReducers,
        ...settingReducers,
        ...courseReducers,
        ...userDashboardReducers,
        ...userProfileReducers,
        ...userCertificateReducers,
        ...table.reducers,
        ...upload.reducers,
        ...selector.reducers,
        ...form.reducers,
        ...forgotPassword.reducers,
        ...dashboard.reducers,
        ...signUp.reducers,
        ...adminCourse.reducers,
        ...discount.reducers,
        ...exam.reducers,
        ...Package.reducers,
        ...comment.reducers,
    })(state, action);
};

const store = createStore(
    rootReducer,
    fromJS(localStorage.get(config.localStorageName)),
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware,
            routeMiddleware,
            logger // eslint-disable-line
        )
    )
);

store.subscribe(updateLocalStorage);
sagaMiddleware.run(rootSage);
export {store, history};
