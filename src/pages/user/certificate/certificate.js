import React, {Component} from "react";
import IntlMessages from "utils/intlMessages";
import {Button, Col, Row, Card, Divider, Modal} from "antd";
import notFound from "../../../static/images/notFound.png";
import Style from "./certificate.style";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as constants from "./constants";
import * as actions from "./actions";
import connect from "react-redux/es/connect/connect";
import { toJS } from "hoc/toJsHoc";
import map from "lodash/map";
import { timeRender } from "containers/table/renders/timeRender";
import isEmpty from "lodash/isEmpty";

class Certificate extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        };
    }
    componentDidMount() {
        const {getCertificate} = this.props;
        getCertificate();
    }

    downloadCertificate = url => {
        fetch(url).then(res => res.blob()).then(blob => {
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            let filename = 'certificate.jpeg';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    render() {
        return (
            <Style>
                { isEmpty(this.props.certificate)
                   ? <Row className="certificate">
                        <Card className="not-found">
                            <Divider orientation="left">
                                <IntlMessages id="user.dashboard.certificate.me" />
                            </Divider>
                            <img src={notFound} alt="گواهینامه یافت نشد" />
                           <p><IntlMessages id="user.dashboard.certificate.notFound" /></p>
                        </Card>
                    </Row>
                   : map(this.props.certificate,(item , index)=> {
                        return(
                            <Row className="certificate">
                                <Card className={index === 0 ? "first-card" : ""}>
                                    <Divider orientation="left">
                                        <IntlMessages id="user.dashboard.certificate.me"/>
                                    </Divider>
                                    <Col  xs={12}  xl={12}   className="certificate-card">
                                        <h2>{item.title}</h2>
                                        <p>
                                            <IntlMessages id="user.dashboard.certificate.serial"/>
                                            <span> {item.serial_number}</span>
                                        </p>
                                        <p>
                                            <IntlMessages id="user.dashboard.certificate.date"/>
                                            <span> {timeRender(item.done_at)} </span>
                                        </p>
                                    </Col>

                                    <Col  xs={12}  xl={8} >
                                        <Button className="btn-recharge" onClick={() =>this.downloadCertificate(item.certificate_file)} >
                                            <IntlMessages id="user.dashboard.certificate.receive"/>
                                        </Button>
                                        <Button onClick={this.showModal}>
                                            <IntlMessages id="user.dashboard.certificate.see"/>
                                        </Button>
                                    </Col>
                                    <Col xs={12}  xl={4}>
                                        <img src={item.certificate_file} alt="گواهی نامه"/>
                                    </Col>
                                </Card>
                                <Modal
                                    title={[]}
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={[]}
                                    width="900px"
                                    className="gavahi-modal"
                                >
                                    <img  className="certificate-image" src={item.certificate_file} alt="گواهی نامه"/>
                                </Modal>
                            </Row>

                        )
                    })
                }
            </Style>
        );
    }
}
Certificate.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const { getCertificate } = actions;
    return bindActionCreators({getCertificate}, dispatch);
};

const mapStateToProps = state => ({
    certificate: state.getIn([constants.CERTIFICATES, "certificates"], {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Certificate));
