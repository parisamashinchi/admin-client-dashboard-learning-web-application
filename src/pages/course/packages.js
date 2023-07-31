import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as privateRoutes from "router/private/constants";
import * as constants from "./constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import * as tableConstants from "../../containers/table/constants";
import {Button} from "antd";
import * as actions from "./actions";

class Packages extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.PACKAGE);
        this.tableConf = {
             url: `${constants.COURSE_URL}/${props.match.params.id}/package`,
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_LIST);
            },
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "course.return"
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
                    render:  (data) =>
                        <Button onClick={() => this.publishPackage(data)} >
                            {context.intl.formatMessage({
                                id: "course.package.publish"
                            })}
                        </Button>
                },
                {
                    render:  (data) =>
                        <Button onClick={() => this.onPublishPackage(data)} >
                            {context.intl.formatMessage({
                                id: "course.package.onPublish"
                            })}
                        </Button>
                }

            ],
            hasActions: true,
        };
    }
    publishPackage = (data) => {
       const newData = {
            package_id : data.id,
            course_id: this.props.match.params.id
        }
        this.props.publishPackage(newData)

    }
    onPublishPackage = (data) => {
        const newData = {
            package_id : data.id,
            course_id: this.props.match.params.id
        }
        this.props.onPublishPackage(newData)
    }

    render() {
        const Table = this.table;
        return (
            <div>
                <Table
                    {...this.tableConf}
                    {...this.props}
                    titleBox={this.context.intl.formatMessage({
                        id: "course.package.list"
                    })}
                />
            </div>

        );
    }
}

Packages.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const publishPackage = actions.publishPackage;
    const onPublishPackage = actions.onPublishPackage;
    return bindActionCreators({push, publishPackage, onPublishPackage}, dispatch);
};

const mapStateToProps = state => ({
    courseId: state.getIn([tableConstants.TABLE, "courseId"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Packages));
