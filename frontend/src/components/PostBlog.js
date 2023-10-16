import React, { useState } from "react";
import { Card, Col, Row, Button, Select } from "antd";
import "react-quill/dist/quill.snow.css";
import { navigate } from "gatsby";
import ReactQuill from "react-quill";
import { postRoute } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PostBlog = () => {
  const [values, setValues] = useState({
    questionTitle: "",
    courseCode: "",
    universityName: "",
    category: "",
    courseName: "",
    insertPrice: "",
    insertTagsHere: "",
  });
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleQuillChange = (value) => {
    setContent(value);
    console.log(value);
  };
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  // const handleTagsChange = (event) => {
  //   const tags = event.target.value.replace(/\s/g, ",");
  //   setValues({ ...values, insertTagsHere: tags });
  //   console.log(values);
  // };

  const handleFile = (e) => setFile(e.target.files[0]);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(values.username);
    const {
      questionTitle,
      courseCode,
      universityName,
      category,
      courseName,
      insertPrice,
      insertTagsHere,
    } = values;
    const description = content;
    const { data } = await axios.post(postRoute, {
      token: localStorage.token,
      questionTitle,
      courseCode,
      universityName,
      category,
      courseName,
      insertPrice,
      insertTagsHere,
      description,
    });
    if (file) {
      const newData = new FormData();
      newData.append("file", file);
      await axios({
        method: "post",
        url: `${process.env.api_url}/api/file/${data.post._id}`,
        data: newData,
      });
    }
    if (data.status === true) {
      console.log(data);
      navigate("/solution");
    }
    if (data.status === false) {
      toast.error(data.errors, {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
      });
      setErrors(data.errors);
      console.log(data);
      console.log(errors);
    }
  };

  const options = [];

  const selectHandleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Card>
      <div>
        <h2
          style={{
            fontFamily: "awesome",
            textAlign: "center",
          }}
        >
          Champlainsolutions &nbsp; Assignment Help
        </h2>
      </div>
      <div>
        <Row>
          <Col
            xs={23}
            md={11}
            lg={11}
            xl={11}
            offset={1}
            style={{ height: "45vh", marginBottom: "1vh" }}
          >
            <div style={{ marginBottom: "9px" }}>
              <input
                type="text"
                placeholder="Question Title"
                name="questionTitle"
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",
                  fontSize: "15px",
                  color: "black !important",
                  border: "1px solid #d9d9d9",
                  padding: "8px",
                  fontFamily: "awesome",
                }}
              />
            </div>
            <div>
              <ReactQuill
                placeholder="Content"
                value={content}
                onChange={handleQuillChange}
                style={{
                  height: "30vh",
                }}
              />
            </div>
          </Col>
          {/* <Col span={12}> */}
          <Col xs={24} md={10} lg={10} xl={10} style={{ paddingLeft: "3vw" }}>
            <div style={{ paddingBottom: "9px" }}>
              <input
                type="text"
                placeholder="Course Code"
                name="courseCode"
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",
                  fontSize: "15px",
                  color: "black !important",
                  border: "1px solid #d9d9d9",
                  padding: "8px",
                  fontFamily: "awesome",
                }}
              />
            </div>

            <div style={{ paddingBottom: "9px" }}>
              <input
                type="text"
                placeholder="University name"
                name="universityName"
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",
                  fontSize: "15px",
                  color: "black !important",
                  border: "1px solid #d9d9d9",
                  padding: "8px",
                  fontFamily: "awesome",
                }}
              />
            </div>

            <div style={{ paddingBottom: "9px" }}>
              <input
                type="text"
                placeholder="Category"
                name="category"
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",

                  fontSize: "15px",
                  color: "black !important",
                  border: "1px solid #d9d9d9",
                  padding: "8px",
                  fontFamily: "awesome",
                }}
              />
            </div>
            <div style={{ paddingBottom: "9px" }}>
              <input
                type="text"
                placeholder="Course Name"
                name="courseName"
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",

                  fontSize: "15px",
                  color: "black !important",
                  border: "1px solid #d9d9d9",
                  padding: "8px",
                  fontFamily: "awesome",
                }}
              />
            </div>
            <div style={{ paddingBottom: "9px" }}>
              <input
                type="number"
                placeholder="Insert Price"
                name="insertPrice"
                onChange={(e) => handleChange(e)}
                style={{
                  width: "100%",

                  fontSize: "15px",
                  color: "black !important",
                  border: "1px solid #d9d9d9",
                  padding: "8px",
                  fontFamily: "awesome",
                }}
              />
            </div>
            <div style={{ paddingBottom: "9px" }}>
              <Select
                mode="tags"
                style={{
                  width: "100%",
                  fontSize: "15px",
                  fontFamily: "awesome",
                }}
                placeholder="Fix Tags Here"
                onChange={selectHandleChange}
                tokenSeparators={[","]}
                options={options}
              />
            </div>
            <div>
              <input
                type="file"
                onChange={handleFile}
                accept=".pptx, .doc, .docx, .pdf, .xls"
              />
              <Button
                type="primary"
                size="large"
                onClick={onSubmit}
                style={{ margin: "20px" }}
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default PostBlog;
