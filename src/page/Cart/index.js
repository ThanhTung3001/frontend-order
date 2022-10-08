import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { el, id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  changeAmountItem,
  removeAll,
  removeData,
} from "../../app/reducer/CartSlice";
import axios from "axios";
import { URL_BACKEND } from "../../constants";
import { Navigate, useNavigate } from "react-router-dom";

export const Cart = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, isLoaded } = useSelector((state) => state.cartReducer);
  const { users, authencated, user } = useSelector(
    (state) => state.userReducer
  );
  const [total, setTotal] = React.useState(0);
  const [cartCurrent, setCartCurrent] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  React.useEffect(() => {
    setTotal((prev) => {
      let totalValue = 0;
      items.forEach((e) => {
        totalValue = totalValue + e.price * e.amount;
      });
      return totalValue;
    });
  }, [items, amount]);
  const handleRemoveItems = (id) => {
    // //console.log(id);

    const cf = window.confirm("Bạn có muốn xoá menu trong giỏ hàng");
    if (cf) {
      dispatch(removeData(id));
    }
  };
  const handleChangeAmount = (amount, id) => {
    // //console.log(amount, id)
    setAmount(amount);
    const dataSend = {
      ID: id,
      amount: amount,
    };
    // //console.log(dataSend);
    dispatch(changeAmountItem(dataSend));
  };
  const handleSubmitCart = async () => {
    const arrayIDCart = [];
    if (items.length == 0) {
      alert("Rất tiếc, giỏ hàng của bạn đang rỗng");
    } else {
      for (const e of items) {
        const { data } = await axios({
          url: URL_BACKEND + "/api/category-order-cards",
          headers: {
            authorization: "Bearer " + users.jwt,
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            data: {
              Name: `${e.name} X ${parseInt(e.amount)}`,
              Note: "",
              Amount: e.price * e.amount,
              category: e.ID,
            },
          }),
          method: "POST",
        });
        arrayIDCart.push(data.data.id);
      }
      if (users.user.PhoneNumber == null || users.user.email == null) {
        alert("Vui lòng kiểm tra thông tin của mình bạn nhé !!!");
        navigate("/user/info");
      } else {
        const { data, statusText, status } = await axios({
          url: `${URL_BACKEND}/api/orders`,
          method: "POST",
          headers: {
            authorization: "Bearer " + users.jwt,
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            data: {
              OrderName: users.user.FullName + " - " + users.user.PhoneNumber,
              Note: "Nothings",
              Total: total,
              users_permissions_user: users.user.id,
              category_order_cards: arrayIDCart,
            },
          }),
        });
        if (status === 200) {
          alert("Thao tác đặt hàng thành công, chúng tôi sẽ liên hệ bạn sớm");
          dispatch(removeAll());
        } else {
          alert("Đặt hàng thất bại, vui lòng liên hệ Admin để được hỗ trợ");
        }
      }
    }
  };

  React.useEffect(() => {
    setCartCurrent(items);
  }, [items]);

  return (
    <div className="full-width">
      <div className="container">
        <div className="row block">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, maxHeight: 600 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right" width={30}>
                    <h6 style={{ fontWeight: 700 }}>STT</h6>
                  </TableCell>
                  <TableCell align="left">
                    <h6 style={{ fontWeight: 700 }}>Tên menu</h6>
                  </TableCell>
                  <TableCell align="right">
                    <h6 style={{ fontWeight: 700 }}>Số lượng</h6>
                  </TableCell>
                  <TableCell align="right">
                    <h6 style={{ fontWeight: 700 }}>Giá tiền</h6>
                  </TableCell>
                  <TableCell align="right">
                    <h6 style={{ fontWeight: 700 }}>Thao tác</h6>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartCurrent.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell width={30}>{index + 1}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">
                      <TextField
                        value={row.amount}
                        onChange={(e) => {
                          handleChangeAmount(e.target.value, row.ID);
                        }}
                        type="number"
                        style={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <p style={{ fontWeight: 700 }}>{`${parseInt(
                        row.price * row.amount
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}`}</p>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          handleRemoveItems(row.ID);
                        }}
                      >
                        <RemoveIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="row d-flex justify-content-end mt-3">
            <div className="col-6 col-sm-3">
              <TextField
                label="Tổng cộng"
                value={parseInt(total).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
                disabled
              />
            </div>
            <div className="col-6 col-sm-2 d-flex justify-content-center align-items-center">
              <div className="flex-column justify-content-center align-items-center">
                <Button variant="contained" onClick={handleSubmitCart}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
