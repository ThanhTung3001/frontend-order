import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { el, id } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { changeAmountItem } from '../../app/reducer/CartSlice';

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
export const Cart = () => {

    const dispatch = useDispatch();
    const { items, isLoaded } = useSelector(state => state.cartReducer);


    const data = localStorage.getItem('cart');
    if (data == null) {
        localStorage.setItem('cart', JSON.stringify([]))
    } else {

    }
    const [cartCurrent, setCartCurrent] = React.useState([]);
    const handleRemoveItems = (id) => {

    }
    const handleChangeAmount = (amount, id) => {
        // console.log(amount, id)
        const dataSend = {
            ID: id,
            amount: amount
        };
        console.log(dataSend)
        dispatch(changeAmountItem(dataSend))
    }

    React.useEffect(() => {
        setCartCurrent(items);
    }, [items])

    return (
        <div className="full-width">
            <div className="container">
                <div className="row block">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>

                                    <TableCell align="right" width={30}><h6 style={{ fontWeight: 700 }}>STT</h6></TableCell>
                                    <TableCell align="right"><h6 style={{ fontWeight: 700 }}>Tên menu</h6></TableCell>
                                    <TableCell align="right"><h6 style={{ fontWeight: 700 }}>Số lượng</h6></TableCell>
                                    <TableCell align="right"><h6 style={{ fontWeight: 700 }}>Giá tiền</h6></TableCell>
                                    <TableCell align="right"><h6 style={{ fontWeight: 700 }}>Thao tác</h6></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartCurrent.map((row, index) => (
                                    <TableRow
                                        key={index}>
                                        <TableCell width={30}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right"><TextField value={row.amount} onChange={(e) => {
                                            handleChangeAmount(e.target.value, row.ID)
                                        }} type="number" style={{ width: 100 }} /></TableCell>
                                        <TableCell align="right"><p style={{ fontWeight: 700 }}>{`${parseInt(row.price * row.amount).toLocaleString(
                                            "it-IT",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}`}</p></TableCell>
                                        <TableCell align="right"><IconButton onClick={() => { }}><RemoveIcon color='error' /></IconButton></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
