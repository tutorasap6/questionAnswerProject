// Step 1: Import React
import * as React from "react";
import MainLayout from "../components/MainLayout";
import { Breadcrumb, Layout } from "antd";
import SubPricingBlog from "../components/SubPricingBlog";
import { Card, Col, Row } from "antd";

const { Content } = Layout;

const PricingPage = () => {
  return (
    <MainLayout pageTitle="Pricing">
      <Content
        style={{
          paddingTop: "10px",
          paddingBottom: "3px",
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
        xs={{span:22,offset:1}}
        sm={{ span: 15, offset: 2 }}
        md={{ span:15, offset:3 }}
        lg={{ span: 15, offset: 4 }} 
        >
          <Breadcrumb
            style={{
              paddingTop: "10px",
            }}
          >
            <Breadcrumb.Item>
              <p style={{ fontFamily: "awesome", marginTop: "0px" }}>Home</p>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <p style={{ fontFamily: "awesome", marginTop: "0px" }}>pricing</p>
            </Breadcrumb.Item>
          </Breadcrumb>
          </Col>
          </Row>
        </div>
        <Row>
          <Col 
          xs={{span:22,offset:1}}
          sm={{ span: 20, offset: 2 }}
          md={{ span:18, offset:3 }}
          lg={{ span: 16, offset: 4 }}>
            <Card style={{ padding: "5px" }}>
              <Row>
                <Col xs={24} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
                  <SubPricingBlog price="Full classes">
                    <h2
                      className="title h4"
                      style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      Essays & Papers
                    </h2>
                    <p style={{ marginLeft: "-10px", textAlign: "center" }}>
                      Starting at
                    </p>
                    <h3 style={{ textAlign: "center", fontFamily: "awesome" }}>
                      $30 <span>/final</span>
                    </h3>
                    <p style={{ textAlign: "center" }}>Guaranteed ‘A’ or ‘B’</p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      The Best Experts
                    </p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      Experts base on USA
                    </p>
                  </SubPricingBlog>
                </Col>
                <Col xs={24} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
                  <SubPricingBlog price="Full classes">
                    <h2
                      className="title h4"
                      style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      Projects
                    </h2>
                    <p style={{ marginLeft: "5px", textAlign: "center" }}>
                      Starting at
                    </p>
                    <h3
                      style={{
                        marginLeft: "-20px",
                        marginTop: "-5px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      $100 <span>/final</span>
                    </h3>
                    <p style={{ textAlign: "center" }}>Guaranteed ‘A’ or ‘B’</p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      The Best Experts
                    </p>
                  </SubPricingBlog>
                </Col>
                <Col xs={24} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
                  <SubPricingBlog price="Full classes">
                    <h2
                      className="title h4"
                      style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      Homework
                    </h2>
                    <p style={{ marginLeft: "10px", textAlign: "center" }}>
                      Starting at
                    </p>
                    <h3
                      style={{
                        marginLeft: "-20px",
                        marginTop: "-5px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      $30 <span>/final</span>
                    </h3>
                    <p style={{ textAlign: "center" }}>Guaranteed ‘A’ or ‘B’</p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      All Subjects Offered
                    </p>
                  </SubPricingBlog>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={12} lg={8} xl={8}  style={{ padding: "10px" }}>
                  <SubPricingBlog price="Full classes">
                    <h2
                      className="title h4"
                      style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      Full Classes
                    </h2>
                    <p style={{ marginLeft: "10px", textAlign: "center" }}>
                      Starting at
                    </p>
                    <h3
                      style={{
                        marginLeft: "-20px",
                        marginTop: "-5px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      $100 <span>/week</span>
                    </h3>
                    <p style={{ textAlign: "center" }}>Guaranteed ‘A’ or ‘B’</p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      Status Update
                    </p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      Payment Plans Available
                    </p>
                  </SubPricingBlog>
                </Col>
                <Col xs={24} md={12} lg={8} xl={8}  style={{ padding: "10px" }}>
                  <SubPricingBlog price="Full classes">
                    <h2
                      className="title h4"
                      style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      Tests & Quizzes
                    </h2>
                    <p style={{ marginLeft: "5px", textAlign: "center" }}>
                      Starting at
                    </p>
                    <h3
                      style={{
                        marginLeft: "-20px",
                        marginTop: "-5px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      $50 <span>/quiz or test</span>
                    </h3>
                    <p style={{ textAlign: "center" }}>Guaranteed ‘A’ or ‘B’</p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      Quick Turnaround
                    </p>
                  </SubPricingBlog>
                </Col>
                <Col xs={24} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
                  <SubPricingBlog price="Full classes">
                    <h2
                      className="title h4"
                      style={{
                        marginTop: "15px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      Finals
                    </h2>
                    <p style={{ marginLeft: "10px", textAlign: "center" }}>
                      Starting at
                    </p>
                    <h3
                      style={{
                        marginLeft: "15px",
                        marginTop: "-5px",
                        textAlign: "center",
                        fontFamily: "awesome",
                      }}
                    >
                      $120 <span>/final</span>
                    </h3>
                    <p style={{ textAlign: "center" }}>Guaranteed ‘A’ or ‘B’</p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      The Best Experts
                    </p>
                  </SubPricingBlog>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        ></div> */}
      </Content>
    </MainLayout>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>pricing</title>;

// Step 3: Export your component
export default PricingPage;
