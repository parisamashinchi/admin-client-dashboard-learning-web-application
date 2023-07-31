import React, { PureComponent } from "react";
import Style from "./style";
import PropTypes from "prop-types";
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Checkbox from "components/uiElements/checkBox";
import { createSelector, Option } from "containers/selector/selector";
import { createForm } from "containers/form/form";
import * as blogCategoryConstants from "../constants";
import * as constants from "./constants";
import * as formConstants from "containers/form/constants";
import * as uploadConstants from "containers/upload/constants";
import get from "lodash/get";
import omit from "lodash/omit";
import defaultTo from "lodash/defaultTo";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { toJS } from "hoc/toJsHoc";
import { Row, Col, Spin, message } from "antd";
import Button from "components/uiElements/button";
import { createUpload } from "containers/upload/upload";
import basicStyle from "theme/style";
import IntlMessages from "utils/intlMessages";
import { routes as privateRoutes } from "router/private";
import { convertToSlug } from "utils/getters/convertToSlug";

const { rowStyleNoWidth } = basicStyle;

class AddBlogCategory extends PureComponent {
  constructor(props, context) {
    super(props);
    this.id = get(this.props.match, "params.id", undefined);
    this.addForm = createForm({
      name: constants.ADD_BLOG_CATEGORY,
      url: blogCategoryConstants.API_URL,
      title: context.intl.formatMessage({
        id: this.id
          ? "blog.addBlogCategory.editTitle"
          : "blog.addBlogCategory.title",
      }),
      id: this.id,
      redirectUrl: privateRoutes.ROUTE_BLOG_CATEGORY_LIST,
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
    this.blogImageUploader = createUpload(constants.ADD_BLOG_CATEGORY);
    this.state = {
      isParent: true,
    };
  }
  handleCancel = e => {
    e.preventDefault();
    const { goBackward } = this.props;
    goBackward();
  };
  onParentCheckChange = e => {
    this.setState({ isParent: !this.state.isParent });
  };
  handleSlugUpdate = (e, form) => {
    form.setFieldsValue({
      slug: convertToSlug(e.target.value),
    });
  };
  mutateFields = values => {
    const { isParent } = this.state;
    if (isParent) {
      values = omit(values, ["parentId"]);
    }
    return values;
  };
  render() {
    const { loading, uploading, dataLoading } = this.props;
    const { isParent } = this.state;
    const edit = this.id !== undefined;
    const Form = this.addForm;
    const BlogCategorySelector = this.blogCategorySelector;
    const BlogImageUploader = this.blogImageUploader;
    return (
      <Style>
        <Spin spinning={dataLoading}>
          <Form mutateFields={this.mutateFields}>
            {(fieldDecorator, handleSubmit, data, form) => {
              return (
                <Row style={rowStyleNoWidth}>
                  <Col className="form-col" span={24} md={{ span: 12 }}>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlogCategory.form.parentIdPlaceholder",
                      })}
                    >
                      {fieldDecorator("parentId", {
                        initialValue: defaultTo(
                          get(data, "parentId", undefined),
                          undefined
                        ),
                        rules: [
                          {
                            required: !isParent,
                            message: this.context.intl.formatMessage({
                              id:
                                "blog.addBlogCategory.form.error.parentIdRequired",
                            }),
                          },
                        ],
                      })(
                        <BlogCategorySelector
                          disabled={loading || isParent}
                          placeholder={this.context.intl.formatMessage({
                            id: "blog.addBlogCategory.form.parentIdPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <Checkbox
                      className="is-parent-select"
                      defaultChecked={defaultTo(
                        !get(data, "parentId", undefined),
                        undefined
                      )}
                      onChange={this.onParentCheckChange}
                    >
                      <IntlMessages id="blog.addBlogCategory.form.isParentPlaceholder" />
                    </Checkbox>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlogCategory.form.namePlaceholder",
                      })}
                    >
                      {fieldDecorator("name", {
                        initialValue: get(data, "name", ""),
                        rules: [
                          {
                            required: true,
                            type: "string",
                            message: this.context.intl.formatMessage({
                              id:
                                "blog.addBlogCategory.form.error.nameRequired",
                            }),
                          },
                        ],
                      })(
                        <Input
                          disabled={loading}
                          onChange={e => this.handleSlugUpdate(e, form)}
                          placeholder={this.context.intl.formatMessage({
                            id: "blog.addBlogCategory.form.namePlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlogCategory.form.slugPlaceholder",
                      })}
                    >
                      {fieldDecorator("slug", {
                        initialValue: get(data, "slug", ""),
                      })(
                        <Input
                          disabled={loading}
                          placeholder={this.context.intl.formatMessage({
                            id: "blog.addBlogCategory.form.slugPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label={this.context.intl.formatMessage({
                        id: "blog.addBlogCategory.form.imagePlaceholder",
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
                      onClick={e =>
                        uploading
                          ? message.warning(
                              this.context.intl.formatMessage({
                                id: "upload.wait",
                              })
                            )
                          : handleSubmit(e)
                      }
                      loading={loading}
                    >
                      {this.context.intl.formatMessage({
                        id: edit
                          ? "blog.addBlogCategory.form.submitEdit"
                          : "blog.addBlogCategory.form.submit",
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
AddBlogCategory.contextTypes = {
  intl: PropTypes.object.isRequired,
};
AddBlogCategory.propTypes = {
  id: PropTypes.number,
};
AddBlogCategory.defaultProps = {
  id: -1,
};
const mapDispatchToProps = dispatch => {
  return {
    goBackward: () => dispatch(goBack()),
  };
};
const mapStateToProps = state => ({
  dataLoading: state.getIn(
    [formConstants.FORM, `${constants.ADD_BLOG_CATEGORY}_data_loading`],
    false
  ),
  loading: state.getIn(
    [formConstants.FORM, `${constants.ADD_BLOG_CATEGORY}_loading`],
    false
  ),
  uploading: state.getIn(
    [uploadConstants.UPLOAD, `${constants.ADD_BLOG_CATEGORY}_loading`],
    false
  ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(AddBlogCategory));
