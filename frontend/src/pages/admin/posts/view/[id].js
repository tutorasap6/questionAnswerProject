import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Button } from "antd";
import { Layout, Dropdown } from "antd";
import { Link } from "gatsby";
import { Menu } from "antd";
import logocom from "../../../../assets/images/Logocom.png";
import { navigate } from "gatsby";
import { MenuOutlined } from "@ant-design/icons";
import FileViewer from "react-file-viewer";

function CrudDetails(params) {
  const [crud, setCrud] = useState({});
  const [file, setFile] = useState(null);
  const { id } = params;
  const { Content } = Layout;

  useEffect(
    function () {
      async function getCrudById() {
        try {
          const response = await axios.get(
            `${process.env.api_url}/api/posts/${id}`
          );
          setCrud(response.data);
        } catch (error) {
          console.log("error", error);
          navigate("/404");
        }
      }
      getCrudById();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFile = (e) => setFile(e.target.files[0]);
  function handleCancel() {
    navigate("/admin/admin");
  }

  const handlePush = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("file", file);
      const res = await axios({
        method: "post",
        url: `${process.env.api_url}/api/posts/upload/${id}`,
        data: data,
      });
      navigate("/solution");
    } catch (e) {
      throw e;
    }
  };

  const array = [
    { name: "Admin", url: "/admin/admin" },
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
      <Content style={{ paddingTop: "70px" }}>
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 18, offset: 3 }}
            lg={{ span: 16, offset: 4 }}
          >
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
                      <span className="blotitleb">{crud.universityName}</span>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                      <span className="blotitle">
                        <strong>Category:</strong>
                      </span>
                      <span className="blotitleb">{crud.category}</span>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                      <span>
                        <strong className="blotitle">Date:</strong>
                      </span>
                      <span className="blotitleb">
                        {new Date(crud.date).getFullYear() +
                          "-" +
                          (new Date(crud.date).getMonth() + 1) +
                          "-" +
                          new Date(crud.date).getDate()}
                      </span>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                      <span className="blotitle">
                        <strong>Course code:</strong>
                      </span>
                      <span>{crud.courseCode}</span>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                      <span className="blotitle">
                        <strong>Course name:</strong>
                      </span>
                      <span className="blotitleb">{crud.courseName}</span>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }}>
                      <span className="blotitle">
                        <strong>Price:</strong>
                      </span>
                      <span className="blotitleb">{crud.insertPrice}</span>
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
                    {crud.questionTitle}
                  </h2>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: crud.description,
                    }}
                    className="blogdes"
                  ></div>
                </div>
              </div>
              {crud.file && (
                <div>
                  <FileViewer
                    filePath={`${process.env.api_url}/${crud.file}`}
                    fileType={
                      crud.file.split(".")[crud.file.split(".").length - 1]
                    }
                  />
                </div>
              )}
            </Card>
            <div>
              <Row style={{ paddingTop: "35px" }}>
                <Col
                  xs={{ span: 22, offset: 2 }}
                  md={{ span: 9, offset: 3 }}
                  lg={{ span: 9, offset: 3 }}
                  xl={{ span: 9, offset: 3 }}
                >
                  <input type="file" onChange={handleFile} />
                </Col>
                <Col
                  xs={{ span: 22, offset: 2 }}
                  md={{ span: 9, offset: 3 }}
                  lg={{ span: 9, offset: 3 }}
                  xl={{ span: 9, offset: 3 }}
                >
                  {" "}
                  <div>
                    <Button
                      type="primary"
                      disabled={!file}
                      onClick={handlePush}
                      style={{
                        // height: "40px",
                        // fontSize: "20px",
                        // fontFamily: "awesome",
                        // padding: "3px",
                        fontWeight: "bold",
                      }}
                    >
                      Push
                    </Button>

                    <Button
                      type="primary"
                      onClick={handleCancel}
                      style={{
                        // height: "40px",
                        // fontSize: "20px",
                        // fontFamily: "awesome",
                        // padding: "3px",
                        margin: "20px",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Content>
    </>
  );
}

export default CrudDetails;
