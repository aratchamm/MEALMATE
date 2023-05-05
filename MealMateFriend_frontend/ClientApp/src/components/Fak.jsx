import React, { useEffect,useState } from "react";

const Data = ({ Status, Menu }) => {

  const [statusColor, setStatusColor] = useState(Status);
  
  
  useEffect(()=>{
    if(Status=="รอยืนยัน"){
      setStatusColor("#8D8D8D")
    }
    else{
      setStatusColor("#FF0000")
    }
  },[Status])
  
  return (
    <div className="row p-1">
      <div style={{ color: statusColor }} className="col-5 h6 text-left">
        {Status}
      </div>
      <div className="col-7 h6 text-left">
        {Menu}
      </div>
    </div>
  );
};

export default Data;