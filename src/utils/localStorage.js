import localStorage from "localStore";
import whiteListObject from "whitelist-object";
import { fromJS } from "immutable";
import { store } from "src/store";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import config from "config";
import * as userConstants from "utils/globalRedux/user/constants";
import * as panelConstants from "utils/globalRedux/panel/constants";

const whiteList = [panelConstants.PANEL, userConstants.USER];

let previousState = fromJS(localStorage.get(config.localStorageName, {}));
export const updateLocalStorage = () => {
  const currentState = store.getState();
  let dirtyList = [];
  for (const stateName of whiteList) {
    const prev = previousState.get(stateName);
    const cur = currentState.get(stateName);

    if (!prev && !!cur) {
      dirtyList.push(stateName);
      break;
    }

    if (!isEqual(prev, cur)) {
      dirtyList.push(stateName);
      break;
    }
  }

  if (!isEmpty(dirtyList)) {
    localStorage.set(
      config.localStorageName,
      whiteListObject(currentState.toJS(), whiteList, true)
    );
  }

  previousState = currentState;
};
