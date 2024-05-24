/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/images/banner.jpg";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { apiPost } from "../api/apiCommon";
import baseURL from "../base";
import config from "../config";
import { setLoggedInuser } from "../api/apiCommon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import login from '../Features/UserGlobe'
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import "../Style.css";
// function onChange(checked) {
//   console.log(`switch to ${checked}`);
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     signIn: () => dispatch(login())
//   }
// };



toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
});
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const template = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const profile = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const signup = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const signin = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      className="fill-muted"
      d="M12.25,14H1.75A1.752,1.752,0,0,1,0,12.25V3.5A1.752,1.752,0,0,1,1.75,1.75h.876V.875a.875.875,0,0,1,1.75,0V1.75h5.25V.875a.875.875,0,0,1,1.75,0V1.75h.875A1.752,1.752,0,0,1,14,3.5v8.75A1.752,1.752,0,0,1,12.25,14ZM3.5,4.375a.875.875,0,0,0,0,1.75h7a.875.875,0,0,0,0-1.75Z"
    />
  </svg>,
];
export default class SignIn extends Component {

  render() {
    const loginheaderstyle = {
      color: "rgb(229 231 9)",
      textAlign: "center",
      // fontWeight: "600",
      // fontFamily: "math",
      fontVariantCaps: "all-petite-caps",
      // boxShadow: "0px 1px 1px 1px black"
    };



    const OnFinish = async (values) => {
      // const dispatch = useDispatch();
      try {
        let response = await apiPost(baseURL + config.login, values);
        console.log(response)
        if (response.data.status === true && response.data.message !== "Password Mismatch") {
          if (response.data.data.user.roleUID == "1" || response.data.data.user.roleUID == "8" || response.data.data.user.roleUID == "9" || response.data.data.user.roleUID == "10" || response.data.data.user.roleUID == "11" || response.data.data.user.roleUID == "13") {
            setLoggedInuser(
              response.data.data.user,
              response.data.data.authorisation.token,
              response.data.data.roleMenus
            );

            routescontrol()
            toast.success(response.data.message);
            // this.props.signIn(response.data.data.user)
            // this.props.signIn(response.data.data.user)
          } else {
            toast.error("User not authorized to login");
            this.props.history.push("/");
          }


        } else if (response.data.status === false) {
          // console.log(response.data.status)
          toast.warning(response.data.message);
          // routescontrol()
          this.props.history.push("/admin");
        } else {
          toast.error("Please enter the correct password");
          this.props.history.push("/");
        }
      } catch (error) {
        if (error.errorAPI === true) {
          toast.error("Please try again later")
          this.props.history.push("/");
        }
      }
    };
    const routescontrol = () => {
      const userString = sessionStorage.getItem("Audit_user");
      const user = JSON.parse(userString);
      switch (user.roleUID) {
        case "1":
          this.props.history.push("/admin/master/dashboard");
          break;
        case "8":
          this.props.history.push("/admin/food/dashboard");
          break;
        case "9":
          this.props.history.push("/admin/property/dashboard");
          break;
        case "10":
          this.props.history.push("/admin/dm/dashboard");
          break;
        case "11":
          this.props.history.push("/admin/security/dashboard");
          break;
        case "13":
          this.props.history.push("/admin/superadmin/dashboard");
          break;
        default:
          break;
      }
    }
    const onFinishFailed = (errorInfo) => {
      // console.log("Failed:", errorInfo);
    };
    return (
      <>
        <div>
          <Layout className="layout-default layout-signin">
            <div
              style={{
                backgroundImage: `url(${banner})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
                zIndex: "1",
                // borderRadius: "25px",
                // boxShadow: "1px 1px 5px 2px"
              }}
            >
              <Content className="signin" style={{ opacity: "50" }}>
                <Row
                  gutter={[24, 0]}
                  justify="space-around"
                  style={{ zIndex: "1" }}
                >
                  <Col
                    className="resmob"
                    xs={{ span: 24, offset: 0 }}
                    lg={{ span: 6, offset: 2 }}
                    md={{ span: 12 }}
                    style={{
                      backgroundColor: "#8c8c8c8f",
                      borderRadius: "10px",
                      boxShadow: "1px 1px 10px 5px rgb(20 20 1)",
                      top: "62px",
                    }}
                  >
                    <Title className="mb-15" style={loginheaderstyle}>
                      Login
                    </Title>
                    <Title
                      className="font-regular text-muted"
                      level={5}
                      style={{
                        color: "black",
                        // fontWeight: "600",
                        marginLeft: "22px"
                      }}
                    >
                      Enter your email and password
                    </Title>
                    <Form
                      onFinish={OnFinish}
                      onFinishFailed={onFinishFailed}
                      layout="vertical"
                      className="row-col"
                    >
                      <Form.Item
                        style={{ paddingLeft: "12px", paddingRight: "12px", fontWeight: "300" }}
                        className="username"
                        label="Email"
                        name="userName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email"
                        // style={{ backgroundColor: "transparent" }}
                        />
                      </Form.Item>

                      <Form.Item
                        style={{ paddingLeft: "12px", paddingRight: "12px" }}
                        className="username"
                        label="Password"
                        name="password"
                        // initialValue={"12345678"}
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Password"
                          type="password"
                        // style={{ backgroundColor: "transparent" }}
                        />
                      </Form.Item>

                      {/* <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item> */}

                      <Form.Item >
                        <Button

                          type="primary"
                          htmlType="submit"
                          style={{ width: "100%", opacity: "1", borderRadius: "0px", top: "25px", background: "#1b4884", borderColor: "#181d1f" }}
                        >
                          SIGN IN
                        </Button>
                      </Form.Item>
                      {/* <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p> */}
                    </Form>
                  </Col>
                  {/* <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={banner} alt="" />
              </Col> */}
                </Row>
              </Content>
            </div>

            {/* <Footer>
            <Menu mode="horizontal">
              <Menu.Item>Company</Menu.Item>
              <Menu.Item>About Us</Menu.Item>
              <Menu.Item>Teams</Menu.Item>
              <Menu.Item>Products</Menu.Item>
              <Menu.Item>Blogs</Menu.Item>
              <Menu.Item>Pricing</Menu.Item>
            </Menu>
            <Menu mode="horizontal" className="menu-nav-social">
              <Menu.Item>
                <Link to="#">{<DribbbleOutlined />}</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">{<TwitterOutlined />}</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">{<InstagramOutlined />}</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">
                  <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                  </svg>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="#">{<GithubOutlined />}</Link>
              </Menu.Item>
            </Menu>
            <p className="copyright">
              {" "}
              Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
            </p>
          </Footer> */}
          </Layout>
        </div>
      </>
    );
  }
}
// const ConnectedMain = connect(
//   mapDispatchToProps
// )(SignIn)

// const mapDispatchToProps = (dispatch) => ({
//   signIn: () => dispatch(login())
// });
// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     signIn: () => dispatch(login())
// //   }
// // };


// // export default connect(null, mapDispatchToProps)(SignIn)
// // export default ConnectedMain
// export default connect(
//   mapDispatchToProps()
// )(SignIn);