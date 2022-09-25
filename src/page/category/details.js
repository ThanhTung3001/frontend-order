import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_BACKEND } from "../../constants";
import { useParams } from "react-router";

export const DetailCategory = () => {
  const [bigCategory, setBigCategory] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(URL_BACKEND + `/api/big-categories/${id}?populate=deep,3`)
      .then((rs) => {
        let { data } = rs;
        console.log(data.data.attributes.categories.data);
        setBigCategory(data.data.attributes.categories.data);
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
