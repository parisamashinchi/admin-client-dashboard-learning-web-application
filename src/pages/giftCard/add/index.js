import React, { PureComponent } from "react";
import Style from "./style";
import PropTypes from "prop-types";
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import PriceInput from "components/uiElements/priceInput";
import Checkbox from "components/uiElements/checkBox";
import { createForm } from "containers/form/form";
import * as giftCardConstants from "../constants";
import * as constants from "./constants";
import * as formConstants from "containers/form/constants";
import get from "lodash/get";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { toJS } from "hoc/toJsHoc";
import { Row, Col, Spin } from "antd";
import Button from "components/uiElements/button";
import basicStyle from "theme/style";
import IntlMessages from "utils/intlMessages";
import { routes as privateRoutes } from "router/private";
import DatePicker from "components/uiElements/datePicker";

const { rowStyleNoWidth } = basicStyle;

class AddGiftCard extends PureComponent {
  constructor(props, context) {
    super(props);
    this.id = get(this.props.match, "params.id", undefined);
    this.addForm = createForm({
      name: constants.ADD_GIFT_CARD,
      url: giftCardConstants.API_URL,
      title: context.intl.formatMessage({
        id: this.id ? "giftCard.add.editTitle" : "giftCard.add.title",
      }),
      id: this.id,
      redirectUrl: privateRoutes.ROUTE_GIFT_CARD_LIST,
    });
  }
  handleCancel = e => {
    e.preventDefault();
    const { goBackward } = this.props;
    goBackward();
  };
  render() {
    const { loading, dataLoading } = this.props;
    const edit = this.id !== undefined;
    const Form = this.addForm;
    return (
      <Style>
        <Spin spinning={dataLoading}>
          <Form>
            {(fieldDecorator, handleSubmit, data) => {
              return (
                <Row style={rowStyleNoWidth}>
                  <Col className="form-col" span={24} md={{ span: 12 }}>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "giftCard.add.form.codePlaceholder",
                      })}
                    >
                      {fieldDecorator("code", {
                        initialValue: get(data, "code", ""),
                        rules: [
                          {
                            required: true,
                            message: this.context.intl.formatMessage({
                              id: "giftCard.add.form.error.codeRequired",
                            }),
                          },
                        ],
                      })(
                        <Input
                          disabled={loading}
                          type="text"
                          placeholder={this.context.intl.formatMessage({
                            id: "giftCard.add.form.codePlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "giftCard.add.form.countPlaceholder",
                      })}
                    >
                      {fieldDecorator("count", {
                        initialValue: get(data, "count", 1),
                        rules: [
                          {
                            required: true,
                            message: this.context.intl.formatMessage({
                              id: "giftCard.add.form.error.countRequired",
                            }),
                          },
                        ],
                      })(
                        <Input
                          disabled={loading}
                          type="number"
                          min="1"
                          placeholder={this.context.intl.formatMessage({
                            id: "giftCard.add.form.countPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "giftCard.add.form.amountPlaceholder",
                      })}
                    >
                      {fieldDecorator("amount", {
                        initialValue: get(data, "amount", 0),
                        rules: [
                          {
                            required: true,
                            message: this.context.intl.formatMessage({
                              id: "giftCard.add.form.error.amountRequired",
                            }),
                          },
                        ],
                      })(
                        <PriceInput
                          placeholder={this.context.intl.formatMessage({
                            id: "giftCard.add.form.amountPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "giftCard.add.form.startDatePlaceholder",
                      })}
                    >
                      {fieldDecorator("startDate", {
                        initialValue: get(
                          data,
                          "startDate",
                          new Date(new Date().setHours(0, 0, 0, 0))
                        ),
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      })(<DatePicker disabled={loading} />)}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "giftCard.add.form.endDatePlaceholder",
                      })}
                    >
                      {fieldDecorator("endDate", {
                        initialValue: get(
                          data,
                          "startDate",
                          new Date(new Date().setHours(0, 0, 0, 0))
                        ),
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      })(<DatePicker disabled={loading} />)}
                    </FormItem>
                    <FormItem>
                      {fieldDecorator("isActive", {
                        initialValue: get(data, "isActive", true),
                      })(
                        <Checkbox defaultChecked={get(data, "isActive", true)}>
                          <IntlMessages id="giftCard.add.form.isActivePlaceholder" />
                        </Checkbox>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24} style={{ display: "flex", marginTop: "30px" }}>
                    <Button
                      className="btn btn-primary shadow-2"
                      type="primary"
                      onClick={handleSubmit}
                      loading={loading}
                    >
                      {this.context.intl.formatMessage({
                        id: edit
                          ? "giftCard.add.form.submitEdit"
                          : "giftCard.add.form.submit",
                      })}
                    </Button>
                    {edit ? (
                      <Button
                        className="btn shadow-2"
                        onClick={this.handleCancel}
                        disabled={loading}
                      >
                        {this.context.intl.formatMessage({
                          id: "form.cancel",
                        })}
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              );
            }}
          </Form>
        </Spin>
      </Style>
    );
  }
}
AddGiftCard.contextTypes = {
  intl: PropTypes.object.isRequired,
};
AddGiftCard.propTypes = {
  id: PropTypes.number,
};
AddGiftCard.defaultProps = {
  id: -1,
};
const mapDispatchToProps = dispatch => {
  return {
    goBackward: () => dispatch(goBack()),
  };
};
const mapStateToProps = state => ({
  dataLoading: state.getIn(
    [formConstants.FORM, `${constants.ADD_GIFT_CARD}_data_loading`],
    false
  ),
  loading: state.getIn(
    [formConstants.FORM, `${constants.ADD_GIFT_CARD}_loading`],
    false
  ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(AddGiftCard));
