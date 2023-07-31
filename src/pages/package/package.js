import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import * as actions from "./actions";
import { booleanRender } from "containers/table/renders/booleanRender";
import * as privateRoutes from "router/private/constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import {Button, Col, Modal, Row} from "antd";
import get from "lodash/get";
import {createForm} from "containers/form/form";
import FormItem from "components/uiElements/formItem";
import * as formConstants from "containers/form/constants";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import Select, { Option} from "components/uiElements/select";
import Input from "components/uiElements/textInput";
import * as discountActions from "../discount/actions";
import * as discountConstants from "../discount/constants";
import * as userConstants from "utils/globalRedux/user/constants";

class Package extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.state ={
            visible_add_package : false,
            package_id: [],
            student_id: [],
        }
        this.table = createTable(constants.PACKAGE);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_PACKAGE_EDIT.replace(":id", id || -1)
                ),
        };
        const deleteProps = {
            title: context.intl.formatMessage({
                id: "product.productAttribute.list.pop.deleteTitle",
            }),
            okText: context.intl.formatMessage({
                id: "product.productAttribute.list.pop.deleteConfirm",
            }),
            cancelText: context.intl.formatMessage({
                id: "product.productAttribute.list.pop.deleteDeclined",
            }),
        };
        this.tableConfMarketing = {
            url: constants.PACKAGE_URL,
            secondButtonWithAction: () => {
                this.addPackage()
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "package.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "package.list.add.hand"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "package.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.header_title"
                    }),
                    dataIndex: "header_title",
                    key: "header_title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.header_descriptions"
                    }),
                    dataIndex: "header_descriptions",
                    key: "header_descriptions",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.discount"
                    }),
                    dataIndex: "discount",
                    key: "discount",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.content_title"
                    }),
                    dataIndex: "content_title",
                    key: "content_title",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.content_descriptions"
                    }),
                    dataIndex: "content_descriptions",
                    key: "content_descriptions",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.content_media"
                    }),
                    dataIndex: "content_media",
                    key: "content_media",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.order"
                    }),
                    dataIndex: "order",
                    key: "order",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.is_published"
                    }),
                    dataIndex: "is_published",
                    key: "is_published",
                    render: bool => booleanRender(bool),
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.has_degree"
                    }),
                    dataIndex: "has_degree",
                    key: "has_degree",
                    render: bool => booleanRender(bool),
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.course_sell_types"
                    }),
                    dataIndex: "course_sell_types[0].type",
                    key: "course_sell_types[0].type",
                },

            ],
            hasActions: true,
        };
        this.tableConf = {
            url: constants.PACKAGE_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_PACKAGE_ADD);
            },
            secondButtonWithAction: () => {
                this.addPackage()
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "package.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "package.list.add.hand"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "package.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.header_title"
                    }),
                    dataIndex: "header_title",
                    key: "header_title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.header_descriptions"
                    }),
                    dataIndex: "header_descriptions",
                    key: "header_descriptions",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.discount"
                    }),
                    dataIndex: "discount",
                    key: "discount",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.content_title"
                    }),
                    dataIndex: "content_title",
                    key: "content_title",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.content_descriptions"
                    }),
                    dataIndex: "content_descriptions",
                    key: "content_descriptions",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.content_media"
                    }),
                    dataIndex: "content_media",
                    key: "content_media",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.order"
                    }),
                    dataIndex: "order",
                    key: "order",
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.is_published"
                    }),
                    dataIndex: "is_published",
                    key: "is_published",
                    render: bool => booleanRender(bool),
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.has_degree"
                    }),
                    dataIndex: "has_degree",
                    key: "has_degree",
                    render: bool => booleanRender(bool),
                },
                {
                    title: context.intl.formatMessage({
                        id: "package.list.course_sell_types"
                    }),
                    dataIndex: "course_sell_types[0].type",
                    key: "course_sell_types[0].type",
                },

            ],
            hasActions: true,
            editProps,
            deleteProps,
        };
    }
    componentDidMount() {
        const {getStudents} = this.props;
        getStudents();
    };

    handleCancel = e => {
        this.setState({
            visible_add_package: false,
        });
    };
    onSearch = (value, type, key) => {
        const { getStudentsByFilter } = this.props;
        getStudentsByFilter(value, type, key);
    };
    onSearchPackage = (value, type, key) => {
         const { getDataByFilter } = this.props;
        getDataByFilter(value, type, key);
    };
    changeStudents = (value, setData) => {
        setData({student_profile_id: value});
        this.setState({
            student_id: value
        });
    };
    changePackage = (value, setData) => {
        setData({package_id: value});
        console.log(value);
        this.setState({
            package_id: value
        });
    };
    addPackage = () => {
        this.setState({
            visible_add_package: true
        })
        this.modalForm = createForm({
            name: constants.PACKAGE,
            url: `/admin/package/manual_access`,
            title: this.context.intl.formatMessage({
                id: "package.add.title",
            }),
        });
    }

    render() {
        const Table = this.table;
        let Form = this.modalForm;
        const {
            loading,
            studentData,
            filteredData,
            packageData,
            packageDataByFilter,
            userRole
        } = this.props;

        return (
            <div>
                {userRole === "marketing"
                    ? <Table
                        {...this.tableConfMarketing}
                        {...this.props}
                        titleBox={this.context.intl.formatMessage({
                            id: "package.list.table"
                        })}
                    />
                    : <Table
                        {...this.tableConf}
                        {...this.props}
                        titleBox={this.context.intl.formatMessage({
                            id: "package.list.table"
                        })}
                    />
                }
            <Modal
                title={[]}
                visible={this.state.visible_add_package}
                onCancel={this.handleCancel}
                footer={[]}
                width="700px"
            >
                <Form  extraData={{
                    student_profile_id: this.state.student_id,
                    package_id: this.state.package_id
                }}>
                    {(fieldDecorator, handleSubmit, data, form) => {
                        return (
                             <Row>
                                    <Col className="form-col" span={24} >
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "course.student.list",
                                            })}
                                        >
                                            <Select
                                                value={this.state.student_id}
                                                onSearch={(value) => this.onSearch(value, 'STUDENTS', 'filter[mobile_number]')}
                                                onChange={value => this.changeStudents(value,  form.setFieldsValue)}
                                                showArrow
                                                showSearch
                                                filterOption={false}
                                                notFoundContent={null}
                                                defaultActiveFirstOption={false}
                                            >
                                                {map(isEmpty(filteredData['STUDENTS'])
                                                    ? get(studentData, "STUDENT", "")
                                                    : filteredData['STUDENTS'], (item, index) => {
                                                    return  <Option
                                                        value={item.student_profile_id}
                                                        key={item.student_profile_id}
                                                    >
                                                        {item.name} => {item.mobile_number}
                                                    </Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "course.student.package",
                                            })}
                                        >
                                            <Select
                                                value={this.state.package_id}
                                                onSearch={(value) => this.onSearchPackage(value, 'PACKAGE', 'filter[header_title]')}
                                                onChange={value => this.changePackage(value,  form.setFieldsValue)}
                                                showArrow
                                                showSearch
                                                filterOption={false}
                                                notFoundContent={null}
                                                defaultActiveFirstOption={false}
                                            >
                                                {map(isEmpty(packageDataByFilter['PACKAGE'])
                                                    ? get(packageData, "PACKAGE_data", "")
                                                    : packageDataByFilter['PACKAGE'], (item, index) => {
                                                    return  <Option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.header_title}
                                                    </Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "course.student.list.price",
                                            })}
                                        > {fieldDecorator("price")(
                                            <Input
                                                disabled={loading}
                                                onChange={e => form.setFieldsValue({
                                                    price: e.target.value,
                                                })}
                                                value={this.state.price}
                                            />
                                        )}
                                        </FormItem>
                                        <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                            <Button
                                                className="btn btn-primary shadow-2"
                                                type="primary"
                                                onClick={handleSubmit}
                                                loading={loading}
                                            >
                                                {this.context.intl.formatMessage({
                                                    id: "submit",
                                                })}
                                            </Button>
                                        </Col>
                                    </Col>
                             </Row>
                        )
                    }}
                </Form>
            </Modal>
            </div>
        );
    }
}

Package.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const { getDataByFilter} = actions;
    const {getStudents, getStudentsByFilter, } = discountActions;
    return bindActionCreators({getStudents, getStudentsByFilter,getDataByFilter,push }, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([formConstants.FORM, `${constants.COURSE}_loading`], false),
    filteredData: state.getIn(
        [discountConstants.DISCOUNT, 'filtered'],
        {}
    ),
    studentData: state.getIn(
        [discountConstants.DISCOUNT, 'data' ],
        {}
    ),
    packageDataByFilter: state.getIn(
        [constants.PACKAGE,'filtered'],
        {}
    ),
    packageData: state.getIn(
        ['Table'],
        {}
    ),
    userRole: state.getIn([userConstants.USER, "data","role"]),

});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Package));
