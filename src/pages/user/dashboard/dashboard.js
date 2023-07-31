import React, {Component} from "react";
import IntlMessages from "utils/intlMessages";
import {Divider, Row, Col, Button, notification, Card, Badge, Progress, Modal, Form, Input, Checkbox} from 'antd';
import Style from "./dashboard.style";
import PropTypes from "prop-types";
import * as actions from "./actions";
import * as courseActions from "../course/actions";
import * as profileActions from "../profile/actions";
import * as userAction from "utils/globalRedux/user/actions";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { toJS } from "hoc/toJsHoc";
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { routes as privateRoutes } from "router/private";
import * as courseConstants from "../course/constants";
import * as dashboardConstants from "../dashboard/constants";
import * as userConstants from "utils/globalRedux/user/constants";
import * as profileConstants from "../profile/constants";
import PersianNumber from "utils/getters/PersianNumber";
import {toPersianNumber} from 'utils/getters/PersianNumber';
import Factor from "./factor";
import { reduxGetter } from "utils/reduxGetter";
import qs from "qs";
import axios from "axios";
import config from "config";


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            show_factor: false,
            show_discount: false,
            show_error: false,
            rule: false
        };
    }
    componentDidMount() {
        const {getProfileInfo, getRecommended, getActiveCourse ,getInactiveCourse, getCompleteCourse, product_id, createInvoice, product_type} = this.props;
        // this.openNotification();
        // const accessToken = reduxGetter(state => state.getIn(["USER", "data", "access_token"]));
        // let headConfig = {
        //     headers: {
        //         "Content-type": "application/json",
        //         "Authorization": `Bearer ${accessToken}`,
        //     },
        // }
        // axios.get(config.apiUrl + profileConstants.GET_PROFILE_INFO_URL ,  headConfig)
        //     .then((response) => {
        //         console.log(response.data);
        //     }) .catch(function (error) {
        //     console.log(error);
        // });


        getProfileInfo();
        getRecommended();
        getActiveCourse();
        getInactiveCourse();
        getCompleteCourse();
        let data={};
        if(!isEmpty(product_id)){
            if(!isEmpty(product_type)){
                 data = {
                    "product_id": product_id,
                    "product_type": product_type,
                    "discount_code":""
                }
            }else{
                data= {
                    "product_id": product_id,
                    "product_type":"COURSE",
                    "discount_code":""
                }
            }

            createInvoice(data);
            this.setState({
                visible: true,
            });
        }

        if(this.props.location.search.includes("type=payment")){
            this.setState({
                show_factor: true,
                factor: this.props.location.search
            });
        }
        //if buy process is unsuccessful
        if(this.props.location.search.includes("status=0")){
            let params = new URLSearchParams(this.props.location.search);
            const data = {
                "product_id":  params.get("product_id"),
                "product_type": params.get("product_type"),
                "discount_code": params.get("discount_code")
            };
            createInvoice(data);
        }
    }
    handleCancel = e => {
        const {setProductId} = this.props;
        setProductId('');
        this.setState({
            visible: false,
        });
    };

     openNotification = () => {
        const args = {
            description:'برای ارسال درخواست ابتدا اطلاعات حساب کاربری خود را تکمیل کنید',
            placement: 'topLeft',
            top: 40,
            duration: 0,
            style: {
                width: 300,
                background: '#c1fab7',
                float: 'left',
                color: 'black',
            },
        };
        notification.open(args);
    };

    OnClickCourse = (course_id) => {
        this.props.history.push({
            pathname: privateRoutes.ROUTE_USER_COURSE_DETAIL,
            state:  {
                id:course_id,
            }
        })
    };

    timeConverter = (time) => {
         let hours = Math.floor(time / 3600);
         time -= hours * 3600;
         let minutes = Math.floor(time / 60);
         if( minutes == '0'){
             return toPersianNumber(hours) + ' ساعت ' ;
         } else if ( hours ==  '0'){
             return   minutes + ' دقیقه ' ;
         } else {
             return toPersianNumber(hours) + ' ساعت و ' +  toPersianNumber(minutes) + ' دقیقه ' ;
         }
    };

    buyCourse =(item, product_id) =>{
        const  url = `${item.category.seo_title}/${item.seo_title}`;
        if(isEmpty(item)){
             this.props.getCourseListURL({id:0});
        }else if(item === "retry"){
            this.props.getCourseListURL({id:product_id});
        }else {
            this.props.getCourseListURL({id:url});
        }
    }
    handleChange = e => {
        this.setState({
            code:  e.target.value
        })
    };
    handleSubmit = () => {
        const {createInvoice, product_id} =this.props;
        const data = {
                "product_id":  product_id,
                "product_type": "COURSE",
                "discount_code": this.state.code
            };
        createInvoice(data);

    };
    onClickBuy = (status) => {
        if(status === '0') {
                const {setProductId} = this.props;
                setProductId('');
                 window.location.href = this.props.InvoiceInfo.url;
        } else {
            if (this.state.rule) {
                const {setProductId} = this.props;
                setProductId('');
                window.location.href = this.props.InvoiceInfo.url;
            } else {
                this.setState({
                    show_error: true
                })
            }
        }
    }
    onClickDiscount= (e) => {
        this.setState({
            show_discount: true
        })
    }
    onChangeCheckbox = (e) => {
        this.setState({
            rule: e.target.checked,
            show_error: false
        })
     }

    render() {
        const { Meta } = Card;
        const {InvoiceInfo} = this.props;
        return (
        <Style>
            {(isEmpty(this.props.active) && isEmpty(this.props.inactive) && isEmpty(this.props.completed) ) &&
            <Card>
                <div className="no-course">
                    <IntlMessages id="user.dashboard.empty"/>
                </div>
                <Button onClick={()=>this.buyCourse()}>
                    <IntlMessages id="user.dashboard.register.course"/>
                </Button>
            </Card>
            }
            {!(isEmpty(this.props.active)) &&
                <div>
                    <Row>
                        <Col span={24}>
                            <Divider orientation="left" >
                                <IntlMessages id="user.course.active" />
                            </Divider>
                        </Col>

                    </Row>
                    <Row className="course" gutter={20}>
                        {map(this.props.active.slice(0, 3), item => {
                            return (
                                <Card>
                                    <Col xs={24}  xl={4}  >
                                        <img onClick={() =>this.OnClickCourse(item.id)} alt="example" src={item.thumbnail_media}/>
                                    </Col>
                                    <Col xs={24}  xl={20}>
                                        <Row>
                                            <h2 onClick={() =>this.OnClickCourse(item.id)}>{item.header_title}</h2>
                                            <p>
                                                <Badge color="blue" text="این دوره فعال می باشد"/>
                                            </p>
                                            <p>
                                                <b>
                                                    مدرس:
                                                    <span>{!isEmpty(item.teacher) && item.teacher[0].name} </span>
                                                </b>
                                               / زمان دوره
                                                <span> {item.total_duration}</span>
                                                هفته
                                            </p>
                                            { item.sell_type === 'with_type' &&
                                                <span className="support">
                                                    <IntlMessages id="user.course.support1" />
                                                    <b>{item.expired_at}</b>
                                                    <IntlMessages id="user.course.support2" />
                                                </span>
                                            }

                                            <Button
                                                onClick={() => this.OnClickCourse(item.id)}>
                                                <IntlMessages id="user.dashboard.class"/>
                                            </Button>
                                        </Row>
                                        <Row>
                                            <Col  xs={4}  xl={2}>
                                                <span className="ant-progress-newText" >{toPersianNumber( item.percentage)}%</span>
                                            </Col>
                                            <Col  xs={20}  xl={22}>
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
                                </Card>
                            )
                        })}
                        {this.props.active.length > 3 &&
                           <Button className="more-btn" onClick={() => this.props.history.push(privateRoutes.ROUTE_USER_COURSE_ACTIVE)}>
                             <IntlMessages id="user.dashboard.more" />
                            </Button>
                        }
                    </Row>

                </div>
            }
            {!(isEmpty(this.props.inactive)) &&
                        <div>
                            <Row>
                                <Col span={24}>
                                    <Divider orientation="left" >
                                        <IntlMessages id="user.course.inactive" />
                                    </Divider>
                                </Col>
                            </Row>
                            <Row className="course" gutter={20}>
                                {map(this.props.inactive.slice(0, 3), item => {
                                    return (
                                        <Card>
                                            <Col xs={24}  xl={4}  >
                                                <img onClick={() =>this.OnClickCourse(item.id)} alt="example" src={item.thumbnail_media}/>
                                            </Col>
                                            <Col xs={24}  xl={20}>
                                                <Row>
                                                    <h2 onClick={() =>this.OnClickCourse(item.id)}>{item.header_title}</h2>
                                                    <p>
                                                        <Badge color="blue" text="این دوره غیرفعال می باشد"/>
                                                    </p>
                                                    <p>
                                                        <b>
                                                            مدرس:
                                                            <span>{!isEmpty(item.teacher) && item.teacher[0].name} </span>
                                                        </b>
                                                        / زمان دوره
                                                        <span> {item.total_duration}</span>
                                                        هفته
                                                    </p>
                                                    <Button
                                                        onClick={() => this.OnClickCourse(item.id)}>
                                                        <IntlMessages id="user.dashboard.class"/>
                                                    </Button>
                                                </Row>
                                                <Row>
                                                    <Col  xs={4}  xl={2}>
                                                        <span className="ant-progress-newText" >{toPersianNumber( item.percentage)}%</span>
                                                    </Col>
                                                    <Col  xs={20}  xl={22}>
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
                                        </Card>
                                    )
                                })}
                                {this.props.inactive.length > 3 &&
                                    <Button className="more-btn"
                                            onClick={() => this.props.history.push(privateRoutes.ROUTE_USER_COURSE_INACTIVE)}>
                                        <IntlMessages id="user.dashboard.more"/>
                                    </Button>
                                }
                            </Row>
                        </div>
            }
            {!(isEmpty(this.props.completed)) &&
                            <div>
                                <Row>
                                    <Col span={24}>
                                        <Divider orientation="left" >
                                            <IntlMessages id="user.course.completed" />
                                        </Divider>
                                    </Col>
                                </Row>
                                <Row className="course" gutter={20}>
                                    {map(this.props.completed.slice(0, 3) , item => {
                                        return (
                                            <Card>
                                                <Col xs={24}  xl={4}  >
                                                    <img onClick={() =>this.OnClickCourse(item.id)} alt="example" src={item.thumbnail_media}/>
                                                </Col>
                                                <Col xs={24}  xl={20}>
                                                    <Row>
                                                        <h2 onClick={() =>this.OnClickCourse(item.id)}>{item.header_title}</h2>
                                                        <p>
                                                            <Badge color="blue" text="این دوره تکمیل شده"/>
                                                        </p>
                                                        <p>
                                                            <b>
                                                                مدرس:
                                                                <span>{!isEmpty(item.teacher) && item.teacher[0].name} </span>
                                                            </b>
                                                            / زمان دوره
                                                            <span> {item.total_duration}</span>
                                                            هفته
                                                        </p>
                                                        <Button
                                                            onClick={() => this.OnClickCourse(item.id)}>
                                                            <IntlMessages id="user.dashboard.class"/>
                                                        </Button>
                                                    </Row>
                                                    <Row>
                                                        <Col  xs={4}  xl={2}>
                                                            <span className="ant-progress-newText" >{toPersianNumber( item.percentage)}%</span>
                                                        </Col>
                                                        <Col  xs={20}  xl={22}>
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
                                            </Card>
                                        )
                                    })}
                                    {this.props.completed.length > 3 &&
                                        <Button className="more-btn"
                                                onClick={() => this.props.history.push(privateRoutes.ROUTE_USER_COURSE_COMPLETED)}>
                                            <IntlMessages id="user.dashboard.more"/>
                                        </Button>
                                    }
                                </Row>
                            </div>
            }
            <Row>
                <Col span={24}>
                    <Divider orientation="left" >
                        <IntlMessages id="user.dashboard.selectedCourse" />
                    </Divider>
                </Col>
            </Row>
            <Row className="selected-course" gutter={50}>
                {map(this.props.recommended, (item ,index)=> {
                    if(index<4) {
                        return (
                            <Col  xs= {24} sm={18}  md={12} lg={6} onClick={ () =>this.buyCourse(item)} >
                                <Card
                                    hoverable
                                    cover={<img alt="example" src={item.thumbnail_media}/>}
                                    actions={[ `${item.total_duration}هفته` ]}
                                >
                                    <Meta title={item.header_title} description={!isEmpty(item.teacher) && item.teacher[0].name}/>
                                </Card>
                            </Col>
                        )
                    }
                })}
            </Row>
            {this.props.recommended.length > 4 &&
                <Row>
                    <a onClick={() => this.buyCourse()} className=" ant-btn more-btn">
                        <IntlMessages id="user.dashboard.more"/>
                    </a>
                </Row>
            }
            <Modal
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[]}
                width="700px"
                className="buy-modal"
            >
                    <div className="pay-card-wrapper">
                        <h4>
                            <IntlMessages id="user.dashboard.course.title"/>
                            &nbsp;{InvoiceInfo.title}
                        </h4>
                        <Divider/>
                        <div className="pay-card-body">
                            <span className="title">
                                    <IntlMessages id="user.dashboard.course.price"/>
                                </span>
                            <div className="price-wrapper">
                                <PersianNumber className="price">{InvoiceInfo.price}</PersianNumber>
                                <span>
                                    <IntlMessages id="user.dashboard.course.toman"/>
                                 </span>
                            </div>
                            <Divider/>
                            <Checkbox  onChange={this.onChangeCheckbox}>
                                <a href="http://amoozal.com/rules" className="rules" target="_blank"> <IntlMessages id="buy.modal.rule"/></a>
                                <IntlMessages id="buy.modal.rule2"/>
                                {this.state.show_error && <div className="show-error">قوانین سایت باید تایید شود.</div>}
                            </Checkbox>

                            {this.props.product_type !== 'PACKAGE' &&
                                <button onClick={this.onClickDiscount}>
                                    <IntlMessages id="user.dashboard.course.have.code"/>
                                </button>
                            }
                            <div className="discount-code">
                                {this.props.product_type === 'COURSE' && this.state.show_discount &&
                                <Form>
                                    <Row>
                                        <Col span={17}>
                                            <Form.Item>
                                                <Input className="discount-input"
                                                       placeholder="کد تخفیف"
                                                       onChange={e =>this.handleChange(e)}
                                                />

                                            </Form.Item>
                                        </Col>
                                        <Col span={7}>
                                            <Form.Item>
                                                <Button className="action-btn"  onClick={this.handleSubmit}>
                                                    <IntlMessages id="user.dashboard.course.done" />
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                                    }
                            </div>
                        </div>
                        {/*<div className="banks">*/}
                        {/*   <img src="http://www.behpardakht.com/resources/images/news/News5.jpg" alt="به پرداخت بانک ملت"/>*/}
                        {/*</div>*/}
                        <Button formButton className="gateway-btn" onClick={this.onClickBuy}>
                            <IntlMessages id="user.dashboard.course.dargah"/>
                        </Button>
                    </div>
            </Modal>
            {this.state.show_factor &&
                <Factor factor={this.state.factor} buyCourse={this.onClickBuy}/>
            }
        </Style>
        );
    }
}

Dashboard.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const { getRecommended } = actions;
    const { getActiveCourse } = courseActions
    const { getInactiveCourse } = courseActions;
    const { getCompleteCourse } = courseActions;;
    const { getProfileInfo } = profileActions;
    const { getCourseListURL } = actions;
    const { validateSellType } = actions;
    const { createInvoice } = actions;
    const { setProductId } = userAction;
    return bindActionCreators({
        getProfileInfo,
        getRecommended,
        getActiveCourse,
        getInactiveCourse,
        getCompleteCourse,
        getCourseListURL,
        validateSellType,
        createInvoice,
        setProductId
        }
        , dispatch);
};

const mapStateToProps = state => ({
     active: state.getIn([courseConstants.COURSE, "active"], {}),
     inactive: state.getIn([courseConstants.COURSE, "inactive"], {}),
     completed: state.getIn([courseConstants.COURSE, "completed"], {}),
     recommended: state.getIn([dashboardConstants.USER_DASHBOARD, "recommended"], {}),
     InvoiceInfo: state.getIn([dashboardConstants.USER_DASHBOARD, "createInvoice"], {}),
     validateSell: state.getIn([dashboardConstants.USER_DASHBOARD, "validateSell"], {}),
     userToken: state.getIn([userConstants.USER, "data","access_token"]),
     product_id: state.getIn([userConstants.USER, "product_id"],null),
     product_type: state.getIn([userConstants.USER, "product_type"],null),

});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Form.create()(Dashboard)));
