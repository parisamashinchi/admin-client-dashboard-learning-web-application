import React, {Component} from "react";
import {Col, Divider, Icon, Row, message } from "antd";
import profile from "../../../static/images/k.jpg";
import Style from "./profile.style";
import IntlMessages from "utils/intlMessages";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import { toJS } from "hoc/toJsHoc";
import * as actions from "./actions";
import * as constants from "./constants";
import Card from "../../../components/uiElements/card";
import avatar from "../../../static/images/avatar.png";
import get from "lodash/get";
import { createUpload } from "containers/upload/upload";
import * as uploadConstants from "containers/upload/constants";
import {createForm} from "containers/form/form";
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import TextArea from "components/uiElements/textArea";
 import Select, { Option } from "components/uiElements/select";
 import isEmpty from "lodash/isEmpty"
import split from 'lodash/split';
import DatePicker from "components/uiElements/datePicker";

class Info extends Component {
    constructor(props) {
        super(props);
        this.profileForm = createForm({
            name: constants.PROFILE,
            url: constants.GET_PROFILE_INFO_URL,
            title: "profile"
        });
        this.avatarUploader = createUpload(constants.PROFILE);
        this.ResumeUploader = createUpload(constants.RESUME);
    }

    componentDidMount() {
        const { getProfileInfo} = this.props;
        getProfileInfo();
    }

    handleSubmit = e => {
        const { EditProfile } = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {

            if (!err) {
                EditProfile(values);
            } else {
                console.log(values, 'new')
            }
        });
    };

    render() {
        //const { TextArea } = Input;
        const AvatarUploader = this.avatarUploader;
        const ResumeUploader = this.ResumeUploader;
         const Form = this.profileForm;
        const {
            initialData,
            uploading,
            loading,
        } = this.props;
       return (
            <Style>
                <img src={profile} className="back-img" alt="profile back" />
                <Card>
                    <Form className="login-form">
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return(
                        <div>
                        <Row>
                            <Col xs={24}  xl={4} >
                                <FormItem className="avatar-uploader">
                                    {isEmpty(get(initialData, "profile_media", ''))
                                        ? fieldDecorator("profile_media", {
                                            initialValue: get(initialData, "profile_media", '')
                                        })
                                        (<AvatarUploader
                                            url={constants.AVATAR_URL}
                                            uploadName="profile_media"
                                            onChanges={value => form.setFieldsValue({
                                                profile_media: value,
                                            })}
                                            currentImage={get(initialData, "profile_media", '')}
                                        />)
                                        : fieldDecorator("profile_media", {
                                            initialValue: split(get(initialData, "profile_media", ''), '/')[6],
                                        })
                                        (<AvatarUploader
                                            url={constants.AVATAR_URL}
                                            uploadName="profile_media"
                                            onChanges={value => form.setFieldsValue({
                                                profile_media: value,
                                            })}
                                            currentImage={get(initialData, "profile_media", '')}
                                        />)
                                    }
                                </FormItem>
                            </Col>

                            <Col className="form-col"  xs={24}  xl={10}  >
                                <FormItem>
                                    {fieldDecorator("name", {
                                        initialValue: get(initialData, "name", ""),
                                        rules: [{ required: true, message: <IntlMessages id="user.signUp.required" /> }],
                                    })(
                                        <Input
                                            onChange={e => form.setFieldsValue({
                                                name: e.target.value,
                                            })}
                                            placeholder="نام  "
                                        />,

                                    )}
                                </FormItem>
                                <FormItem>
                                    {fieldDecorator("family", {
                                        initialValue: get(initialData, "family", ""),
                                        rules: [{ required: true, message: <IntlMessages id="user.signUp.required" /> }],
                                    })(
                                        <Input
                                            onChange={e => form.setFieldsValue({
                                                family: e.target.value,
                                            })}
                                            placeholder="  نام خانوادگی "
                                        />,

                                    )}
                                </FormItem>
                            </Col>
                            <Col className="form-col" xs={24}  xl={10}  >
                                <FormItem>
                                    {fieldDecorator("mobile_number", {
                                        initialValue: get(initialData, "mobile_number", "")
                                    })(
                                        <Input
                                            placeholder="شماره تلفن همراه"
                                            disabled
                                        />,
                                    )}
                                </FormItem>
                                <FormItem>
                                    {fieldDecorator("email", {
                                        initialValue: get(initialData, "email", "")
                                    })(
                                        <Input
                                            placeholder="ایمیل"
                                            disabled
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <h3><IntlMessages id="user.profile.additional.info" /></h3>
                        <Divider/>

                        <Row>
                            <Col xs={24}  xl={6}>
                                <FormItem>
                                    {fieldDecorator("national_code", {
                                        initialValue: get(initialData, "national_code", "")
                                    })(
                                        <Input
                                            placeholder="شماره ملی"
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={24}  xl={6} >
                                <FormItem>
                                    {fieldDecorator("passport_number", {
                                        initialValue: get(initialData, "passport_number", "")
                                    })(
                                        <Input
                                            placeholder="پاسپورت"
                                        />,
                                    )}
                                </FormItem>
                                <p>
                                    <Icon type="star" />
                                    <IntlMessages id="user.profile.info.passport" />
                                </p>
                            </Col>
                            <Col xs={24}  xl={6} >
                                <FormItem>
                                    {!isEmpty(get(initialData, "born_at", ""))
                                        ?
                                    fieldDecorator('born_at', {
                                        initialValue: get(initialData, "born_at", "").replace(/-/g, '/').slice(0, 10)
                                    })(
                                        <Input
                                            placeholder="تاریخ تولد 1398/01/01"
                                        />,
                                    )
                                        :
                                        fieldDecorator('born_at', {
                                            initialValue: get(initialData, "born_at", "")
                                        })(<Input
                                            placeholder="تاریخ تولد 1398/01/01"
                                        />,
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={24}  xl={6} >
                                <FormItem>
                                    {fieldDecorator('postal_code', {
                                        initialValue: get(initialData, "postal_code", "")
                                    })(
                                        <Input
                                            placeholder="کد پستی"
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24}  xl={6}>
                                <FormItem>
                                    {fieldDecorator('field_of_study', {
                                        initialValue: get(initialData, "field_of_study", "")
                                    })(
                                        <Input
                                            placeholder="رشته تحصیلی"
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={24}  xl={6} >
                                <FormItem>
                                    {fieldDecorator('grade_of_study', {
                                        initialValue: get(initialData, "grade_of_study", "")
                                    })(
                                        <Select placeholder="مقطع تحصیلی">
                                            <Option value="دکترا">دکترا</Option>
                                            <Option value="کارشناسی ارشد">کارشناسی ارشد</Option>
                                            <Option value="کارشناسی">کارشناسی</Option>
                                            <Option value="کاردانی">کاردانی</Option>
                                            <Option value="دیپلم">دیپلم</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col xs={24}  xl={6} >
                                <FormItem>
                                    {fieldDecorator('working_status', {
                                        initialValue: get(initialData, "working_status", "")
                                    })(
                                        <Input
                                            placeholder="وضعیت کاری"
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col sxs={24}  xl={6} >
                                <FormItem>
                                    {fieldDecorator('city_address', {
                                        initialValue: get(initialData, "city_address", "")
                                    })(
                                        <Input
                                            placeholder=" شهر محل سکونت"
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                            {fieldDecorator('address', {
                                initialValue: get(initialData, "address", ""),
                            })(
                                <TextArea
                                    placeholder="آدرس محل سکونت"
                                    rows={8}
                                />,
                            )}
                        </FormItem>
                        <h3><IntlMessages id="user.profile.optional.info" /></h3>
                        <Divider/>
                        <p>
                            <Icon type="star" />
                            <IntlMessages id="user.profile.info.desc" />
                        </p>
                        <FormItem>
                            {fieldDecorator('about_me', {
                                initialValue: get(initialData, "about_me", "")
                            })(
                                <TextArea
                                    placeholder="درباره من"
                                    rows={8}
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {fieldDecorator('skills', {
                                initialValue: get(initialData, "skills", "")
                            })(
                                <TextArea
                                    placeholder="مهارت های من"
                                    rows={6}
                                />,
                            )}
                        </FormItem>
                            <FormItem className="resume-btn">
                                {isEmpty(get(initialData, "cv_media", ''))
                                    ? fieldDecorator("cv_media", {
                                        initialValue: get(initialData, "cv_media", '')
                                    })
                                    (<ResumeUploader
                                        url={constants.RESUME_URL}
                                        uploadName="resume"
                                        onChanges={value => form.setFieldsValue({
                                            cv_media: value,
                                        })}
                                        currentImage={get(initialData, "cv_media", '')}
                                    />)
                                    : fieldDecorator("cv_media", {
                                        initialValue: split(get(initialData, "cv_media", ''), '/')[6],
                                    })
                                    (<ResumeUploader
                                        url={constants.RESUME_URL}
                                        uploadName="resume"
                                        onChanges={value => form.setFieldsValue({
                                            cv_media: value,
                                        })}
                                        currentImage={get(initialData, "cv_media", '')}
                                    />)
                                }
                            </FormItem>

                            <Button
                                className="btn btn-primary shadow-2"
                                type="primary"
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                <IntlMessages id="user.dashboard.save" />
                            </Button>
                        </div>
                        );
                        }}
                    </Form>
                </Card>
            </Style>
        );
    }
}
Info.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    EditProfile: actions.EditProfile,
    getProfileInfo: actions.getProfileInfo
};
const mapStateToProps = state => ({
    initialData: state.getIn([constants.PROFILE , "info"], {}),
    loading: state.getIn(["loading", constants.PROFILE, "status"], false),
    uploading: state.getIn(
        [uploadConstants.UPLOAD, `${constants.PROFILE}_loading`],
        false
    )
});
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(toJS(Form.create(`FORM_${constants.PROFILE}`)(Info)));
export default connect(mapStateToProps,mapDispatchToProps)(toJS(Info));