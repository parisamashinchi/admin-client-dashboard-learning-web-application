import createInterceptor from "superagent-intercept";
import { message } from "antd";
import { push } from "connected-react-router";
import { store } from "store";
import { asyncRemoveLocalStorageAction, flush } from "utils/middlewares/redux";
import { routes as publicRoutes } from "router";

export const successInterceptor = createInterceptor((error, response) => {
  if (response && response.status === 201) {
    if (response.req.url === 'https://api-beta.amoozal.com/api/v1/media/exam/student/answer') {
      message.success("فایل با موفقیت آپلود شد، دکمه بارگزاری را بزنید.");
    }else {
      message.success("با موفقیت انجام شد");
    }
  }
  if (response && response.status === 204) {
    message.success("با موفقیت انجام شد");
  }
});

export const errorInterceptor = createInterceptor((error, response) => {
  console.log(error,response, 'here')
  if (!!response && response.status === 400) {
    message.error(response.body.meta.error_message);
  }
  if (!!response && response.status === 401) {
    store.dispatch(asyncRemoveLocalStorageAction());
    store.dispatch(flush());
    store.dispatch(push(publicRoutes.ROUTE_AUTH_SIGN_IN));
  }
  if (!!response && response.status === 403) {
    // store.dispatch(asyncRemoveLocalStorageAction());
    // store.dispatch(flush());
    // store.dispatch(push('/signin'));
    message.error(response.body.meta.error_message);
  }
  if (!!response && response.status === 404) {
     message.error(response.body.meta.error_message);
    //store.dispatch(push("/fourZeroFour"));
  }
  if (!!response && response.status === 409) {
    store.dispatch(push(publicRoutes.ROUTE_404));
  }
  if (!!response && response.status === 500) {
    message.error("خطا در عملیات!");
  }
  if (!!response && response.status === 422) {
    message.error(response.body.meta.error_message);
  }
});
