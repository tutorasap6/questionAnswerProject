// Step 1: Import React
import React, { useState, useEffect } from "react";
import { get } from "axios";
import MainLayout from "../components/MainLayout";
import { Breadcrumb, Layout } from "antd";
import { Card, Col, Row } from "antd";

// Step 2: Define your component
const { Content } = Layout;
const HowPage = () => {
  const [content, setContent] = useState("");

  useEffect(
    function () {
      async function getPage() {
        try {
          console.log("456");
          const response = await get(`${process.env.api_url}/api/page/`);
          console.log("334");
          // setTemp(response.data[0].about);
          console.log(response.data);
          setContent(response.data[0].how);
          console.log(content);
        } catch (error) {
          console.log(error);
        }
      }
      getPage();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <MainLayout pageTitle="how it works">
      <Content
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            height: "40px",
            // background: "rgb(52,120,255)",
            width: "100%",
            // borderBottom: "0.2px solid rgba(255,255,255,.8)",
            //   borderBottom: "0.2px solid rgba(52,120,255,.8)",
            borderBottom: "0.2px solid rgba(111,111,110,.8)",
          }}
        >
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              sm={{ span: 15, offset: 2 }}
              md={{ span: 15, offset: 3 }}
              lg={{ span: 15, offset: 4 }}
            >
              <Breadcrumb
                style={{
                  //   margin: "16px 0",
                  paddingTop: "10px",
                }}
              >
                <Breadcrumb.Item>
                  <p style={{ fontFamily: "awesome", marginTop: "0px" }}>
                    Home
                  </p>
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item>list</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}

                <Breadcrumb.Item>
                  <p style={{ fontFamily: "awesome", marginTop: "0px" }}>
                    How it works
                  </p>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </div>
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 18, offset: 3 }}
            lg={{ span: 16, offset: 4 }}
          >
            <Card style={{ padding: "5px" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 mx-auto">
                    <div
                      className="content"
                      style={{ fontFamily: "awesome" }}
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={4}></Col>
        </Row>
      </Content>
    </MainLayout>
  );
};

export const Head = () => (
  <>
    <title>How it works</title>
    <meta name="description" content="Your description" />
  </>
);
export default HowPage;
