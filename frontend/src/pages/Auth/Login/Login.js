import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Space,
  Divider,
  Checkbox,
} from "antd";
import loginPageImage from "../../../assets/images/loginpageImage.png";
import gtmcopilotLogo from "../../../assets/images/iCustomer_logo.png";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import crypto from "crypto-js";
import "./Login.css";
import { LoginUser } from "../../../services/AuthServices";
import Toaster from "../../../components/Toaster/Toaster";
import GoogleAuth from "../../../components/GoogleAuth/GoogleAuth";
import { UserDetails, commonMail } from "../../../helpers/helpers";
import { useLocation } from "react-router-dom";

const LogIn = ({setIsLoggedIn}) => {
  // const history = useHistory();
  const navigate = useNavigate();

  const userDetails = UserDetails();
  const isLoggedIn = userDetails?.id ? true : false;
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const nextUrl = queryParams.get("next");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/ssot");
    }
  }, )
  

  const { Title, Text } = Typography;
  const { Header, Footer, Content } = Layout;

  const [CheckBox, setCheckBox] = useState(false);

  const [ShowToaster, setShowToaster] = useState(false);
  const [ShowToasterContent, setShowToasterContent] = useState({});

  const handleCheckBox = (e) => {
    setCheckBox(e.target.checked);
  };

  const validate = (values) => {
    let isValid = true;

    if (commonMail.includes(values.email.split("@")[1])) {
      isValid = false;
      setShowToaster(true);
      setShowToasterContent({
        type: "error",
        content: "User with Business Email are allowed to login",
      });
    }

    return isValid;
  };

  const onFinish = async (values) => {
    let isValid = validate(values);
    if (isValid) {
      let Login = await LoginUser({
        email: values.email,
        password: crypto.MD5(values.password).toString(),
        rememberMe: CheckBox,
      });

      if (Login.data) {
        setShowToaster(true);
        setShowToasterContent({
          type: Login.data.status,
          content: Login.data.message,
        });
      }

      if (Login.data.status === "success") {
        setTimeout(() => {
          navigate('/ssot')
          localStorage.setItem("user", JSON.stringify(Login?.data?.data));
          setIsLoggedIn(true);
          // let response = await ChatDetails(Login?.data?.data?.id)
          // localStorage.setItem("redirectID", response?.data[0]?.id)
        }, 2000);
      }
    }
  };

  return (
    <>
      {ShowToaster && <Toaster props={ShowToasterContent} />}
      <Row className={" bg-[#f2f2f2] 2xl:overflow-hidden dummy"}>
        <Col className="w-[60%]" span={12} xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Space direction="vertical" className={"w-full"}>
            <Layout
              className={
                "bg-[#f2f2f2] xl:px-12 lg:px-0 py-0 login-div lg:gap-y-0 md:gap-y-0 sm:gap-y-20 max-sm:gap-y-20"
              }
              style={{ backgroundColor: "#f2f2f2" }}
            >
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
                        <span>New to GTM?</span>
                        <Link to="/sign-up" className={"ml-2.5 text-[#609DA1]"}>
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Header>
              <Content className={"py-0 px-12"}>
                <Row className={"flex-col"}>
                  <Col span={24} className="gutter-row">
                    <Title className={"text-center login-text"}>Login</Title>
                  </Col>
                  <Col span={24} className="gutter-row text-center mb-2 lg:mb-1">
                    <Text type={"secondary"}>
                      Login using your organization's credentials
                    </Text>
                  </Col>
                  <Form layout="vertical" onFinish={onFinish}>
                    <Col span={24} style={{ textAlign: 'center' }} className="gutter-row login-input">
                      <Form.Item
                        label="Email"
                        name="email"
                        style={{ width: "80%", textAlign: 'center', display: 'inline-block' }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                        ]}
                      >
                        <Input
                          placeholder="info@yourmail.com"
                          type={"email"}
                          prefix={<MailOutlined />}
                          style={{borderRadius: "60px", padding: "11px"}}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} style={{ textAlign: 'center' }} className="gutter-row login-input">
                      <Form.Item
                        label="Password"
                        name="password"
                        style={{ width: "80%", textAlign: 'center', display: 'inline-block' }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter password",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your password"
                          type={"password"}
                          prefix={<LockOutlined />}
                          style={{borderRadius: "60px", padding: "11px"}}
                        />
                      </Form.Item>
                    </Col>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 10%' }}>
                    <Col span={24} style={{ width: "80%", textAlign: 'center', display: 'inline-block' }} className="gutter-row login-input">
                      <Row>
                        <Col span={12}>
                          <Form.Item name="rememberMe" className={"text-start"}>
                            <Checkbox
                              checked={CheckBox}
                              onChange={handleCheckBox}
                            >
                              Keep me signed in
                            </Checkbox>
                          </Form.Item>
                        </Col>
                        <Col span={12} className={"text-end"}>
                          <Link to={"/forgot-password"} className="text-[#609DA1]">Forgot Password?</Link>
                        </Col>
                      </Row>
                    </Col>
                  </div>

                    <Col span={24} style={{left: '10%'}} className="gutter-row login-input login-input-btn">
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType={"submit"}
                          className={"w-full"}
                          style={{ borderRadius: "60px", height: "40px", width: "80%" }}
                        >
                          Login
                        </Button>
                      </Form.Item>
                    </Col>

                  </Form>
                  <Divider plain className={"divider"}>
                    or
                  </Divider>
                  <Col span={24} className="gutter-row mt-8">
                    <GoogleAuth setIsLoggedIn={setIsLoggedIn}/>
                  </Col>
                </Row>
              </Content>
              <Footer className={"bg-[transparent]"}>
                <Row>
                  <Col span={24} className={"text-center pb-2"}>
                    <p>© All Rights Reserved to GTM COPILOT</p>
                  </Col>
                </Row>
              </Footer>
            </Layout>
          </Space>
        </Col>
        <Col span={12} xs={0} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <img
            src={loginPageImage}
            alt=""
            className={"w-full object-contain"}
          />
        </Col>
      </Row>
    </>
  );
};

export default LogIn;
