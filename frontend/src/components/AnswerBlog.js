import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Card, Button, Row, Col, Modal, Form, Input, InputNumber } from "antd";
import screenimg from "../assets/images/answer.png";
import Checkout from "./Checkout";
import axios from "axios";

const AnswerBlog = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(localStorage.token);
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const email = Form.useWatch("email", form);
  const phone = Form.useWatch("phone", form);
  const budget = Form.useWatch("budget", form);
  const instructions = Form.useWatch("instructions", form);
  const values = { name, email, phone, budget, instructions };
  const showQuoteModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.api_url}/api/auth`,
        headers: {
          "x-auth-token": token,
        },
      });
      setUser(res.data);
    };
    if (token) fetchUser();
  }, []);
  const handleModalOk = () => {
    setLoading(true);
    const postElement = renderToString(postCard);
    const emailElement = { ...values, content: postElement };
    axios
      .post(`${process.env.api_url}/api/email/send-email`, emailElement)
      .then((res) => {
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => console.log(err));
    console.log(values);
  };
  const handleModalCancel = () => {
    setOpen(false);
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const postCard = (
    <Card style={{ padding: "5px" }}>
      <div
        style={{
          padding: "5px",
          paddingTop: "0px",
          fontFamily: "'Heebo', sans-serif",
          marginBottom: "15px",
        }}
      >
        <div style={{ marginBottom: "15px", marginTop: "-10px" }}>
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span className="blotitle">
                <strong>University:</strong>
              </span>
              <span className="blotitleb">{post.universityName}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span className="blotitle">
                <strong>Category:</strong>
              </span>
              <span className="blotitleb">{post.category}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span>
                <strong className="blotitle">Date:</strong>
              </span>
              <span className="blotitleb">
                {new Date(post.date).getFullYear() +
                  "-" +
                  (new Date(post.date).getMonth() + 1) +
                  "-" +
                  new Date(post.date).getDate()}
              </span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span className="blotitle">
                <strong>Course code:</strong>
              </span>
              <span>{post.courseCode}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span className="blotitle">
                <strong>Course name:</strong>
              </span>
              <span className="blotitleb">{post.courseName}</span>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
              <span className="blotitle">
                <strong>Price:</strong>
              </span>
              <span className="blotitleb">{post.insertPrice}</span>
            </Col>
          </Row>
          <h2 className="bloquotitle">{post.questionTitle}</h2>
        </div>
        <div style={{ marginTop: "15px" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
            className="blogdes"
          ></div>
        </div>
      </div>
    </Card>
  );
  return (
    <div style={{ marginBottom: "50px" }}>
      {postCard}
      <Card style={{ padding: "5px", marginTop: 16 }}>
        <div
          style={{
            padding: "5px",
            paddingTop: "10px",
            fontFamily: "'Heebo', sans-serif",
            marginBottom: "15px",
          }}
        >
          <div style={{ marginBottom: "2vh" }}>
            <h2
              style={{
                textAlign: "center",
              }}
              className="bloquotitle"
            >
              Answer Details
            </h2>
          </div>
          <div>
            <div style={{ borderTop: "1px solid #dedede" }}>
              <img
                src={screenimg}
                alt="screenimage"
                width="100%"
                height="160px"
              />
            </div>
            <div>
              <Checkout post={post} />
              <div style={{ marginTop: "1vh" }}>
                <Button
                  block
                  style={{
                    fontWeight: "bold",
                    weidth: "100%",
                  }}
                  onClick={showQuoteModal}
                >
                  <span className="blotitle">
                    <strong> Get a quote of Human generated paper</strong>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        open={open}
        title="Get a quote"
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleModalOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          {...layout}
          name="nest-messages"
          form={form}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"name"}
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
            initialValue={user?.email}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"phone"} label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item
            name={"budget"}
            label="Budget"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={"instructions"} label="Instructions">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AnswerBlog;
