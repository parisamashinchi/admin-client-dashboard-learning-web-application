import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import {emptyRender} from "containers/table/renders/emptyRender";
import * as privateRoutes from "router/private/constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';

class Slider extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_SLIDER_EDIT.replace(":id", id || -1)
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
        this.table = createTable(constants.SLIDER);
        this.tableConf = {
            url: constants.SLIDER_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_SLIDER_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "slider.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "slider.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "slider.list.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "slider.list.description"
                    }),
                    dataIndex: "description",
                    key: "description",
                    render: text => emptyRender(<Ellipsis tooltip={true} length={15}>{text}</Ellipsis>)
                }
            ],
            hasActions: true,
            editProps,
            deleteProps,
        };
    }

    render() {
        const Table = this.table;
        return (
            <Table
                {...this.tableConf}
                {...this.props}
                titleBox={this.context.intl.formatMessage({
                    id: "slider.list.table"
                })}
            />
        );
    }
}

Slider.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.SLIDER, "dashboard_loading"]),
    statistics: state.getIn([constants.SLIDER, "statistics"]),
    shopStatistics: state.getIn([constants.SLIDER, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.SLIDER,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.SLIDER, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Slider));
