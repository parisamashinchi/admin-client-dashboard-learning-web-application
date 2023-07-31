import localStorage from "localStore";
import config from "src/config";
import AppLocale from "localization";

export function formatNumberLocale(number) {
  const formatter = new Intl.NumberFormat(AppLocale.fa.locale);
  return formatter.format(number);
}
