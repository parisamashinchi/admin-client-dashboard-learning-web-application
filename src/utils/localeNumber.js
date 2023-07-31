import React from "react";
import { formatNumber } from "localization";

const LocaleNumber = ({ comma, currency, children }) => {
  const number = comma
    ? children.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : children;
  return (
    <span>
      {formatNumber(number)} {currency ? "ریال" : ""}
    </span>
  );
};
export default LocaleNumber;
