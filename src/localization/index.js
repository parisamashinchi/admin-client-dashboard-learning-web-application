import Enlang from "./entries/en_US";
import Falang from "./entries/fa_IR";
import { addLocaleData } from "react-intl";
import { reduxGetter } from "utils/reduxGetter";
import _ from "lodash";
import * as settingConstants from "utils/globalRedux/setting/constants";

const AppLocale = {
  en: Enlang,
  fa: Falang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fa.data);

export default AppLocale;

export const formatMessage = id => {
  const locale = reduxGetter(state =>
    state.getIn([settingConstants.SETTING, "locale"])
  );
  const localeMessages = _.get(AppLocale, `${locale}.messages`, {});
  return localeMessages[id] ? localeMessages[id] : id;
};

export const formatNumber = number => {
  const locale = reduxGetter(state =>
    state.getIn([settingConstants.SETTING, "locale"])
  );
  const formatter = new Intl.NumberFormat(locale);
  return formatter.format(number);
};
