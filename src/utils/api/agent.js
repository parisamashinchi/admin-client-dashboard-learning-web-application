import * as superagent from "superagent";
import { reduxGetter } from "utils/reduxGetter";
import { errorInterceptor, successInterceptor } from "./interceptors";
import _ from "lodash";
import config from "config";

export const bareRequest = (bareCallback, parse = true) => {
  return (url, data = {}, query = {}, callback = null) => {
    const accessToken = reduxGetter(state => state.getIn(["USER", "data", "access_token"]));
    const locale = reduxGetter(state =>
      state.getIn(["LanguageSwitcher", "language", "locale"])
    );
    let agent = bareCallback(superagent, url, data, query)
      .set("Accept", 'application/json')
      .use(successInterceptor)
      .use(errorInterceptor);

    if (accessToken) {
        agent.set("Authorization", `Bearer ${accessToken}`);
    }

    if (callback !== null) {
      agent = callback(agent);
    }

    if (parse !== true) {
      return agent;
    }

    return agent.then(response => {
      if (
        response.statusCode === 200 ||
        response.statusCode === 201 ||
        response.statusCode === 204
      ) {
        return response.body;
      } else {
        throw response.text;
      }
    });
  };
};

export const apiRoot = config.apiUrl;
export const getRequest = bareRequest((request, url, query) =>
  request.get(apiRoot + url).query(query)
);
export const deleteRequest = bareRequest((request, url, data, query) =>
  request
    .delete(apiRoot + url)
    .query(query)
    .send(data)
);
export const putRequest = bareRequest((request, url, data) =>
  request.put(apiRoot + url).send(data)
);
export const postRequest = bareRequest((request, url, data, query) =>
  request
    .post(apiRoot + url)
    .query(query)
    .send(data)
);
export const multiPartPostRequest = bareRequest((request, url, data) => {
  const { files, fields } = data;
  let req = request.post(apiRoot + url);
  _.forEach(fields, (val, name) => {
    req.field(name, val);
  });

  _.forEach(files, (val, name) => {
    req.attach(name, val);
  });
  return req;
});
export const downloadRequest = bareRequest(
  (request, url, data) => request.get(apiRoot + url),
  false
);
