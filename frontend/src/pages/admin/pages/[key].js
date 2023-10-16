import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { navigate } from "gatsby";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout, Dropdown } from "antd";
import { Link } from "gatsby";
import { Menu } from "antd";
import { Col, Row } from "antd";
import logocom from "../../../assets/images/Logocom.png";
import { CaretDownOutlined} from '@ant-design/icons';
import { Button } from "antd";
import ReactQuill from "react-quill";

const { Header } = Layout;
function PageEdit(key) {

  const num = key.params.key;
  const id = "6651abbf3ad021c5b31117168";
  // console.log(num);
  // console.log(id);
  // const [page, setPage] = useState({});
  const [temp, setTemp] = useState({});
  const [content, setContent] = useState("");

  useEffect(
    function () {
      async function getPage() {
        try {
          // console.log("456");
          // console.log(num);
          const response = await get(`${process.env.api_url}/api/page/`);
          // console.log(response);
          // console.log("334");
          if( num == 1 ) {
          setTemp(response.data[0].about);
          setContent(response.data[0].about);
          // console.log(response.data[0].about);
          }
          else if (num == 2 ) {
            setTemp(response.data[0].how);
            setContent(response.data[0].how);}
          else if ( num == 3 ) {
            setTemp(response.data[0].service);
            setContent(response.data[0].service);
          }
          else if ( num == 4 ) {
            setTemp(response.data[0].term);
            setContent(response.data[0].term);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getPage();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [num]
  );

  function handleSubmit(event) {
    event.preventDefault();
    async function updatePage() {
      let description;
      try {
        if( num == 1 ) {
           description = {about:content}
          }
          else if (num == 2 ) {
             description = {how:content}}
          else if ( num == 3 ) {
             description = {service:content}
          }
          else if ( num == 4 ) {
             description = {term:content}
          }
        const res = await patch(`${process.env.api_url}/api/page/update/${id}`, description);
        console.log(res.data);
        console.log(description);
        toast.success("Updated Successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
          hideProgressBar: true,
        });
        setTimeout(() => {
          navigate("/admin/content");
        }, 1500);
      } catch (error) {
        console.log(error);
        navigate('/404')
      }
    }
    updatePage();
  }

  const handleQuillChange = (value) => {
    setContent(value);
    // console.log(value);
  };

  function handleCancel() {
    navigate("/admin/content");
  }
  const array = [
    {name: "Admin", url: "/admin/admin"},
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
      <Header
        style={{
          padding: "0",
          height: "96px",
          background: "#272930",
          margin: "-8px",
        }}
      >
        <Row>
          <Col

            lg={{ span: 3 }}
            style={{
              display: "flex",
              paddingTop: "10px",
            }}
          >
            <a href="/" style={{ margin: '0 auto' }}>
              <img src={logocom} alt="logo" height="40%" />
            </a>
          </Col>
          <Col md={{ span: 0 }} xl={{ span: 21 }} style={{ paddingTop: "30px" }}>
              <Menu
                theme="white"
                mode="horizontal"
                style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
                md={{ gap: '3px' }}
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
          <Col md={{ span: 3, offset: 10 }} lg={{offset: 17}} xl={{ span: 0 }} style={{ paddingTop: "30px" }}>
              <Dropdown
                trigger={['click']}
                menu={{items: array.map((item, index) => ({
                  key: index + 1, label: <Link to={item.url}>
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
                }))}}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <CaretDownOutlined />
                </a>
              </Dropdown>
            
          </Col>
          <Col span={2}></Col>
        </Row>
      </Header>
      <div>
        <ToastContainer />
        <h1 style={{ textAlign: "center" }}>Edit </h1>
        <hr />
        <form
          onSubmit={handleSubmit}
          style={{
            marginLeft: "400px",
            marginRight: "400px",
            marginTop: "30px",
          }}
        >
          <div style={{ marginTop: "15px" }}>
            <label>Description:</label>

            <ReactQuill
            placeholder="Content"
            value={content}
            onChange={handleQuillChange}
            style={{
              height: '800px',fontFamily:"awesome",
            }}
          />
          </div>
          <div style={{ marginTop: "60px" }}>
            <Button type="primary" onClick={handleSubmit}>
              Update
            </Button>
            <Button
              type="primary"
              onClick={handleCancel}
              style={{ marginLeft: "15px" }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PageEdit;
