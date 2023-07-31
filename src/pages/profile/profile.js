import React, { PureComponent } from "react";
import Style from "./profile.style";
import PropTypes from "prop-types";
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import * as constants from "./constants";
import * as userConstants from "utils/globalRedux/user/constants";
import * as actions from "./actions";
import * as uploadConstants from "containers/upload/constants";
import get from "lodash/get";
import omit from "lodash/omit";
import { connect } from "react-redux";
import { toJS } from "hoc/toJsHoc";
import { Card } from "react-bootstrap";
import { Row, Col, Form, message } from "antd";
import Button from "components/uiElements/button";
import { createUpload } from "containers/upload/upload";
import basicStyle from "theme/style";
import IntlMessages from "utils/intlMessages";
import { animations } from "react-animation";

const { rowStyleNoWidth } = basicStyle;

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.avatarUploader = createUpload(constants.PROFILE);
  }
  handleSubmit = e => {
    const { editProfileRequest } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      values = omit(values, ["email"]);
      if (!err) {
        editProfileRequest(values);
      } else {
        console.error(err);
      }
    });
  };
  render() {
    const {
      data,
      uploading,
      loading,
      form: { getFieldDecorator }
    } = this.props;
    const AvatarUploader = this.avatarUploader;
    return (
      <Card style={{ animation: animations.fadeIn }}>
        <Card.Header>
          <Card.Title as="h5">
            <IntlMessages id="profile.title" />
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col span={24}>
              <Form>
                <Style>
                  <Row style={rowStyleNoWidth}>
                    <Col className="form-col" span={24} md={{ span: 12 }}>
                      <FormItem
                        label={this.context.intl.formatMessage({
                          id: "profile.form.avatarPlaceholder"
                        })}
                      >
                        {getFieldDecorator("avatar", {
                          initialValue: get(data, "avatar", undefined)
                        })(<AvatarUploader className="profile-picture" />)}
                      </FormItem>
                      <FormItem
                        label={this.context.intl.formatMessage({
                          id: "profile.form.namePlaceholder"
                        })}
                      >
                        {getFieldDecorator("name", {
                          initialValue: get(data, "name", "")
                        })(
                          <Input
                            disabled={loading}
                            type="text"
                            placeholder={this.context.intl.formatMessage({
                              id: "profile.form.namePlaceholder"
                            })}
                          />
                        )}
                      </FormItem>
                      <FormItem
                        label={this.context.intl.formatMessage({
                          id: "profile.form.familyPlaceholder"
                        })}
                      >
                        {getFieldDecorator("family", {
                          initialValue: get(data, "family", "")
                        })(
                          <Input
                            disabled={loading}
                            type="text"
                            placeholder={this.context.intl.formatMessage({
                              id: "profile.form.familyPlaceholder"
                            })}
                          />
                        )}
                      </FormItem>
                      <FormItem
                        label={this.context.intl.formatMessage({
                          id: "profile.form.phoneNumberPlaceholder"
                        })}
                      >
                        {getFieldDecorator("phoneNumber", {
                          initialValue: get(data, "phoneNumber", "")
                        })(
                          <Input
                            disabled={loading}
                            type="tel"
                            placeholder={this.context.intl.formatMessage({
                              id: "profile.form.phoneNumberPlaceholder"
                            })}
                          />
                        )}
                      </FormItem>
                      <FormItem
                        label={this.context.intl.formatMessage({
                          id: "profile.form.emailPlaceholder"
                        })}
                      >
                        {getFieldDecorator("email", {
                          initialValue: get(data, "email", "")
                        })(
                          <Input
                            disabled={true}
                            type="email"
                            placeholder={this.context.intl.formatMessage({
                              id: "profile.form.emailPlaceholder"
                            })}
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col
                      span={24}
                      style={{ display: "flex", marginTop: "30px" }}
                    >
                      <Button
                        className="btn btn-primary shadow-2"
                        type="primary"
                        onClick={e =>
                          uploading
                            ? message.warning(
                                this.context.intl.formatMessage({
                                  id: "upload.wait"
                                })
                              )
                            : this.handleSubmit(e)
                        }
                        loading={loading}
                      >
                        <IntlMessages id="profile.form.submit" />
                      </Button>
                    </Col>
                  </Row>
                </Style>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
Profile.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  editProfileRequest: actions.setEditProfileRequest
};
const mapStateToProps = state => ({
  data: state.getIn([userConstants.USER], {}),
  loading: state.getIn(["loading", constants.PROFILE, "status"], false),
  uploading: state.getIn(
    [uploadConstants.UPLOAD, `${constants.PROFILE}_loading`],
    false
  )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Form.create(`FORM_${constants.PROFILE}`)(Profile)));
