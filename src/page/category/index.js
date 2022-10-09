import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_BACKEND } from "../../constants";

export const Category = () => {
  const [bigCategory, setBigCategory] = useState([]);
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/big-categories?populate=*`).then((rs) => {
      let { data } = rs;
      console.log(data.data);
      setBigCategory(data.data);
    });

    return () => {};
  }, []);
  return (
    <div className="full-width">
      <div className="container">
        <div className="row py-4 justify-content-center">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-4 d-flex justify-content-center">
              <h3 className="hignl-title second">Các loại tiệc</h3>
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
                      <h3 className="title-article center">
                        {e.attributes.name}
                      </h3>

                      <p className="description center">
                        {e.attributes.Description.substring(0, 230)}
                        ...
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
