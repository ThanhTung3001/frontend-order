import React, { useState, useEffect } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import axios from "axios";
import { URL_BACKEND } from "../../constants";
export const BigCategory = () => {
  const [bigCategory, setBigCategory] = useState([]);
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/categories?populate=*`).then((rs) => {
      let { data } = rs;
      // console.log(rs);
      //  console.log(data.data);
      setBigCategory(data.data);
    });

    return () => {};
  }, []);

  return (
    <div className="full-width">
      <div className="container">
        <div className="row block">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 d-flex justify-content-center">
              <h3 className="hignl-title second">Các loại hình tiệc</h3>
            </div>
          </div>
          <div className="row">
            {bigCategory.map((e, index) => {
              return (
                <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                  <div className="row">
                    <div className="col">
                      <img
                        className="item-img"
                        src={
                          URL_BACKEND + e.attributes.avatar.data.attributes.url
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="row p-2">
                    <div className="col">
                      <p className="sub-1">{e.attributes.name}</p>
                    </div>
                    <div className="col d-flex justify-content-end ">
                      {parseInt(e.attributes.price).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
