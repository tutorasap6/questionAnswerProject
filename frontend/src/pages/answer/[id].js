// Step 1: Import React
import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { Breadcrumb, Layout } from "antd";
import AnswerBlog from "../../components/AnswerBlog";
import { Col, Row } from "antd";
import { useEffect } from "react";
import axios from "axios";

// Step 2: Define your component
const { Content } = Layout;
const AnswerPage = (params) => {
  const { id } = params;
  console.log(id);
  const [post, setPost] = useState({});

  useEffect(() => {
    try {
      const getPostById = async () => {
        try {
          const response = await axios.get(
            `${process.env.api_url}/api/posts/${id}`
          );
          setPost(response.data);
        } catch (error) {
          console.log("error", error);
        }
      };
      getPostById();
    } catch (e) {
      throw e;
    }
  }, []);
  return (
    <MainLayout pageTitle="Answer">
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
                    answer
                  </p>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </div>

        <Row style={{ marginTop: "10px" }}>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 18, offset: 3 }}
            lg={{ span: 16, offset: 4 }}
          >
            <AnswerBlog post={post}></AnswerBlog>
          </Col>
        </Row>
      </Content>
    </MainLayout>
  );
};

export const Head = () => (
  <>
    <title>Answer</title>
    <meta name="description" content="Your description" />
  </>
);
export default AnswerPage;
