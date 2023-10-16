import React from "react";
import { Layout } from "antd";
import { Link } from "gatsby";
import { Menu } from "antd";
import { Col, Row, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logocom from "../../../../assets/images/Logocom.png";
import PostDelete from "../../../../components/PostDelete";

const { Content } = Layout;

const DeletePage = (params) => {
  const { id } = params;
  console.log(id);
  const array = [
    { name: "Admin", url: "/admin/admin" },
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/" },
    { name: "Post Questions", url: "/post" },
    { name: "About Us", url: "/about" },
    { name: "How it works", url: "/how" },
    { name: "Services", url: "/service" },
    { name: "Pricing", url: "/pricing" },
    { name: "Terms and Conditions", url: "/terms" },
  ];
  return (
    <>
      <header
        style={{
          padding: "0",
          height: "90px",
          background: "#272930",
          margin: "-8px",
        }}
      >
        <Row>
          <Col
            xs={{ span: 2, offset: 1 }}
            sm={{ span: 2, offset: 1 }}
            md={{ span: 2, offset: 1 }}
            lg={{ span: 2, offset: 1 }}
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
            <Menu
              theme="white"
              mode="horizontal"
              style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
              md={{ gap: "3px" }}
              items={array.map((item, index) => {
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
          </Col>
          <Col
            xs={{ span: 2, offset: 17 }}
            sm={{ span: 2, offset: 16 }}
            md={{ span: 2, offset: 16 }}
            lg={{ span: 0 }}
            xl={{ span: 0 }}
            style={{ paddingTop: "30px" }}
          >
            <Dropdown
              trigger={["click"]}
              menu={{
                items: array.map((item, index) => ({
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
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
      <Content
        style={{
          paddingTop: "70px",
        }}
      >
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 18, offset: 3 }}
            lg={{ span: 16, offset: 4 }}
          >
            <PostDelete id={id}></PostDelete>
          </Col>
        </Row>
      </Content>
    </>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>delete</title>;

// Step 3: Export your component
export default DeletePage;
