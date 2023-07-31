import React, {Component} from "react";
import IntlMessages from "utils/intlMessages";
import {Badge, Button, Col, Progress, Row, Card, Modal} from "antd";
import Style from "./course.style";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actions from "./actions";
import * as constants from "./constants";
import { toJS } from "hoc/toJsHoc";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import notFound from "../../../static/images/notFound.png";
import { routes as privateRoutes } from "router/private";
import {toPersianNumber} from 'utils/getters/PersianNumber';

class InActive extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            loading: false,
            invoice_url:""
        };
    }

    componentDidMount() {
        const {getInactiveCourse} = this.props;
        getInactiveCourse();
    }

    showModal = (item) => {
        this.setState({
            visible: true,
            extend_item: item
        });
        console.log(item)
    };

    handleOk = id => {
        const {createInvoice} = this.props;
        const data = {
            "product_id": id,
            "product_type": "COURSE",
            "discount_code": null
        };
        createInvoice(data);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading: false,
                visible: false,
            });
        }, 3000);
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    timeConverter = (time) => {
        let hours = Math.floor(time / 3600);
        time -= hours * 3600;
        let minutes = Math.floor(time / 60);
        if( minutes == '0'){
            return hours + ' ساعت ' ;
        } else if ( hours ==  '0'){
            return   minutes + ' دقیقه ' ;
        } else {
            return hours + ' ساعت و ' +  minutes + ' دقیقه ' ;
        }
    };
    OnClickCourse = (course_id) => {
        this.props.history.push({
            pathname: privateRoutes.ROUTE_USER_COURSE_DETAIL,
            state:  {
                id:course_id,
            }
        })
    };

    render() {
        const {extend_item} = this.state;
        return (
            <card>
                <Style>
                    {isEmpty(this.props.inactive)
                        ? <Row className="certificate">
                            <Card className="not-found">
                                <img src={notFound} alt="دوره ای یافت نشد"/>
                                <p><IntlMessages id="user.dashboard.course.notFound"/></p>
                            </Card>
                        </Row>
                        :
                        <Row className="course" gutter={20}>
                            {map(this.props.inactive, item => {
                                return (
                                    <Card>
                                        <Col xs={24}  xl={4}>
                                            <img onClick={() =>this.OnClickCourse(item.id)} alt="example" src={item.thumbnail_media}/>
                                        </Col>
                                        <Col xs={24}  xl={20}>
                                            <Row>
                                                <h2 onClick={() =>this.OnClickCourse(item.id)}> {item.header_title}</h2>
                                                <p>
                                                    <Badge color="yellow" text="این دوره  غیر فعال می باشد"/>
                                                </p>
                                                <p>
                                                    <b>
                                                        مدرس:
                                                        <span> {!isEmpty(item.teacher) && item.teacher[0].name}</span>
                                                    </b>
                                                    &nbsp;
                                                    / زمان دوره
                                                    <span> {item.total_duration}</span>
                                                    هفته
                                                </p>
                                                {!isEmpty(item.sell_type) &&
                                                    <Button className="btn-recharge" onClick={()=>this.showModal(item)}>
                                                        <IntlMessages id="user.dashboard.recharge"/>
                                                    </Button>
                                                }

                                                <Modal
                                                    title={<IntlMessages id="user.dashboard.recharge"/>}
                                                    visible={this.state.visible}
                                                    onCancel={this.handleCancel}
                                                    footer={[
                                                        <Button type="primary" loading={this.state.loading}
                                                                onClick={() =>this.handleOk(extend_item.sell_type.id)}>
                                                            <IntlMessages id="user.dashboard.recharge.bank"/>
                                                        </Button>,
                                                    ]}
                                                    width="400px"
                                                >
                                                    <p>
                                                        <IntlMessages id="user.dashboard.recharge.description1"/>
                                                        {this.state.visible && extend_item.header_title}
                                                        <IntlMessages id="user.dashboard.recharge.description2"/>
                                                        {this.state.visible && !isEmpty(extend_item.sell_type) && extend_item.sell_type.price}
                                                        <IntlMessages id="user.dashboard.recharge.description3"/>
                                                    </p>
                                                    <img src="http://www.behpardakht.com/resources/images/news/News5.jpg"
                                                         alt="به پرداخت بانک ملت"/>
                                                </Modal>
                                                <Button onClick={() => this.OnClickCourse(item.id)}>
                                                    <IntlMessages id="user.dashboard.class"/>
                                                </Button>
                                            </Row>
                                            <Row>
                                                <Col xs={4}  xl={2}>
                                                    <span className="ant-progress-newText" >{toPersianNumber( item.percentage)}%</span>
                                                </Col>
                                                <Col xs={20}  xl={22}>
                                                    <Progress
                                                        strokeColor={{
                                                            '0%': '#ebef61',
                                                            '100%': '#92e08c',
                                                        }}
                                                        percent={ item.percentage}
                                                        strokeWidth={'25px'}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Card>)
                            })}

                        </Row>
                    }
                </Style>
            </card>
        );
    }
}
InActive.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const { getInactiveCourse } = actions;
    const { createInvoice } = actions;
    return bindActionCreators({getInactiveCourse, createInvoice}, dispatch);
};

const mapStateToProps = state => ({
    inactive: state.getIn([constants.COURSE, "inactive"], {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(InActive));
