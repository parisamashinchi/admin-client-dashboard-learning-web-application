import React, { PureComponent } from "react";
import Style from "./style";
import PropTypes from "prop-types";
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import TextArea from "components/uiElements/textArea";
import Checkbox from "components/uiElements/checkBox";
import Editor from "containers/editor";
import TagGroup from "components/uiElements/tagGroup";
import { createSelector, Option } from "containers/selector/selector";
import { createForm } from "containers/form/form";
import * as blogConstants from "../constants";
import * as constants from "./constants";
import * as formConstants from "containers/form/constants";
import get from "lodash/get";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { toJS } from "hoc/toJsHoc";
import { Row, Col, Spin } from "antd";
import Button from "components/uiElements/button";
import { createUpload } from "containers/upload/upload";
import basicStyle from "theme/style";
import Collapse, { Panel } from "components/uiElements/collapse";
import IntlMessages from "utils/intlMessages";
import { routes as privateRoutes } from "router/private";
import { convertToSlug } from "utils/getters/convertToSlug";
import { bindActionCreators } from "redux";

const { rowStyleNoWidth } = basicStyle;

class AddBlog extends PureComponent {
  constructor(props, context) {
    super(props);
    this.id = get(this.props.match, "params.id", undefined);
    this.addForm = createForm({
      name: constants.ADD_BLOG,
      url: blogConstants.API_URL,
      title: context.intl.formatMessage({
        id: this.id ? "blog.addBlog.editTitle" : "blog.addBlog.title",
      }),
      id: this.id,
      redirectUrl: privateRoutes.ROUTE_BLOG_LIST,
    });
    this.blogCategorySelector = createSelector(
      "blogCategoryId",
      constants.BLOG_CATEGORY_API_URL,
      option => (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      )
    );
    this.blogImageUploader = createUpload(constants.ADD_BLOG);
  }
  handleSlugUpdate = (e, form) => {
    form.setFieldsValue({
      slug: convertToSlug(e.target.value),
    });
  };
  handleCancel = e => {
    e.preventDefault();
    const { goBack } = this.props;
    goBack();
  };
  render() {
    const { loading, dataLoading } = this.props;
    const edit = this.id !== undefined;
    const Form = this.addForm;
    const BlogCategorySelector = this.blogCategorySelector;
    const BlogImageUploader = this.blogImageUploader;
    return (
      <Style>
        <Spin spinning={dataLoading}>
          <Form>
            {(fieldDecorator, handleSubmit, data, form) => {
              return (
                <Row style={rowStyleNoWidth} gutter={40}>
                  <Col
                    className="form-col"
                    span={24}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                  >
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlog.form.titlePlaceholder",
                      })}
                    >
                      {fieldDecorator("title", {
                        initialValue: get(data, "title", ""),
                        rules: [
                          {
                            required: true,
                            type: "string",
                            message: this.context.intl.formatMessage({
                              id: "blog.addBlog.form.error.titleRequired",
                            }),
                          },
                        ],
                      })(
                        <Input
                          disabled={loading}
                          onChange={e => this.handleSlugUpdate(e, form)}
                          placeholder={this.context.intl.formatMessage({
                            id: "blog.addBlog.form.titlePlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlog.form.blogCategoryIdPlaceholder",
                      })}
                    >
                      {fieldDecorator("blogCategoryId", {
                        initialValue: get(data, "blogCategory.id", undefined),
                        rules: [
                          {
                            required: true,
                            message: this.context.intl.formatMessage({
                              id:
                                "blog.addBlog.form.error.blogCategoryIdRequired",
                            }),
                          },
                        ],
                      })(
                        <BlogCategorySelector
                          disabled={loading}
                          placeholder={this.context.intl.formatMessage({
                            id: "blog.addBlog.form.blogCategoryIdPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlog.form.shortDescriptionPlaceholder",
                      })}
                    >
                      {fieldDecorator("shortDescription", {
                        initialValue: get(data, "shortDescription", ""),
                      })(
                        <TextArea
                          disabled={loading}
                          placeholder={this.context.intl.formatMessage({
                            id: "blog.addBlog.form.shortDescriptionPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlog.form.slugPlaceholder",
                      })}
                    >
                      {fieldDecorator("slug", {
                        initialValue: get(data, "slug", ""),
                      })(
                        <Input
                          disabled={loading}
                          placeholder={this.context.intl.formatMessage({
                            id: "blog.addBlog.form.slugPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    {/* <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlog.form.tagPlaceholder",
                      })}
                    >
                      {fieldDecorator("tag", {
                        initialValue: get(data, "tag", undefined),
                      })(<TagGroup />)}
                    </FormItem> */}
                    <FormItem>
                      {fieldDecorator("isPublish", {
                        initialValue: get(data, "isPublish", true),
                      })(
                        <Checkbox defaultChecked={get(data, "isPublish", true)}>
                          <IntlMessages id="blog.addBlog.form.isPublishPlaceholder" />
                        </Checkbox>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24} lg={{ span: 16 }}>
                    <Collapse className="seo-settings-container" accordion>
                      <Panel
                        className="form-item-container"
                        header={this.context.intl.formatMessage({
                          id: "blog.addBlog.form.seoSettings",
                        })}
                        key="1"
                      >
                        <FormItem
                          label={this.context.intl.formatMessage({
                            id: "blog.addBlog.form.metaKeyWordPlaceholder",
                          })}
                        >
                          {fieldDecorator("metaKeyWord", {
                            initialValue: get(data, "metaKeyWord", ""),
                          })(
                            <TextArea
                              disabled={loading}
                              placeholder={this.context.intl.formatMessage({
                                id: "blog.addBlog.form.metaKeyWordPlaceholder",
                              })}
                            />
                          )}
                        </FormItem>
                      </Panel>
                    </Collapse>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlog.form.contentPlaceholder",
                      })}
                    >
                      {fieldDecorator("content", {
                        initialValue: get(data, "content", undefined),
                        rules: [
                          {
                            required: true,
                            message: this.context.intl.formatMessage({
                              id: "blog.addBlog.form.error.contentRequired",
                            }),
                          },
                        ],
                      })(<Editor disabled={loading} />)}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlog.form.imagePlaceholder",
                      })}
                    >
                      {fieldDecorator("image", {
                        initialValue: get(data, "image", undefined),
                      })(<BlogImageUploader />)}
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
                          ? "blog.addBlog.form.submitEdit"
                          : "blog.addBlog.form.submit",
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
AddBlog.contextTypes = {
  intl: PropTypes.object.isRequired,
};
AddBlog.propTypes = {
  id: PropTypes.number,
};
AddBlog.defaultProps = {
  id: -1,
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ goBack }, dispatch);
};
const mapStateToProps = state => ({
  dataLoading: state.getIn(
    [formConstants.FORM, `${constants.ADD_BLOG}_data_loading`],
    false
  ),
  loading: state.getIn(
    [formConstants.FORM, `${constants.ADD_BLOG}_loading`],
    false
  ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(AddBlog));
