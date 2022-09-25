

import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Header from '../../layout/header'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { TextField, Slider, Button } from '@mui/material';
import './style.css'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { vi } from 'date-fns/locale'

export const Home = () => {
    const [value, setValue] = React.useState(dayjs(new Date()));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const [range, setRange] = React.useState(1);

    const handleChangeRange = (event, newValue) => {
        setRange(newValue);
    };
    return (
        <>
            <Header />
            <div className="full-width">
                <div className="slide">
                    <Carousel dynamicHeight>
                        <div>
                            <img src="https://mui.com/static/images/avatar/1.jpg" />
                            <p className="legend">ĐẶT TIỆC TRONG 1 CLICK
                                50+ NHÀ CUNG CẤP ĐỘC QUYỀN</p>
                        </div>
                        <div>
                            <img src="https://mui.com/static/images/avatar/1.jpg" />
                            <p className="legend">ĐẶT TIỆC TRONG 1 CLICK
                                50+ NHÀ CUNG CẤP ĐỘC QUYỀN</p>
                        </div>
                        <div>
                            <img src="https://mui.com/static/images/avatar/1.jpg" />
                            <p className="legend">ĐẶT TIỆC TRONG 1 CLICK
                                50+ NHÀ CUNG CẤP ĐỘC QUYỀN</p>
                        </div>
                    </Carousel>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="container">
                        <div className="row block" style={{ height: 300 }}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-sm-3 d-flex justify-content-center">
                                    <h3 className='hignl-title'>Đặt tiệc</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3">
                                    <TextField label="Số lượng khách *" placeholder='Số lượng khách' variant="outlined" />
                                </div>
                                <div className="col-sm-3">

                                    <TimePicker
                                        label="Giờ bắt đầu tiệc: *"

                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />

                                </div>
                                <div className="col-sm-3">
                                    <DateTimePicker
                                        label="Ngày diễn ra tiệc: *"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                                <div className="col-sm-3 ">
                                    <span>Số ngân sách: *</span>
                                    <Slider aria-label="Volume" value={range}
                                        color='secondary'
                                        onChange={handleChangeRange} />
                                    <span>{(range * 500000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-sm-3 d-flex justify-content-center">
                                    <Button variant="contained">Xác nhận</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </LocalizationProvider>
                <div className="container">
                    <div className="row block">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-3 d-flex justify-content-center">
                                <h3 className='hignl-title second'>Các loại tiệc</h3>
                            </div>
                        </div>
                        <div className="row d-flex flex-row-reverse">
                            <div className="col-sm-4 fit-content">
                                <img src="https://mui.com/static/images/avatar/1.jpg" alt="" />
                            </div>
                            <div className="col-sm-6">
                                <h3 className='title-article'>WinCommerce: Ngừng nhập và rút toàn bộ hàng hóa của nhà cung cấp Trình Nhi khỏi quầy kệ</h3>
                                <p className='description'>{("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of").substring(1, 600)}...</p>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-sm-3 d-flex justify-content-center">
                                <Button variant="contained">Xem thêm</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row block">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-3 d-flex justify-content-center">
                                <h3 className='hignl-title second'>Blogs</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="row">
                                    <div className="row d-flex flex-column">
                                        <div className="fit-content">
                                            <img src="https://mui.com/static/images/avatar/1.jpg" alt="" />
                                        </div>
                                        <div className="">
                                            <h3 className='title-article' >WinCommerce: Ngừng nhập và rút toàn bộ hàng hóa của nhà cung cấp Trình Nhi khỏi quầy kệ</h3>
                                            <p className="description">
                                                1/1/2022
                                            </p>
                                            <p className='description'>{("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of").substring(1, 600)}...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="row d-flex flex-column">
                                        <div className="fit-cover">
                                            <img src="https://mui.com/static/images/avatar/1.jpg" alt="" />
                                        </div>
                                        <div className="">
                                            <h3 className='title-article' >{("WinCommerce: Ngừng nhập và rút toàn bộ hàng hóa của nhà cung cấp Trình Nhi khỏi quầy kệ").substring(0, 30)} ...</h3>
                                            <p className="description">
                                                1/1/2022
                                            </p>
                                            <p className='description'>{("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of").substring(0, 200)}...</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="row d-flex flex-column">
                                        <div className="fit-cover">
                                            <img src="https://mui.com/static/images/avatar/1.jpg" alt="" />
                                        </div>
                                        <div className="">
                                            <h3 className='title-article' >{("WinCommerce: Ngừng nhập và rút toàn bộ hàng hóa của nhà cung cấp Trình Nhi khỏi quầy kệ").substring(0, 30)} ...</h3>
                                            <p className="description">
                                                1/1/2022
                                            </p>
                                            <p className='description'>{("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of").substring(0, 200)}...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-sm-3 d-flex justify-content-center">
                                <Button variant="contained">Xem thêm</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row block">
                        <div className="row">
                            <div className="col-sm-6">
                                <TextField fullWidth label="Họ tên *" /></div>
                            <div className="col-sm-6">
                                <TextField fullWidth label="Tiêu đề *" /></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-12 mt-4">
                                        <TextField fullWidth label="Số điện thoại: *" placeholder="Số điện thoại: *" />
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                        <TextField fullWidth label="Email: *" placeholder="Email: *" />
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                        <TextField fullWidth label="Địa chỉ:" placeholder="Địa chỉ:" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="col-sm-12 mt-4">
                                    <TextField
                                        label="Nội dung*"
                                        fullWidth
                                        placeholder="Nội dung"
                                        multiline
                                        rows={8}
                                        maxRows={20}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-sm-3 d-flex justify-content-center">
                                <Button variant="contained">Gửi thông tin</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
