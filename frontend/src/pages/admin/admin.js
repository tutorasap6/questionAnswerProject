import React from "react";
import { Dropdown } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "gatsby";
import { Menu } from "antd";
import { Col, Row } from "antd";
import logocom from "../../assets/images/Logocom.png";
import { getPostsRoute } from "../../utils/APIRoutes";
import { MenuOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Space, Table, Button } from "antd";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.token);

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

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await axios.get(getPostsRoute);
        console.log(response.data);
        setPosts(response.data);
        console.log("state: ");
      } catch (error) {
        console.log("error", error);
      }
    }
    getPosts();
  }, []);

  useEffect(() => {
    console.log("s", posts);
  }, [posts]);

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

  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "CourseCode",
      dataIndex: "CourseCode",
      key: "CourseCode",
    },
    {
      title: "CourseName",
      dataIndex: "CourseName",
      key: "CourseName",
    },
    {
      title: "University",
      dataIndex: "University",
      key: "University",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "Tags",
      dataIndex: "insertTagsHere",
      key: "insertTagsHere",
    },
    {
      title: "Price",
      dataIndex: "insertPrice",
      key: "insertPrice",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a href={`/admin/posts/view/${record.key}`}>View</a>
          <a href={`/admin/posts/edit/${record.key}`}>Edit</a>
          <a href={`/admin/posts/delete/${record.key}`}>Delete</a> */}
          <Button type="link" href={`/admin/posts/view/${record.key}`}>
            View
          </Button>
          <Button type="link" href={`/admin/posts/edit/${record.key}`}>
            Edit
          </Button>
          <Button type="link" href={`/admin/posts/delete/${record.key}`}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = posts.map((post) => ({
    key: post._id,
    Title: post.questionTitle,
    // description: post.description,
    CourseCode: post.courseCode,
    CourseName: post.courseName,
    University: post.universityName,
    Category: post.category,
    insertTagsHere: post.insertTagsHere,
    insertPrice: post.insertPrice,
    date: (
      <span>
        {new Date(post.date).getFullYear() +
          "-" +
          (new Date(post.date).getMonth() + 1) +
          "-" +
          new Date(post.date).getDate()}
      </span>
    ),
  }));
  if (!token) {
    navigate("/");
    return null;
  }
  if (user && user?.role !== "admin") {
    navigate("/");
    return null;
  }
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
      <div className="container" style={{ overflowX: "auto" }}>
        <div>
          <Row>
            <Col span={22}>
              <h2 style={{ textAlign: "center" }} className="admintitle">
                Question Management
              </h2>
            </Col>
            <Col
              span={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "large",
                paddingTop: "3vh",
              }}
            >
              <a href="/admin/content" style={{ margin: "0 auto" }}>
                <DoubleRightOutlined />
              </a>
            </Col>
          </Row>
          {/* <hr /> */}
        </div>

        <Table
          columns={columns}
          dataSource={data}
          style={{ clear: "both", display: "table", width: "100%" }}
        />
      </div>
    </>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>admin</title>;

// Step 3: Export your component
export default AdminPage;
