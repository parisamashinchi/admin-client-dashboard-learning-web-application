import React, { Component } from "react";

export function toPersianNumber(number, options = {}) {
  const { comma = false, moneySign = false, language = "fa" } = options;

  if (number !== null) {
    let en_number = number.toString();
    let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    if (comma === true) {
      en_number = en_number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let persianMap = persianDigits.split("");
    let persian_number = en_number.replace(/\d/g, function(m) {
      return persianMap[parseInt(m)];
    });
    return language === "fa"
      ? `${persian_number} ${moneySign ? "ریال" : ""}`
      : `${en_number} ${moneySign ? "Rial" : ""}`;
  } else {
    return "";
  }
}

class PersianNumber extends Component {
  render() {
    const {
      comma = false,
      moneySign = false,
      language = "fa",
      children = "",
      style,
    } = this.props;
    if (children !== null) {
      let en_number = children.toString();
      let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      if (comma === true) {
        en_number = en_number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      let persianMap = persianDigits.split("");
      let persian_number = en_number.replace(/\d/g, function(m) {
        return persianMap[parseInt(m)];
      });
      return language === "fa" ? (
        <span style={style}>
          {persian_number} {moneySign ? "ریال" : null}{" "}
        </span>
      ) : (
        <span>
          {en_number} {moneySign ? "Rial" : null}
        </span>
      );
    } else {
      return "";
    }
  }
}
export default PersianNumber;
