import React from "react";
import { Button } from "antd";

const QueInput = () => (
  <div
    style={{ border: "1px solid #d9d9d9", padding: "16px", marginTop: "5px" }}
  >
    <div
      style={{ marginTop: "-20px", display: "flex", justifyContent: "center" }}
    ></div>

    <div>
      <p
        style={{
          width: "100%",
          height: "280px",
          fontSize: "15px",
          color: "black",
          border: "1px solid #d9d9d9",
          padding: "8px",
          fontWeight: "bold",
          fontFamily: "awesome",
        }}
      >
        Online education has become an essential component of our academic path
        in the fast-paced world of today. However, it frequently presents its
        own special difficulties. Students frequently have overwhelming
        workloads due to managing many online courses and keeping up with
        assignments, exams, lab reports, and essays. This is where
        ChamplainSolutions.com comes in to help you have a more effective and
        seamless experience when learning online.
      </p>
    </div>
    <div style={{ paddingTop: "10px" }}>
      <a href="/post">
        <Button
          type="primary"
          style={{
            width: "100%",
            height: "40px",
            fontSize: "20px",
            fontFamily: "awesome",
          }}
        >
          Ask Questions
        </Button>
      </a>
    </div>
  </div>
);

export default QueInput;
