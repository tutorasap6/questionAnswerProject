import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { Col, Row } from "antd";
import logocom from "../assets/images/logocom.png";
import { Link } from "gatsby";
import backimg from "../assets/images/action.png";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { MenuOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";

// const { Search } = Input;
const { Footer } = Layout;

const MainLayout = ({ pageTitle, children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!localStorage.token) setAuthorized(false);
    else {
      const token = localStorage.token;
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${process.env.api_url}/api/auth`, {
            headers: { "x-auth-token": token },
          });
          setUser(res.data);
          setAuthorized(true);
        } catch (e) {
          console.log(e);
          localStorage.removeItem("token");
        }
      };
      fetchUser();
    }
  }, []);

  // const navbarArray = ["Home", "AboutUs", "How To Work"]
  const unauthorizedArray = [
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solution" },
    { name: "About Us", url: "/about" },
    { name: "How it works", url: "/how" },
    { name: "Services", url: "/service" },
    { name: "Pricing", url: "/pricing" },
    { name: "Terms and Conditions", url: "/terms" },
    { name: "Post Project", url: "/auth/login" },
  ];

  const authorizedArray = [
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solution" },
    { name: "Post Questions", url: "/post" },
    { name: "About Us", url: "/about" },
    { name: "How it works", url: "/how" },
    { name: "Services", url: "/service" },
    { name: "Pricing", url: "/pricing" },
    { name: "Terms and Conditions", url: "/terms" },
    { name: "Logout", url: "/logout" },
  ];
  if (user?.role === "admin")
    authorizedArray.unshift({ name: "Admin", url: "/admin/admin" });

  return (
    <Layout className="layout" style={{ margin: "-8px" }}>
      <ToastContainer />
      <header
        style={{
          padding: "0",
          height: "90px",
          background: "#272930",
        }}
      >
        <Row>
          <Col
            xs={{ span: 2, offset: 1 }}
            sm={{ span: 2, offset: 3 }}
            md={{ span: 2, offset: 3 }}
            lg={{ span: 2, offset: 3 }}
            style={{
              display: "flex",
              paddingTop: "10px",
            }}
          >
            <a href="/" style={{ margin: "0 auto" }}>
              <img src={logocom} alt="logo" height="40%" />
            </a>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={{ span: 0 }}
            lg={19}
            xl={{ span: 19 }}
            style={{ paddingTop: "30px", paddingRight: "30px" }}
          >
            {authorized ? (
              <Menu
                theme="white"
                mode="horizontal"
                style={{
                  minWidth: 0,
                  flex: "auto",
                  justifyContent: "flex-end",
                }}
                md={{ gap: "3px" }}
                items={authorizedArray.map((item, index) => {
                  const key = index + 1;
                  return {
                    key,
                    label: (
                      <Link to={item.url}>
                        <span
                          style={{
                            fontFamily: "awesome",
                            color: "white",
                            fontSize: "16px",
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ),
                  };
                })}
              />
            ) : (
              <Menu
                theme="white"
                mode="horizontal"
                style={{
                  minWidth: 0,
                  flex: "auto",
                  justifyContent: "space-evenly",
                }}
                items={unauthorizedArray.map((item, index) => {
                  const key = index + 1;
                  return {
                    key,
                    label: (
                      <Link to={item.url}>
                        <span
                          style={{
                            marginLeft: "5px",
                            fontFamily: "awesome",
                            color: "white",
                            fontSize: "16px",
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ),
                  };
                })}
              />
            )}
          </Col>
          <Col
            xs={{ span: 2, offset: 17 }}
            sm={{ span: 2, offset: 16 }}
            md={{ span: 2, offset: 16 }}
            lg={{ span: 0 }}
            xl={{ span: 0 }}
            style={{ paddingTop: "30px" }}
          >
            {authorized ? (
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: authorizedArray.map((item, index) => ({
                    key: index + 1,
                    label: (
                      <Link to={item.url}>
                        <span
                          style={{
                            fontFamily: "awesome",
                            color: "black",
                            fontSize: "16px",
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ),
                  })),
                }}
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  <MenuOutlined />
                </a>
              </Dropdown>
            ) : (
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: unauthorizedArray.map((item, index) => {
                    const key = index + 1;
                    return {
                      key,
                      label: (
                        <Link to={item.url}>
                          <span
                            style={{
                              marginLeft: "5px",
                              fontFamily: "awesome",
                              color: "black",
                              fontSize: "16px",
                            }}
                          >
                            {item.name}
                          </span>
                        </Link>
                      ),
                    };
                  }),
                }}
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  <MenuOutlined />
                </a>
              </Dropdown>
            )}
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
      <div
        style={{
          backgroundImage: `url( ${backimg})`,
          backgroundSize: "cover",
          height: "180px",
        }}
      >
        <Row>
          <Col span={4}></Col>
          <Col span={8} style={{ paddingTop: "40px" }}></Col>
          <Col span={8}></Col>
          <Col span={4}></Col>
        </Row>
      </div>
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>{children}</div>
      <Footer
        style={{
          textAlign: "center",
          margin: "-8px",
          width: "100vw",
          background: "rgb(26,28,33)",
          padding: "1px",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            // height: "300px",
            paddingTop: "3px",
          }}
        >
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            xl={{ span: 6 }}
          >
            <h4
              style={{
                fontFamily: "awesome",
                color: "white",
                fontSize: "20px",
                // paddingLeft: "30px",
              }}
            >
              About us
            </h4>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <a
                  href="/"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                  }}
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/service"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            xl={{ span: 6 }}
            style={{ background: "rgb(26,28,33)" }}
          >
            <h4
              style={{
                fontFamily: "awesome",
                color: "white",
                fontSize: "20px",
                // paddingLeft: "30px",
              }}
            >
              Legal Stuff
            </h4>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <a
                  href="#"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  Team of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  Pricing
                </a>
              </li>
            </ul>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            xl={{ span: 6 }}
            style={{ background: "rgb(26,28,33)" }}
          >
            <h4
              style={{
                fontFamily: "awesome",
                color: "white",
                fontSize: "20px",
                // paddingLeft: "50px",
              }}
            >
              Help
            </h4>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <a
                  href="#"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  knowledge Base
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    fontFamily: "awesome",
                    color: "#707885",
                    fontSize: "14px",
                  }}
                >
                  Advanced Payment
                </a>
              </li>
            </ul>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            xl={{ span: 24 }}
            style={{ background: "rgb(26,28,33)" }}
          >
            <div
              style={{
                background: "rgb(26,28,33)",
                display: "flex",
                justifyContent: "center",
                height: "100px",
                borderTop: "1px solid #212328",
                marginTop: "0.2px",
              }}
            >
              <h2
                style={{
                  fontFamily: "awesome",
                  color: "#707885",
                  fontSize: "18px",
                  margin: "30px",
                  marginLeft: "0px",
                  textAlign: "center",
                }}
              >
                ©2023 Champlain Solutions
              </h2>
            </div>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};
export default MainLayout;
