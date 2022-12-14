import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_BACKEND } from "../../constants";
import { useParams, useNavigate } from "react-router";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { categoryMock } from "../../mock/CategoryMock";
import { height } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/reducer/CartSlice";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";


export const DetailCategory = () => {
  const dispatch = useDispatch();
  const { items, isLoaded } = useSelector((state) => state.cartReducer);
  const { data, loaded } = useSelector(state => state.companyStored);
  const [loading,setLoading]=useState(true);
  const navigate = useNavigate();

  const [bigCategory, setBigCategory] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState(categoryMock);
  const [selected, setSelected] = useState(false);
  const [itemSelected, setItemSelected] = useState(categoryMock);
  const [listMenu, setListMenu] = useState([]);
  const [upr, setParam] = useSearchParams();
  const price = upr.get('price');
  const handleNeedSupport = () => {
    //console.log(data)
    window.location.href = `tel:${data[0].attributes.phone}`
  }
  //filters[price][$lte]=${parseInt(to) + 100000}
  const handleAddToCart = (data) => {
    dispatch(
      addToCart({
        ID: data.id,
        name: data.attributes.name,
        amount: 1,
        price: data.attributes.price,
      })
    );
    toast("Thêm vào giỏ hàng thành công");
  };
  const handleOpen = (idItem) => {
    setItem(bigCategory.find((e) => e.id == idItem));
    setListMenu(bigCategory.filter((e) => e.id != idItem));
    setOpen(true);
  };
  const handleSelected = (idItem) => {
    const categorySelected = bigCategory.find((e) => e.id == idItem);
    if (categorySelected) {
      setItemSelected(bigCategory.find((e) => e.id == idItem));
      setSelected(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    var api =`/api/categories?filters[price][$lte]=${(parseInt(price) + 100000)}&filters[price][$gte]=${(parseInt(price))}&filters[big_categories][id]=${id}&populate=deep,3`
    axios
      .get(URL_BACKEND + api)
      .then((rs) => {
        let { data } = rs;
     
        setBigCategory(data.data);

        setLoading(false);

      });

    return () => { };
  }, []);
  if(loading){
    return  <LoadingOverlay
    className="full-width"
    active={true}
    spinner
    text="Loading..."
  >
    <div className="full-width" style={{ height: 1000 }}></div>
  </LoadingOverlay>;
  }else{
    return (
      <div className="full-width menulist">
        <div className="container">
          <div className="row block" >
            <div className="row d-flex justify-content-center">
              <div className="col-sm-12 d-flex justify-content-center">
                <h3 className="hignl-title second">Danh sách Menu</h3>
              </div>
            </div>
            <div className="row">
              {bigCategory.map((e, index) => {
                if (e.attributes.FromTime == null) {
                  e.attributes.FromTime = "";
                }
                if (e.attributes.EndTime == null) {
                  e.attributes.EndTime = "";
                }
            //    console.log(e.attributes.price>(parseInt(price) + 100000))
                if (parseInt(e.attributes.price) > (parseInt(price) + 100000)||parseInt(e.attributes.price) < parseInt(price)) {
                  return null;
                } else {
                  return (
                    <div key={index} className="col-sm-12">
                      <div>
                        <div className="row">
                          <div className="col-sm-12 col-md-6 col-lg-6">
                            <div className="row mt-2 mb-2">
                              {new Array(4).fill().map((product, index) => {
                                //  //console.log(product);
                                let viewMore = false;
                                let urlImg = "";
                                //   //console.log(e.attributes.products.data.length);
                                if (e.attributes.products.data.length < index + 1 || e.attributes.products.data[index].attributes.avatar.data == null) {
                                  urlImg = "/img_emty.png";
                                } else {
                        
                                  urlImg =
                                    URL_BACKEND +
                                    e.attributes.products.data[index].attributes
                                      .avatar.data.attributes.url;
                                      console.log(e.attributes.products.data.length)
                                     if( e.attributes.products.data.length>4&&index+1==4){
                                       viewMore=true;
                                     }
                                }
                                return (
                                  <div
                                    key={index}
                                    className="col-6 col-sm-6 p-1 ml-0 mr-1 d-flex justify-content-center"
                                  >
                                    <img
                                      src={urlImg}
                                      className={viewMore==true?"item-img image-container":"item-img"}
                                      width={"100%"}
                                      alt=""
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6 ">
                            <div className="row d-flex justify-content-between mt-2">
                              <div className="col-7">
                                <h5 style={{ fontWeight: 700 }}>
                                  {e.attributes.name}
                                </h5>
                              </div>
                              <div className="col-5 d-flex justify-content-end">
                                <Button
                                  variant="contained"
                                  color="warning"
                                  onClick={() => {
                                    handleOpen(e.id);
                                  }}
                                >
                                  So sánh
                                </Button>
                              </div>
  
                              <div
                                className="row m-2 flex-column justify-content-center"
  
                              >
                                <div
                                  className="col-sm-12 col-md-12 d-flex flex-wrap description-wrapper"
  
                                >
                                  {e.attributes.products.data.map(
                                    (product, index) => {
                                      if (index > 15) {
                                        return;
  
                                      } else {
                                        return (
                                          <p key={index} className="description">{`${index + 1
                                            }. ${product.attributes.name}`}</p>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                                <div className="col-sm-12">
                                  <div className="row d-flex justify-content-around">
                                    <div className="col">
                                      <Button
                                        variant="contained"
                                        color="warning"
                                        fullWidth
                                        startIcon={<AddShoppingCartIcon />}
                                        onClick={() => {
                                          handleAddToCart(e);
                                        }}
                                      >
                                        Giỏ hàng
                                      </Button>
                                    </div>
                                    <div className="col">
                                      <Button
                                        fullWidth
                                        color="error"
                                        variant="contained"
                                        onClick={() => {
                                          handleAddToCart(e);
                                          navigate('/cart')
                                        }}
                                      >
                                        Đặt tiệc
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="row flex-column mt-4">
                                    <h1 className="description">
                                      Đơn giá{": "}
                                      <strong>
                                        {parseInt(
                                          e.attributes.price
                                        ).toLocaleString("it-IT", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </strong>
                                    </h1>
                                    <h1 className="description">
                                      Số lượng tối thiểu{": "}
                                      <strong>{e.attributes.amout}</strong>
                                    </h1>
                                    <h1 className="description">
                                      Thời gian phù hợp{": "}
                                      <strong>{`${e.attributes.FromTime.substring(
                                        0,
                                        5
                                      )} - ${e.attributes.EndTime.substring(
                                        0,
                                        5
                                      )}`}</strong>
                                    </h1>
                                    <h1 className="description">
                                      Supplier{": "}
                                      <strong>{`${e.attributes.TypeMenu == null ? "" : e.attributes.TypeMenu}`}</strong>
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Divider className="mb-2" style={{ color: "gray" }} />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: "80%", height: "90%", flexDirection: "column" }}>
            <div
              className="row d-flex justify-content-center mt-4 modal-popup-wrapper"
              style={{ overflowY: "scroll" }}
            >
  
              <div className="row align-items-center pt-2 compare-header" style={{ padding: "0 24px" }}>
                <div className="col-md-6 compare-header-item">
                  <h3 className="mb-0">So sánh menu đặt tiệc</h3>
                </div>
                <div className="col-md-6 compare-header-item" style={{ padding: "0 0 0 24px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Chọn loại muốn so sánh
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={itemSelected.id}
                      label="Chọn loại muốn so sánh"
                      onChange={(e) => {
                        ////console.log(e);
                        handleSelected(e.target.value);
                      }}
                    >
                      {listMenu.map((e, index) => {
                        return (
                          <MenuItem key={index} value={e.id}>
                            {e.attributes.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
  
              <div className="col-12 mt-2">
              </div>
  
              {/* <div className="container"> */}
              <div className="row ">
  
                <div className="col-12 col-md-6 compare-item" >
  
                  <div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row mt-2 mb-2">
                          {new Array(4).fill().map((product, index) => {
                            //  //console.log(product);
                            let urlImg = "";
                            if (
                              item.attributes.products.data.length <
                              index + 1 || item.attributes.products.data[index].attributes.avatar.data == null
                            ) {
                              urlImg = "/img_emty.png";
                            } else {
                              urlImg =
                                URL_BACKEND +
                                item.attributes.products.data[index].attributes
                                  .avatar.data.attributes.url;
                            }
                            return (
                              <div
                                key={index}
                                className=" col-6 col-sm-6 p-1 ml-0 mr-1 d-flex justify-content-center"
                              >
                                {/* itemSelected.attributes.products.data */}
                                <img
                                  src={urlImg}
                                  className="item-img"
                                  width={"100%"}
                                  alt=""
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="">
                        <div
                          className="row flex-column justify-content-center"
                          style={{ height: "100%", width: "100%" }}
                        >
                          <div className="row d-flex justify-content-between">
                            <div className="col-12">
                              <h5 style={{ fontWeight: 700 }}>
                                {item.attributes.name}
                              </h5>
                            </div>
                          </div>
  
                          <div
                            className="row flex-column justify-content-between"
  
                          >
                            <div className="col-sm-12 col-md-12 d-flex flex-wrap description-wrapper">
                              {item.attributes.products.data.map(
                                (product, index) => {
                                  return (
                                    <p className="description">{`${index + 1}. ${product.attributes.name
                                      }`}</p>
                                  );
                                }
                              )}
                            </div>
  
                            <div className="col-sm-12">
                              <div className="row d-flex justify-content-around">
                                <div className="col">
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    fullWidth
                                    onClick={handleNeedSupport}
                                  >
                                    Cần hỗ trợ thêm
                                  </Button>
                                </div>
                                <div className="col">
                                  <Button
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                    onClick={() => {
                                      handleAddToCart(item);
                                      navigate('/cart');
                                    }}
                                  >
                                    Đặt tiệc
                                  </Button>
                                </div>
                              </div>
                              <div className="row flex-column mt-4">
                                <h1 className="description">
                                  Đơn giá{": "}
                                  <strong>
                                    {parseInt(
                                      item.attributes.price
                                    ).toLocaleString("it-IT", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </strong>
                                </h1>
                                <h1 className="description">
                                  Số lượng tối thiểu{": "}
                                  <strong>{item.attributes.amout}</strong>
                                </h1>
                                <h1 className="description">
                                  Thời gian phù hợp{": "}
                                  <strong>{`${item.attributes.FromTime.substring(
                                    0,
                                    5
                                  )} - ${item.attributes.EndTime.substring(
                                    0,
                                    5
                                  )}`}</strong>
                                </h1>
                                <h1 className="description">
                                  Supplier{": "}
                                  <strong>{`${item.attributes.TypeMenu == null ? "" : item.attributes.TypeMenu}`}</strong>
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                </div>
                <div className="col-12 col-md-6 compare-item">
                  {selected == true ? (
                    <div className="col-sm-12">
  
                      <div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="row mt-2 mb-2">
                              {new Array(4).fill().map((product, index) => {
                                //  //console.log(product);
                                let urlImg = "";
                                if (
                                  itemSelected.attributes.products.data.length <
                                  index + 1 || item.attributes.products.data[index].attributes.avatar.data == null
                                ) {
                                  urlImg = "/img_emty.png";
                                } else {
                                  urlImg =
                                    URL_BACKEND +
                                    itemSelected.attributes.products.data[index]
                                      .attributes.avatar.data.attributes.url;
                                }
                                return (
                                  <div
                                    key={index}
                                    className=" col-6 col-sm-6 p-1 ml-0 mr-1 d-flex justify-content-center"
                                  >
                                    {/* itemSelected.attributes.products.data */}
                                    <img
                                      src={urlImg}
                                      className="item-img"
                                      width={"100%"}
                                      alt=""
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div
                              className="row flex-column justify-content-center"
                              style={{ height: "100%", width: "100%" }}
                            >
                              <div className="row d-flex justify-content-between">
                                <div className="col-12">
                                  <h5 style={{ fontWeight: 700 }}>
                                    {itemSelected.attributes.name}
                                  </h5>
                                </div>
                              </div>
  
                              <div
                                className="row flex-column justify-content-between"
                              >
                                <div className="col-sm-12 col-md-12 d-flex flex-wrap description-wrapper">
                                  {itemSelected.attributes.products.data.map(
                                    (product, index) => {
                                      return (
                                        <p className="description">{`${index + 1
                                          }. ${product.attributes.name}`}</p>
                                      );
                                    }
                                  )}
                                </div>
                                <div className="col-sm-12">
                                  <div className="row d-flex justify-content-around">
                                    <div className="col">
                                      <Button
                                        variant="contained"
                                        color="warning"
                                        fullWidth
                                        onClick={handleNeedSupport}
                                      >
                                        Cần hỗ trợ thêm
                                      </Button>
                                    </div>
                                    <div className="col">
                                      <Button
                                        fullWidth
                                        color="error"
                                        variant="contained"
                                        onClick={() => {
                                          handleAddToCart(itemSelected);
                                          navigate('/cart');
                                        }}
                                      >
                                        Đặt tiệc
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="row flex-column mt-4">
                                    <h1 className="description">
                                      Đơn giá{": "}
                                      <strong>
                                        {parseInt(
                                          itemSelected.attributes.price
                                        ).toLocaleString("it-IT", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </strong>
                                    </h1>
                                    <h1 className="description">
                                      Số lượng tối thiểu{": "}
                                      <strong>{itemSelected.attributes.amout}</strong>
                                    </h1>
                                    <h1 className="description">
                                      Thời gian phù hợp{": "}
                                      <strong>{`${itemSelected.attributes.FromTime.substring(
                                        0,
                                        5
                                      )} - ${itemSelected.attributes.EndTime.substring(
                                        0,
                                        5
                                      )}`}</strong>
                                    </h1>
                                    <h1 className="description">
                                      Supplier{": "}
                                      <strong>{`${itemSelected.attributes.TypeMenu}`}</strong>
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {/* </div> */}
          </Box>
        </Modal>
      </div>
    );
  }
 
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  display: "flex",
  overflow: "scroll",
  justifyContent: "center",
  alignItems: "center",
  px: 2,
};
