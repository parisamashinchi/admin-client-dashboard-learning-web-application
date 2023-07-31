import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

const InjectMassage = props => (
  <FormattedMessage children={msg => msg} {...props} />
);
export default injectIntl(InjectMassage, {
  withRef: false,
});
