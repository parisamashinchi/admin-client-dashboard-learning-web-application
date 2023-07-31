import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/scss/style.scss";
import { toJS } from "hoc/toJsHoc";
import IntlMessages from "utils/intlMessages";
import * as actions from "./actions";
import * as userConstants from "utils/globalRedux/user/constants";
import * as userAction from "utils/globalRedux/user/actions";
import SignUp from "./signUp";
import SignIn from "./signIn";
import Verify from "./verify";
import Style from "./signIn.style";
import isEmpty from "lodash/isEmpty";
import {Tabs, Form, Icon, Input, Button, Card, Row, Col} from 'antd';
import { routes as privateRoutes } from "router/private";


class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            verifySignIn: false,
            verifySignUp: false,
            active_tab: "1"
        }
    }

    componentDidMount() {
        const {getCountryCode, setProductId, setProductType} = this.props;
        getCountryCode();
        if (!isEmpty(this.props.location.search)) {
            if (this.props.location.search.split('?').includes("type=package")) {
                setProductType('PACKAGE')
                setProductId(this.props.location.search.split('?')[1].split('=')[1])
            } else {
                setProductType('COURSE')
                setProductId(this.props.location.search.split('=')[1])
            }
        }
        // if(!isEmpty(this.props.location.search)) {
            if(this.props.location.pathname.includes('sign-in')){
                this.setState({
                    active_tab : "2"
                })
            }else if (this.props.location.pathname.includes('sign-up')){
                this.setState({
                    active_tab : "1"
                })
            }
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.auth === 'signIn'){
            if(this.props.userValidationCode !== prevProps.userValidationCode) {
                this.setState({
                    verifySignIn: true
                });
            }
            }else{
                if(this.props.userValidationCode !== prevProps.userValidationCode){
                    this.setState({
                        verifySignUp: true
                    });
                }
            }
    }
    onChangeTab = ()=> {
        if(this.state.active_tab === "1")
        {
            this.setState({
                active_tab: "2"
            })
        }else {
            this.setState({
                active_tab: "1"
            })
        }
    }
    render() {
      const { TabPane } = Tabs;
        if (this.props.isLoggedIn) {
            if(this.props.role ==="STUDENT-PROFILE"){
                if (!isEmpty(this.props.location.search) && this.props.location.search.includes('product_id')) {
                    this.props.history.push(privateRoutes.ROUTE_USER_DASHBOARD + "?before_state=none&after_state=gateway");
                } else {
                    this.props.history.push(privateRoutes.ROUTE_USER_DASHBOARD + "?before_state=none&after_state=none");
                }

            }else if(this.props.role === "ADMIN-PROFILE" || this.props.role === 'view'){
                this.props.history.push(privateRoutes.ROUTE_DASHBOARD);
            }else if(this.props.role ==="university"){
                this.props.history.push(privateRoutes.ROUTE_USER_UNIVERSITY);
            }
        }


      return (
          <Style>
              <Row className="signUp-back">
                  <Button className="back-btn" onClick={() => window.location.href="https://amoozal.com/"}>
                      <IntlMessages id="user.return.amoozal" />
                      <Icon type="left" />
                  </Button>
              <Card>

                <Tabs type="card" activeKey={this.state.active_tab}  onChange={this.onChangeTab}>
                    <TabPane tab={<IntlMessages id="auth.signUp" />} key="1">
                        {this.state.verifySignUp
                            ?<Verify mobile={this.props.mobile_number} />
                            :<SignUp/>
                        }
                    </TabPane>
                    <TabPane tab={<IntlMessages id="auth.signIn" />} key="2">
                        {this.state.verifySignIn
                            ?<Verify mobile={this.props.mobile_number} auth="signIn"/>
                            :<SignIn/>
                        }
                    </TabPane>
                </Tabs>
              </Card>
              </Row>
          </Style>
        );
      }
}
Auth.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    signInRequest: actions.signIn,
    getCountryCode: actions.getCountryCode,
    setProductId: userAction.setProductId,
    setProductType: userAction.setProductType,
};
const mapStateToProps = state => ({
    userValidationCode: state.getIn([userConstants.USER, "validation_code"], null),
    auth: state.getIn([userConstants.USER, "auth"], null),
    mobile_number: state.getIn([userConstants.USER, "mobile_number"], null),
    isLoggedIn: state.getIn([userConstants.USER, "data", "access_token"], null) !== null,
    role: state.getIn([userConstants.USER, "data", "role"], null),
    product_id: state.getIn([userConstants.USER, "product_id"],null),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Form.create()(Auth)));
