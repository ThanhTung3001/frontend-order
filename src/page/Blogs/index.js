import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_BACKEND } from "../../constants";

export const Blogs = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/blogs?populate=*`).then((rs) => {
      let { data } = rs;
      // data.data = data.data.filter((e, index) => index <= 2);
      setBlog(data.data);
    });

    return () => {};
  }, []);

  return (
    <div className="full-width">
      <div className="container">
        <div className="row block">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 d-flex justify-content-center">
              <h3 className="hignl-title second">Blogs</h3>
            </div>
          </div>
          <div className="row justify-content-center">
            {blog.map((e, index) => {
              if (index < 2) {
                return (
                  <div className="col-sm-12 col-md-12 col-lg-5 justify-content-center">
                    <Link
                      to={`/blogs/${e.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="row">
                        <div className="col">
                          <img
                            className="item-img"
                            style={{
                              width: "100%",
                            }}
                            src={
                              URL_BACKEND +
                              e.attributes.Media.data.attributes.url
                            }
                            alt={
                              e.attributes.Media.data.attributes.alternativeText
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="">
                          <p className="description mt-3 center">
                            {moment(e.attributes.publishedAt).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </p>
                          <h3 className="title-article center">
                            {e.attributes.title}
                          </h3>

                          <p className="description center">
                            {e.attributes.description.substring(0, 230)}
                            ...
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-3">
                    <Link
                      to={`/blogs/${e.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="row">
                        <div className="col">
                          <img
                            className="item-img"
                            src={
                              URL_BACKEND +
                              e.attributes.Media.data.attributes.url
                            }
                            alt={
                              e.attributes.Media.data.attributes.alternativeText
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <h3
                          className="title-article center"
                          style={{ fontSize: 16, lineHeight: 1.5 }}
                        >
                          {e.attributes.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
