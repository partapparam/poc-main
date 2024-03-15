import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Space, Divider, Checkbox } from "antd";
import loginPageImage from "../../../assets/images/loginpageImage.png";
// import ICPlogo from "../../../assets/images/ICPlogo.png";
import gtmcopilotLogo from "../../../assets/images/iCustomer_logo.png";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import crypto from "crypto-js";
import "./SignUp.css";
import { RegisterUser } from "../../../services/AuthServices";
import Toaster from "../../../components/Toaster/Toaster";
import GoogleAuth from "../../../components/GoogleAuth/GoogleAuth";
import { UserDetails, commonMail } from "../../../helpers/helpers";
import ShowModal from "../../../components/Modal/Modal";

const SignUp = ({setIsLoggedIn}) => {

  const userDetails = UserDetails();
  const isLoggedIn = userDetails?.id ? true : false;

  if (isLoggedIn) {
    // history.push('/explore-audience');
  };

  const { Title, Text } = Typography;
  const { Header, Footer, Content } = Layout;

  const [CheckBox, setCheckBox] = useState(false);

  const [ShowToaster, setShowToaster] = useState(false);
  const [ShowToasterContent, setShowToasterContent] = useState({});

  const [Modal, setModal] = useState(false);
  const [ModalContent, setModalContent] = useState({});


  const handleCheckBox = (e) => {
    setCheckBox(e.target.checked)
  }

  const validate = (values) =>{
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;

    if(values.email && !emailRegex.test(values.email)){
      isValid = false;
      setShowToaster(true);
      setShowToasterContent({
        type: 'error',
        content: 'Please enter a valid email address'
      })
    }

    if(values.email && commonMail.includes(values.email.split('@')[1])){
      isValid = false;
      setShowToaster(true);
      setShowToasterContent({
        type: 'error',
        content: 'User with Business Email are allowed to register'
      })
    }

    if(values.password && values.password.length < 8){
      isValid = false;
      setShowToaster(true);
      setShowToasterContent({
        type: 'error',
        content: 'Password must be more than 8 characters'
      })
    }

    if(values.confirmPassword && values.confirmPassword.length < 8){
      isValid = false;
      setShowToaster(true);
      setShowToasterContent({
        type: 'error',
        content: 'Confirm password must be more than 8 characters'
      })
    }

    if(values.password !== values.confirmPassword){
      isValid = false;
      setShowToaster(true);
      setShowToasterContent({
        type: 'error',
        content: 'Password & confirm password must be same'
      })
    }

    if(!CheckBox){
      isValid = false;
      setShowToaster(true);
      setShowToasterContent({
        type: 'error',
        content: 'Please accept the terms & condition'
      })
    }

    return isValid;
  }

  const onFinish= async (values) => {
    let isValid = validate(values);
    if(isValid){
      let Register = await RegisterUser({
        email: values.email,
        password: crypto.MD5(values.password).toString(),
        username: values.email,
        organization_name: values.email.split('@')[1].replace('.', ' '),
        organization_domain: values.email.split('@')[1],
        name: values.email.split('@')[0],
      });

      if(Register.data){
        setShowToaster(true);
        setShowToasterContent({
          type: Register.data.status,
          content: Register.data.message
        })
      }

      if(Register.data.status === 'success'){
        setModal(true);
        setModalContent({
          content: 'Your registration was successfull, please check your mail to verify your account.',
          title: 'Registered Successfully',
          closeAction: '/login',
          okAction: '/login',
          btnText: 'Return to Login page'
        })
      }
    }
  }

  return (
    <>
      {Modal ?
        <>
          <ShowModal props={ModalContent} />
        </> :
        <>
          {ShowToaster && <Toaster props={ShowToasterContent}  />}
          <Row className={'h-screen mainClass bg-[#f2f2f2] 2xl:overflow-hidden'}>
            <Col span={12} xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} >
              <Space direction="vertical" className={'w-full'}>
                <Layout className={'bg-[#f2f2f2] xl:px-12 lg:px-0 py-0 xl:gap-y-6 lg:gap-y-6 md:gap-y-6 sm:gap-y-6'} style={{ backgroundColor: '#f2f2f2' }}>
                <Header className={"bg-[#f2f2f2] p-[0]"}>
                <Row className={"flex"} style={{alignItems: "center"}}>
                  <Col span={6}>
                    <img
                      className={"brandlogo"}
                      src={gtmcopilotLogo}
                      alt=""
                    />
                  </Col>
                  <Col span={18}>
                    <div className={"flex justify-end"}>
                      <p>
                        <span>Already a member?</span>
                        <Link to="/login" className={"ml-2.5 text-[#609DA1]"}>
                          Log in
                        </Link>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Header>
                  <Content className={'py-0 px-12'}>
                    <Row className={'flex-col'}>
                      <Col span={24} className="gutter-row">
                        <Title className={'text-center'}>Sign Up</Title>
                      </Col>
                      <Col span={24} className="gutter-row text-center mb-2">
                        <Text type={'secondary'}>Welcome to GTM COPILOT!</Text>
                      </Col>
                        <Form layout="vertical" onFinish={onFinish}>
                        <Col span={24} style={{ textAlign: 'center' }} className="gutter-row">
                          <Form.Item
                            label="Email"
                            name="email"
                            style={{ width: "80%", textAlign: 'center' ,display: 'inline-block' }}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your email'
                              }
                            ]}
                          >
                            <Input placeholder="info@yourmail.com" style={{borderRadius: "60px" , padding: '11px'}} type={"email"} prefix={<MailOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }} className="gutter-row">
                          <Form.Item
                            label="Password"
                            name="password"
                            style={{ width: "80%", textAlign: 'center' ,display: 'inline-block' }}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter password'
                              }
                            ]}
                          >
                            <Input placeholder="Enter your password" style={{borderRadius: "60px", padding: '11px'}} type={"password"} prefix={<LockOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col span={24} style={{ textAlign: 'center' }} className="gutter-row">
                          <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            style={{ width: "80%", textAlign: 'center', display: 'inline-block' }}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter password'
                              }
                            ]}
                          >
                            <Input placeholder="Enter your password" style={{borderRadius: "60px", padding:'11px'}} type={"password"} prefix={<LockOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col span={24} style={{ width: "80%", textAlign: 'center', display: 'inline-block', left: '10%' }} className="gutter-row">
                          <Form.Item name="privacyPolicy" className={'text-start'}>
                            <Checkbox checked={CheckBox} onChange={handleCheckBox}>
                              I agree to {" "}
                              <Link 
                                to="https://gtmcopilot.com/privacy-policy-2/" 
                                target="_blank"
                                className="text-[#609DA1]"
                              >
                                Privacy Policy
                              </Link> 
                              {" "}and{" "} 
                              <Link 
                                to="https://gtmcopilot.com/terms-and-conditions/" 
                                target="_blank"
                                className="text-[#609DA1]"
                              >
                                Terms & Conditions
                              </Link>
                            </Checkbox>
                          </Form.Item>
                        </Col>
                        <Col span={24} style={{textAlign: 'center'}} className="gutter-row signup-input-btn">
                          <Form.Item style={{ width: "80%", textAlign: 'center', display: 'inline-block' }}>
                            <Button type="primary" style={{borderRadius: "60px", height: '40px'}} htmlType={"submit"} className={'w-full'}>Sign Up</Button>
                          </Form.Item>
                        </Col>
                        </Form>
                      <Divider plain className={''}>or</Divider>
                      <Col span={24} className="gutter-row mt-6">
                        <GoogleAuth setIsLoggedIn={setIsLoggedIn}/>
                      </Col>
                    </Row>
                  </Content>
                  <Footer className={'bg-[transparent]'}>
                    <Row>
                      <Col span={24} className={'text-center pb-2'}>
                        <p>© All Rights Reserved to GTM COPILOT</p>
                      </Col>
                    </Row>
                  </Footer>
                </Layout>
              </Space>
            </Col>
            <Col span={12} xs={0} sm={12} md={12} lg={12} xl={12} xxl={12} >
              <img src={loginPageImage} alt="" className={'w-full h-full'}/>
            </Col>
          </Row>
        </>
      }
    </>
  );
}

export default SignUp;