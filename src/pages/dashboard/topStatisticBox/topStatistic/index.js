import React from "react";
import Style from "./style";
import IntlMessages from "utils/intlMessages";

const TopStatistic = ({ title, boldValue, secondValue }) => {
  return (
    <Style>
      <IntlMessages className="title" id={title} />
      <span className="bold-value">{boldValue}</span>
      <span className="second-value">{secondValue}</span>
    </Style>
  );
};
export default TopStatistic;
