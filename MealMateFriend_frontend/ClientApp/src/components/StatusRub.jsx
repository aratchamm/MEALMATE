import React, { useState, useEffect } from "react";
import axios from 'axios';

const Data = ({ Status, By, Menu, Detail, Tel ,OrderId ,Token ,myFunc: reFetch}) => {

  const [showPopupConfirm, setShowPopupConfirm] = useState(false);
  const [showPopupCancel, setShowPopupCancel] = useState(false);
  const [showPopupCloseJob, setShowPopupCloseJob] = useState(false);

  const [showButtons, setShowButtons] = useState(Status === "รอยืนยัน");
  const [showCloseJobButtons, setShowCloseJobButtons] = useState(Status === "รอส่งอาหาร");

  const [cancelText, setCancelText] = useState("ยกเลิก");
  const [confirmText, setConfirmText] = useState("ยืนยัน");
  const [closeOrderText, setcloseOrderText] = useState("จัดส่งแล้ว");


  const [statusColor, setStatusColor] = useState("#8D8D8D");
  const [statusText, setStatusText] = useState(Status);
  
  
  useEffect(()=>{
    if(Status=="รอยืนยัน"){
      setStatusColor("#8D8D8D")
    }
    else{
      setStatusColor("#FF0000")
    }
  },[Status])

  
  useEffect(() => {

    if (showPopupConfirm) {

      const timer = setTimeout(() => {
        setShowPopupConfirm(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showPopupConfirm]);


  useEffect(() => {
    
    if (showPopupCloseJob) {
      const timer = setTimeout(() => {
        setShowPopupCloseJob(false);
        setShowCloseJobButtons(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showPopupCloseJob]);



  const [isCancleLoading , setIsCancleLoading ] = useState(false)


  async function handleCancel() {
    try{
      setIsCancleLoading(true)
      const res = await axios({
        url:'https://localhost:7161/api/Order/RejectOrder?orderId='+OrderId,
        method:'POST',
        headers:{
          Authorization:`Bearer ${Token}`
        }
      });
      await  reFetch();

      setShowPopupCancel(!showPopupCancel);
      console.log("cancle Order Success");
    }
    catch{
      console.log("Failed to Cancel Order")
    } finally {
      setIsCancleLoading(false)
    }
  }

  async function handleConfirm() {
    try{
      const res = await axios({
        url:'https://localhost:7161/api/Order/AcceptOrder?orderId='+OrderId,
        method:'POST',
        headers:{
          Authorization:`Bearer ${Token}`
        }
      });
      setStatusText("รอส่งอาหาร");
      setShowPopupConfirm(!showPopupConfirm);
      setShowButtons(false);
      setShowCloseJobButtons(true);
      console.log("Accept Order Success"); 
      reFetch();
    }
    catch{
      console.log("Failed to Accept Order")
    }
    
  }

  async function handleCloseJob() {
    try{
      const res = await axios({
        url:'https://localhost:7161/api/Order/CompleteOrder?orderId='+OrderId,
        method:'POST',
        headers:{
          Authorization:`Bearer ${Token}`
        }
      });
      setShowPopupCloseJob(!showPopupCloseJob);
      

      reFetch();
      console.log("Complete Order Success")
    }
    
    catch{
      console.log("Failed to Accept Order")
    }

    
  }


  const togglePopup_cencel = () => {
    setShowPopupCancel(!showPopupCancel);
  };

  return (
    <div className="row">
      <div className="col-3 py-3 m-auto">
        <div style={{ color: statusColor }}>
        {statusText}
        </div>

        {showButtons && (
          <div className="py-3" id="confirmBUTTON">
            <div style={{ display: "flex" }}>
              <button
                onClick={handleConfirm}
                className="col-12 col-md-6 col-lg-3 {}"
                style={{
                  borderRadius: "20px",
                  marginRight: "5px",
                  backgroundColor: "green",
                  color: "white",
                  border: "0px",
                }}
              >
                {confirmText}
              </button>
              <br></br>
              <button
                onClick={togglePopup_cencel}
                className="col-12 col-md-6 col-lg-3"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "transparent",
                  color: "#6F6F6F",
                  borderColor: "#6F6F6F",
                }}
              >
                {cancelText}
              </button>
            </div>
          </div>
        )}

{showCloseJobButtons && (
          <div className="py-3" id="confirmBUTTON">
            <div style={{ display: "flex" }}>
              <button
                onClick={handleCloseJob}
                className="col-12 col-md-6 col-lg-3 {}"
                style={{
                  borderRadius: "20px",
                  marginRight: "5px",
                  backgroundColor: "#ff0000",
                  color: "white",
                  border: "0px",
                }}
              >
                {closeOrderText}
              </button>
            </div>
          </div>
        )}



      </div>
      <div className="col-3 py-3 m-auto">
        <div>{By}</div>
        <div className="pt-1">
          {Tel.substring(0, 3)}-{Tel.substring(3, 6)}-{Tel.substring(6, 10)}
        </div>
      </div>
      <div className="col-3 py-3 m-auto">{Menu}</div>
      <div className="col-3 py-3 m-auto">{Detail}</div>

      {showPopupConfirm && (
        <div id="popup4" className="overlay">
          <div className="popup4 h1 text-center">
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "green" }}
            ></i>
            <div className="h4 py-4">
              <b>คุณได้ยืนยันออเดอร์แล้ว
              </b>
            </div>
          </div>
        </div>
      )}

{showPopupCloseJob && (
        <div id="popup4" className="overlay">
          <div className="popup4 h1 text-center">
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "green" }}
            ></i>
            <div className="h4 py-4">
              <b>จัดส่งออเดอร์สำเร็จแล้ว!
              </b>
            </div>
          </div>
        </div>
      )}





      {showPopupCancel && (
        <div id="popup3" className="overlay ">
          <div className="popup3 text-center">
            <a className="close my-1 mx-3" onClick={togglePopup_cencel}>
              <img
                border="0"
                alt=""
                src="https://sv1.picz.in.th/images/2023/04/28/ygp9r1.png"
              ></img>
            </a>
            <div className="h3 py-4">
              <b>คุณต้องการยกเลิกใช่หรือไม่?
              {isCancleLoading}

              </b>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-6 mt-3">
                  <input
                    style={{ backgroundColor: "#ff000d" }}
                    onClick={handleCancel}
                    className="button1 h4 p-3"
                    type="submit"
                    value="ใช่"
                  ></input>
                </div>

                <div className="col-6 mt-3">
                  <input
                    style={{ backgroundColor: "#8E8E8E" }}
                    onClick={togglePopup_cencel}
                    className=" button1 h4 p-3"
                    type="submit"
                    value="ไม่"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Data;
