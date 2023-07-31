import React, {Component} from "react";
import IntlMessages from "utils/intlMessages";
import Style from "./dashboard.style";
import {Button, Col, Modal, Row} from "antd";
import {toPersianNumber} from 'utils/getters/PersianNumber';

class Factor extends Component {
    constructor(props){
        super(props);
        this.state = {
            factor: '',
            visible: true,
        };
    }
    componentDidMount(){
        let params = new URLSearchParams(this.props.factor);
        this.setState({
            message: params.get("message"),
            status: params.get("status"),
            course_title: params.get("course_title"),
            tracing_code: params.get("tracing_code"),
            date: params.get("date"),
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {message, status,course_title, tracing_code, date} = this.state;
        return (
            <Style>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[]}
                    width="500px"
                    className={status === '1' ? "buy-modal" : "buy-modal error_modal"}
                >
                    <div className="pay-card">
                        <div className="pay-card-wrapper">
                            <h3 className="pay-card-title">
                               {message}
                            </h3>
                            {/*<Divider/>*/}
                            {status === '1' &&
                                <div className="pay-card-body">
                                    <h5><IntlMessages id="user.factor.title"/> {course_title}</h5>
                                    <h5><IntlMessages id="user.factor.code"/>{toPersianNumber(tracing_code)}</h5>
                                    <h5><IntlMessages id="user.factor.date"/>{toPersianNumber(date)}</h5>
                                </div>
                            }
                            {status === '1'
                               ? <Button formButton className="gateway-btn factor-btn" onClick={this.handleCancel}>
                                    <IntlMessages id="user.factor.button"/>
                                </Button>
                                : <Row>
                                    <Col span={12}>
                                        <Button formButton className="gateway-btn close-btn" onClick={this.handleCancel}>
                                            <IntlMessages id="user.factor.button.close"/>
                                        </Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button formButton className="gateway-btn retry-btn" onClick={() => this.props.buyCourse(status)}>
                                            <IntlMessages id="user.factor.button.try"/>
                                        </Button>
                                    </Col>
                                </Row>
                            }
                        </div>
                    </div>
                </Modal>
            </Style>
        )
    }
}
export default Factor