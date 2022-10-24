import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { URL_BACKEND } from "../../constants";
import parse from "html-react-parser";
import moment from "moment";

export const FilterCategory = () => {
  const [bigCategory, setBigCategory] = useState([]);
  const [useParam, setParam] = useSearchParams();
  const amount = useParam.get("amount");
  const time = useParam.get("time") + ":00.000";
  const to = useParam.get("to");
  useEffect(() => {
    axios
      .get(
        URL_BACKEND +
        `/api/big-categories?populate=*&filters[FromTime][$lte]=${time}&filters[amount][$lte]=${amount}&filters[price][$lte]=${to}`
      )
      .then((rs) => {
        let { data } = rs;
        //console.log(data.data);
        setBigCategory(data.data);
      });

    return () => { };
  }, []);
  return (
    <div className="full-width">
      <div className="container">
        <div className="row block">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center">
              <h3 className="hignl-title second p-3">Danh sách loại hình</h3>
            </div>
          </div>
          <div className="row">
            {bigCategory.map((e) => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/cac-loai-tiec/${e.id}`}
                  >
                    <div className="row">
                      <div className="col">
                        <img
                          className="item-img"
                          src={
                            URL_BACKEND +
                            e.attributes.Avatar.data.attributes.url
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="row">
                      <h3 className="title-category center mt-2">
                        {e.attributes.name}
                      </h3>

                      <p className="description-primary center mb-1">
                        {parse(e.attributes.Description)}
                      </p>
                      <p className="description-time center">
                        Khung giờ
                        {` ${e.attributes.FromTime.substring(
                          0,
                          5
                        )} - ${e.attributes.EndTime.substring(0, 5)}`}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
