import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "antd";
import { toast } from "react-toastify";
import { navigate } from "gatsby";
import axios from "axios";

const Checkout = ({ post }) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.token) setAuthorized(true);
  }, []);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              //   value: 1000,
              value: post.insertPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onClick = () => {
    if (authorized) setShow(true);
    else navigate("/auth/login");
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (err) => {
    toast.error(err, {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        hideProgressBar: true,
      });
      const fetchFile = async () => {
        try {
          const token = localStorage.token;
          await axios.get(`${process.env.api_url}/check`, {
            headers: { "x-auth-token": token },
          });
          const res = await axios.get(
            `${process.env.api_url}/file/${post.answer}`,
            { responseType: "blob", headers: { "x-auth-token": token } }
          );

          const url = window.URL.createObjectURL(res.data);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", post.answer); //or any other extension
          document.body.appendChild(link);
          link.click();
        } catch (e) {
          console.log(e);
        }
      };
      fetchFile();
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  console.log(process.env.CLIENT_ID);

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.CLIENT_ID }}>
      <div>
        <div className="wrapper">
          <div className="product-info">
            <div className="product-price-btn">
              <br></br>

              <div>
                <Button block onClick={onClick} style={{ fontWeight: "bold" }}>
                  <span className="blotitle">
                    <strong>
                      {" "}
                      Download this answer instantly at {post.insertPrice}$
                    </strong>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        {show ? (
          <div style={{ width: "80%", margin: "auto" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paypal"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="card"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </div>
        ) : null}
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
