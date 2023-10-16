import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import { Card, Row, Col, Button } from "antd";

function PostDelete(props) {
  const [post, setPost] = useState({});
  function handleCancel() {
    navigate("/admin/admin");
  }

  useEffect(
    function () {
      async function deletePostById() {
        try {
          const response = await axios.get(
            `${process.env.api_url}/api/posts/${props.id}`
          );
          console.log(response);
          setPost(response.data);
        } catch (error) {
          console.log("error", error);
          navigate("/404");
        }
      }
      deletePostById();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  async function handleDelete() {
    try {
      await axios.delete(`${process.env.api_url}/api/posts/${props.id}`);
      navigate("/admin/admin");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card style={{ height: "100%", padding: "5px", marginTop: "5px" }}>
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
            <h2
              // style={{
              //   marginTop: "-15px",
              //   fontFamily: "awesome",
              //   fontSize: "26px",
              //   // textAlign: "center",
              // }}
              className="bloquotitle"
            >
              {post.questionTitle}
            </h2>
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
      <div style={{ marginTop: "15px" }}>
        <Row>
          <Col
            xs={{ span: 22, offset: 2 }}
            md={{ span: 10, offset: 13 }}
            lg={{ span: 9, offset: 15 }}
            xl={{ span: 7, offset: 17 }}
          >
            <Button
              type="primary"
              onClick={handleDelete}
              style={{
                fontWeight: "bold",
                fontFamily: "awesome",
              }}
            >
              Delete
            </Button>

            <Button
              type="primary"
              onClick={handleCancel}
              style={{
                fontFamily: "awesome",
                margin: "20px",
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PostDelete;
