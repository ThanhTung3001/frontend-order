import style from "./index.module.css";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import axios from "axios";
import { URL_BACKEND } from "../../../constants";
import { useSelector } from "react-redux";
import moment from "moment";

const columns = [
  { field: "id", headerName: "STT", width: 50 },
  { field: "createdAt", headerName: "Ngày tạo", width: 200 },
  { field: "Total", headerName: "Tổng cộng", width: 200 },
  { field: "Details", headerName: "Chi tiết", width: 600 },
  { field: "Status", headerName: "Trạng thái", width: 130 },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

function HistoryTransaction() {
  const [data, setData] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const { users } = useSelector((state) => state.userReducer);
  React.useEffect(() => {
    axios({
      url:
        URL_BACKEND +
        `/api/orders?populate=%2A&filters%5Busers_permissions_user%5D[id]=${users.user.id}`,
      method: "GET",
      headers: {
        authorization: "Bearer " + users.jwt,
      },
    }).then(({ data }) => {
      setData(data.data);
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
              })} \n`;
          });
        }
        // console.log(e.attributes.Total);
        return {
          id: index + 1,
          createdAt: moment(e.attributes.createdAt).format("DD/MM/YYYY HH:mm"),
          Total: parseInt(e.attributes.Total).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
          Details: Details,
          Status: "Đã tiếp nhận",
        };
      });
      setRows(result);
    });
  }, []);
  return (
    <div
      className={`${style.ContainerHistoryTransaction}`}
      style={{ minHeight: 414 }}
    >
      <div>
        <h1 className={style.TextHistory}>Lịch sử giao dịch</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
}

export default HistoryTransaction;
