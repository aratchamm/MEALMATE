
const Data = [
  { id: 1,  Status: "ยืนยันแล้ว", Menu: "ข้าวหน้าเทอริยากิ"},
  { id: 1,  Status: "ยืนยันแล้ว", Menu: "ข้าวหน้าเทอริยากิ"},
  { id: 1,  Status: "ยืนยันแล้ว",   Menu: "ข้าวหน้าเทอริยากิ"},
  { id: 1,  Status: "ยืนยันแล้ว",   Menu: "ข้าวหน้าเทอริยากิ"},
  { id: 1,  Status: "ยืนยันแล้ว",   Menu: "ข้าวหน้าเทอริยากิ"}
];

const StatusColor = {
  รอการยืนยัน: '#8D8D8D',
  ยืนยันแล้ว: 'green',
  ยกเลิกแล้ว: 'red'
}

Data.forEach((val, index, arr) => { arr[index].Color = StatusColor[val.Status] })



export default Data;