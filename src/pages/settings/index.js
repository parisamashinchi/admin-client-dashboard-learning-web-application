import React, { PureComponent } from "react";
import Style from "./style";
import PropTypes from "prop-types";
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import TextArea from "components/uiElements/textArea";
import Checkbox from "components/uiElements/checkBox";
import { createForm } from "containers/form/form";
import * as constants from "./constants";
import * as formConstants from "containers/form/constants";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import defaultTo from "lodash/defaultTo";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { toJS } from "hoc/toJsHoc";
import { Row, Col, Spin } from "antd";
import Tabs, { TabPane } from "components/uiElements/tabs";
import Button from "components/uiElements/button";
import { createUpload } from "containers/upload/upload";
import { createSelector } from "containers/selector/selector";
import basicStyle from "theme/style";
import IntlMessages from "utils/intlMessages";
import { routes as privateRoutes } from "router/private";
import Select, { Option } from "components/uiElements/select";
import withDirection from "utils/withDirection";
import Collapse, { Panel } from "components/uiElements/collapse";
import Repeater from "containers/form/repeater/repeater";
import config from "config";
import IconRemove from "components/icons/iconRemove";

const { rowStyleNoWidth } = basicStyle;

class Settings extends PureComponent {
  constructor(props, context) {
    super(props);
    this.socialMediaKeys = [];
    this.form = createForm({
      name: constants.SETTINGS,
      url: constants.API_URL,
      title: context.intl.formatMessage({
        id: "settings.title",
      }),
      id: "",
      redirectUrl: privateRoutes.ROUTE_SETTINGS,
    });
    this.settingsLogoUploader = createUpload(constants.SETTINGS_LOGO_UPLOADER);
    this.settingsImageUploader = createUpload(
      constants.SETTINGS_IMAGE_UPLOADER
    );
    this.userSelector = createSelector(
      "constactUsAssignId",
      constants.USER_API_URL,
      option => (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      )
    );
  }
  handleCancel = e => {
    e.preventDefault();
    const { goBackward } = this.props;
    goBackward();
  };
  mutateFields = values => {
    const withDefaultLanguageCode = Object.assign(values, {
      defaultLanguageCode: config.language,
    });
    //convert all values to map {key, value}
    const fieldsMap = Object.entries(withDefaultLanguageCode).map(
      ([key, value]) => ({
        key,
        value,
      })
    );
    //filter repeater values
    const repeaterFields = fieldsMap.filter(
      fieldMap =>
        fieldMap.key.startsWith("socialMedia_") &&
        !fieldMap.key.startsWith("socialMedia_keys")
    );
    //filter the rest of values
    let rest = {};
    fieldsMap
      .filter(fieldMap => !fieldMap.key.startsWith("socialMedia_"))
      .forEach(fieldMap => {
        rest[fieldMap.key] = fieldMap.value;
      });
    //group repeater values by their key
    const groupedRepeaterFields = groupBy(repeaterFields, repeaterField => {
      const splitedKey = repeaterField.key.split("_");
      return splitedKey[splitedKey.length - 1];
    });
    //remove redundant values (which their key is not in this.socialMediaKeys)
    Object.keys(groupedRepeaterFields).forEach(key => {
      if (this.socialMediaKeys.find(k => k === Number(key)) === undefined) {
        delete groupedRepeaterFields[key];
      }
    });
    return {
      ...rest,
      socialMedia: JSON.stringify(
        defaultTo(
          Object.values(groupedRepeaterFields).map(groupedField => {
            let fields = {};
            groupedField.forEach(field => {
              fields[field.key.split("_")[1]] = field.value;
            });
            return fields;
          }),
          []
        )
      ),
    };
  };
  render() {
    const { loading, dataLoading } = this.props;
    const edit = this.id !== undefined;
    const Form = this.form;
    const SettingsLogoUploader = this.settingsLogoUploader;
    const SettingsImageUploader = this.settingsImageUploader;
    const UserSelector = this.userSelector;
    return (
      <Style>
        <Spin spinning={dataLoading}>
          <Form mutateFields={this.mutateFields}>
            {(fieldDecorator, handleSubmit, data, form) => {
              return (
                <Row>
                  <Col span={24}>
                    <Tabs>
                      <TabPane
                        forceRender
                        tab={this.context.intl.formatMessage({
                          id: "settings.tab1",
                        })}
                        key="1"
                      >
                        <Row style={rowStyleNoWidth}>
                          <Col className="form-col" span={24} md={{ span: 12 }}>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.titlePlaceholder",
                              })}
                            >
                              {fieldDecorator("title", {
                                initialValue: get(data, "title", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="text"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.titlePlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.descriptionPlaceholder",
                              })}
                            >
                              {fieldDecorator("description", {
                                initialValue: get(data, "description", ""),
                              })(
                                <TextArea
                                  disabled={loading}
                                  type="text"
                                  rows={4}
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.descriptionPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.shopTypeIdPlaceholder",
                              })}
                            >
                              {fieldDecorator("shopTypeId", {
                                initialValue: get(
                                  data,
                                  "shopTypeId",
                                  undefined
                                ),
                                rules: [
                                  {
                                    required: true,
                                    message: this.context.intl.formatMessage({
                                      id:
                                        "settings.form.error.shopTypeIdRequired",
                                    }),
                                  },
                                ],
                              })(
                                <Select
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.shopTypeIdPlaceholder",
                                  })}
                                >
                                  <Option value={1}>
                                    <IntlMessages id="settings.form.firstShopTypeId" />
                                  </Option>
                                  <Option value={2}>
                                    <IntlMessages id="settings.form.secondShopTypeId" />
                                  </Option>
                                  <Option value={3}>
                                    <IntlMessages id="settings.form.thirdShopTypeId" />
                                  </Option>
                                </Select>
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.emailPlaceholder",
                              })}
                            >
                              {fieldDecorator("email", {
                                initialValue: get(data, "email", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="email"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.emailPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.addressPlaceholder",
                              })}
                            >
                              {fieldDecorator("address", {
                                initialValue: get(data, "address", ""),
                              })(
                                <TextArea
                                  disabled={loading}
                                  type="text"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.addressPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.phoneNumberPlaceholder",
                              })}
                            >
                              {fieldDecorator("phoneNumber", {
                                initialValue: get(data, "phoneNumber", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="tel"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.phoneNumberPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id:
                                  "settings.form.deliveryShipmentDelayPlaceholder",
                              })}
                            >
                              {fieldDecorator("deliveryShipmentDelay", {
                                initialValue: get(
                                  data,
                                  "deliveryShipmentDelay",
                                  2
                                ),
                                rules: [
                                  {
                                    required: true,
                                    message: this.context.intl.formatMessage({
                                      id:
                                        "settings.form.error.deliveryShipmentDelayRequired",
                                    }),
                                  },
                                ],
                              })(
                                <Input
                                  disabled={loading}
                                  type="number"
                                  placeholder={this.context.intl.formatMessage({
                                    id:
                                      "settings.form.deliveryShipmentDelayPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.merchantIdPlaceholder",
                              })}
                            >
                              {fieldDecorator("merchantId", {
                                initialValue: get(data, "merchantId", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="text"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.merchantIdPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.copyRightPlaceholder",
                              })}
                            >
                              {fieldDecorator("copyRight", {
                                initialValue: get(data, "copyRight", ""),
                              })(
                                <TextArea
                                  disabled={loading}
                                  type="text"
                                  rows={4}
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.copyRightPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.logoPlaceholder",
                              })}
                            >
                              {fieldDecorator("logo", {
                                initialValue: get(data, "logo", undefined),
                              })(<SettingsLogoUploader />)}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.imagePlaceholder",
                              })}
                            >
                              {fieldDecorator("image", {
                                initialValue: get(data, "image", undefined),
                              })(<SettingsImageUploader />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane
                        forceRender
                        tab={this.context.intl.formatMessage({
                          id: "settings.tab2",
                        })}
                        key="2"
                      >
                        <Row style={rowStyleNoWidth}>
                          <Col className="form-col" span={24} md={{ span: 12 }}>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.googleAnalyticPlaceholder",
                              })}
                            >
                              {fieldDecorator("googleAnalytic", {
                                initialValue: get(data, "googleAnalytic", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="text"
                                  placeholder={this.context.intl.formatMessage({
                                    id:
                                      "settings.form.googleAnalyticPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.googleMasterPlaceholder",
                              })}
                            >
                              {fieldDecorator("googleMaster", {
                                initialValue: get(data, "googleMaster", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="text"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.googleMasterPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.googleMapTokenPlaceholder",
                              })}
                            >
                              {fieldDecorator("googleMapToken", {
                                initialValue: get(data, "googleMapToken", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="text"
                                  placeholder={this.context.intl.formatMessage({
                                    id:
                                      "settings.form.googleMapTokenPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane
                        forceRender
                        tab={this.context.intl.formatMessage({
                          id: "settings.tab3",
                        })}
                        key="3"
                      >
                        <Row style={rowStyleNoWidth}>
                          <Col className="form-col" span={24} md={{ span: 12 }}>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.limitRequestPlaceholder",
                              })}
                            >
                              {fieldDecorator("limitRequest", {
                                initialValue: get(data, "limitRequest", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="number"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.limitRequestPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id: "settings.form.maxSlideShowPlaceholder",
                              })}
                            >
                              {fieldDecorator("maxSlideShow", {
                                initialValue: get(data, "maxSlideShow", ""),
                              })(
                                <Input
                                  disabled={loading}
                                  type="number"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "settings.form.maxSlideShowPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                            <FormItem>
                              {fieldDecorator("maintenanceMode", {
                                initialValue: get(
                                  data,
                                  "maintenanceMode",
                                  false
                                ),
                              })(
                                <Checkbox
                                  defaultChecked={get(
                                    data,
                                    "maintenanceMode",
                                    false
                                  )}
                                >
                                  <IntlMessages id="settings.form.maintenanceModePlaceholder" />
                                </Checkbox>
                              )}
                            </FormItem>
                            <Collapse
                              className="social-media-container"
                              defaultActiveKey={["1"]}
                              accordion
                            >
                              <Panel
                                className="form-item-container"
                                header={this.context.intl.formatMessage({
                                  id: "settings.form.socialMedia",
                                })}
                                key="1"
                              >
                                <Repeater
                                  form={form}
                                  initialValue={JSON.parse(
                                    defaultTo(
                                      get(data, "socialMedia", "[]"),
                                      "[]"
                                    )
                                  )}
                                  onKeysChange={keys =>
                                    (this.socialMediaKeys = keys)
                                  }
                                >
                                  {(key, socialMedia, remove) => {
                                    return (
                                      <Row style={rowStyleNoWidth} gutter={30}>
                                        <Col span={10}>
                                          <FormItem
                                            label={this.context.intl.formatMessage(
                                              {
                                                id:
                                                  "settings.form.socialMedia.titlePlaceholder",
                                              }
                                            )}
                                          >
                                            {fieldDecorator(
                                              `socialMedia_title_${key}`,
                                              {
                                                initialValue: get(
                                                  socialMedia,
                                                  "title",
                                                  ""
                                                ),
                                                rules: [
                                                  {
                                                    required: true,
                                                    message: this.context.intl.formatMessage(
                                                      {
                                                        id:
                                                          "settings.form.socialMedia.error.titleRequired",
                                                      }
                                                    ),
                                                  },
                                                ],
                                              }
                                            )(
                                              <Input
                                                type="text"
                                                placeholder={this.context.intl.formatMessage(
                                                  {
                                                    id:
                                                      "settings.form.socialMedia.titlePlaceholder",
                                                  }
                                                )}
                                              />
                                            )}
                                          </FormItem>
                                        </Col>
                                        <Col span={10}>
                                          <FormItem
                                            label={this.context.intl.formatMessage(
                                              {
                                                id:
                                                  "settings.form.socialMedia.urlPlaceholder",
                                              }
                                            )}
                                          >
                                            {fieldDecorator(
                                              `socialMedia_url_${key}`,
                                              {
                                                initialValue: get(
                                                  socialMedia,
                                                  "url",
                                                  ""
                                                ),
                                                rules: [
                                                  {
                                                    required: true,
                                                    message: this.context.intl.formatMessage(
                                                      {
                                                        id:
                                                          "settings.form.socialMedia.error.urlRequired",
                                                      }
                                                    ),
                                                  },
                                                ],
                                              }
                                            )(
                                              <Input
                                                type="url"
                                                placeholder={this.context.intl.formatMessage(
                                                  {
                                                    id:
                                                      "settings.form.socialMedia.urlPlaceholder",
                                                  }
                                                )}
                                              />
                                            )}
                                          </FormItem>
                                        </Col>
                                        <Col span={3}>
                                          <Button
                                            className="btn-remove-variant"
                                            type="danger"
                                            onClick={e => (
                                              e.preventDefault(), remove(key)
                                            )}
                                          >
                                            <IconRemove />
                                          </Button>
                                        </Col>
                                      </Row>
                                    );
                                  }}
                                </Repeater>
                              </Panel>
                            </Collapse>
                            <FormItem
                              label={this.context.intl.formatMessage({
                                id:
                                  "settings.form.contactUsAssignIdPlaceholder",
                              })}
                            >
                              {fieldDecorator("contactUsAssignId", {
                                initialValue: defaultTo(
                                  get(data, "contactUsAssignId", undefined),
                                  undefined
                                ),
                              })(
                                <UserSelector
                                  showSearch
                                  placeholder={this.context.intl.formatMessage({
                                    id:
                                      "settings.form.contactUsAssignIdPlaceholder",
                                  })}
                                />
                              )}
                            </FormItem>
                          </Col>
                        </Row>
                      </TabPane>
                    </Tabs>
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
                          ? "settings.form.submitEdit"
                          : "settings.form.submit",
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
Settings.contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  return {
    goBackward: () => dispatch(goBack()),
  };
};
const mapStateToProps = state => ({
  dataLoading: state.getIn(
    [formConstants.FORM, `${constants.SETTINGS}_data_loading`],
    false
  ),
  loading: state.getIn(
    [formConstants.FORM, `${constants.SETTINGS}_loading`],
    false
  ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(withDirection(Settings)));
