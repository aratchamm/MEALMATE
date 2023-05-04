import React, { useState } from "react";
import axios from 'axios';

const Data = ({ Status, By, Menu, Detail, Tel ,OrderId ,Token ,myFunc: reFetch}) => {
    console.log(OrderId)
    const [showPopup, setShowPopup] = useState(false);

    const StatusColor = {
        รอยืนยัน: '#8D8D8D',
        ยืนยันแล้ว: 'green',
        ยกเลิกแล้ว: 'red'
    }

    const [showButtons, setShowButtons] = useState(Status === "รอยืนยัน");
    const [cancelText, setCancelText] = useState("ยกเลิกรายการ");
    const [statusColor, setStatusColor] = useState(StatusColor[Status]);


    const togglePopup = () => {
        setShowPopup(!showPopup);
    }


    const [statusText, setStatusText] = useState(Status);

    async function handleCancel() {
        try{
          const res = await axios({
            url:'https://localhost:7161/api/Order/RejectOrder?orderId='+OrderId,
            method:'POST',
            headers:{
              Authorization:`Bearer ${Token}`
            }
          });
          setShowPopup(!showPopup);
          reFetch();
          console.log("cancle Order Success");
        }
        catch{
          console.log("Failed to Cancel Order")
        } 
      }

    return (
        <div className='row'>
            <div style={{ color: statusColor }} className="col-3 py-3 m-auto">
                {statusText}
                {showButtons ? (
                    <div className='col-sm-12 col-lg-5 col-md-12 py-3' id='confirmBUTTON'>
                        <div style={{ display: "flex" }}>

                            <button onClick={togglePopup} className=' col-sm-12 ' style={{ borderRadius: '20px', backgroundColor: 'transparent', color: '#6F6F6F', borderColor: '#6F6F6F' }}>{cancelText}</button>

                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="col-3 py-3 m-auto">
                <div>{By}</div>
                <div className='pt-1'>
                    {Tel.substring(0, 3)}-{Tel.substring(3, 6)}-{Tel.substring(6, 10)}
                    </div>
            </div>
            <div className="col-3 py-3 m-auto">
                {Menu}
            </div>
            <div className="col-3 py-3 m-auto">
                {Detail}
            </div>


            {showPopup && (

                <div id="popup3" className="overlay">
                    <div className="popup3 text-center">
                        <a className="close my-1 mx-2" onClick={togglePopup}><img border="0" alt="" src="https://sv1.picz.in.th/images/2023/04/28/ygp9r1.png"></img></a>
                        <div className="h3 py-4"><b>คุณต้องการยกเลิกใช่หรือไม่?</b></div>
                        <div className="content">
                            <div className="row">
                                <div className="col-6 mt-3">
                                    <input style={{backgroundColor: '#ff000d'}} onClick={handleCancel} href="/Status" className="button1 h4 p-3" type="submit" value="ใช่"></input>
                                </div>

                                <div className="col-6 mt-3">
                                    <input style={{backgroundColor: '#8E8E8E'}} onClick={togglePopup} href="/Status" className=" button1 h4 p-3" type="submit" value="ไม่"></input>
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
