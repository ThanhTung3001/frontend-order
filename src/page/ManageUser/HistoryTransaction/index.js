import style from "./index.module.css";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import axios from "axios";
import { URL_BACKEND } from "../../../constants";
import { useSelector } from "react-redux";
import moment from "moment";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import parse from "html-react-parser";

const columns = [
  { field: "index", headerName: "STT", width: 50 },
  { field: "id", headerName: "Mã đơn hàng", width: 150 },
  { field: "createdAt", headerName: "Ngày tạo", width: 200 },
  { field: "Total", headerName: "Tổng cộng", width: 200 },
  { field: "Details", headerName: "Chi tiết", width: 600 },
  { field: "Status", headerName: "Trạng thái", width: 130 },
];


function HistoryTransaction() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataRow, setDataRow] = React.useState({ "index": 1, "id": 25, "createdAt": "08/10/2022 17:08", "Total": "25.369.998 VND", "Details": "CÁC MÓN SOUP X 2 - 16.100.000 VND \nCÁC MÓN GỎI X 1 - 6.520.000 VND \nMÓN CƠM – MÌ X 1 - 2.749.998 VND \n", "Status": "Đã tiếp nhận" })
  const [data, setData] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const { users } = useSelector((state) => state.userReducer);
  React.useEffect(() => {
    axios({
      url:
        URL_BACKEND +
        `/api/orders?populate=deep,3&filters%5Busers_permissions_user%5D[id]=${users.user.id}`,
      method: "GET",
      headers: {
        authorization: "Bearer " + users.jwt,
      },
    }).then(({ data }) => {
      setData(data.data);
   //   console.log(data.data);
      const result = data.data.map((e, index) => {
        let Details = ``;
        if (e.attributes.category_order_cards != null) {
          e.attributes.category_order_cards.data.forEach((cart) => {
            // console.log(cart);
            Details =
              Details +
              `${cart.attributes.Name} - ${parseInt(
                cart.attributes.Amount
              ).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })} || `;
          });
        }
        // console.log(e.attributes.Total);
        var status = e.attributes.status;
       console.log(status)
        if(status.data==null){
          status="Đã tiếp nhận";
        }else{
          status = status.data.attributes.name;
        }
        return {
          index: index + 1,
          id: e.id,
          createdAt: moment(e.attributes.createdAt).format("DD/MM/YYYY HH:mm"),
          Total: parseInt(e.attributes.Total).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
          Details: Details,

          Status: status,
        };
      });
      setRows(result);
    });
  }, []);
  return (
    <div
      className={`${style.ContainerHistoryTransaction}`}
      style={{ minHeight: 700 }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal} className="d-flex flex-column justify-content-center align-items-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3 style={{ fontSize: 24, fontWeight: 700 }}> Đơn hàng {dataRow.id}</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h4 style={{ fontSize: 18, fontWeight: 600 }}>  Chi tiết:</h4> <p>{parse(dataRow.Details)}</p>
            <span style={{ fontSize: 18, fontWeight: 600 }}>  Tổng cộng: <span> {(dataRow.Total)}</span></span>
            <br />
            <span style={{ fontSize: 18, fontWeight: 600 }}>  Ngày tạo: <span> {(dataRow.createdAt)}</span></span>
            <br />
            <span style={{ fontSize: 18, fontWeight: 600 }}>  Trạng thái: <span> {(dataRow.Status)}</span></span>
          </Typography>
        </Box>
      </Modal>
      <div>
        <h1 className={style.TextHistory}>Lịch sử giao dịch</h1>
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            onRowClick={(e) => {
             // console.log(JSON.stringify(e.row));


              var data = e.row;
              data.Details = data.Details.replaceAll('||', '<br/>');
              setDataRow(data);
              handleOpen();
            }}
          />
        </div>
      </div>
    </div>

  );
}

export default HistoryTransaction;
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  minHeight: 400,
  minWidth: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};