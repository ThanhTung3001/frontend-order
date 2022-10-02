import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_BACKEND } from "../../constants";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import "./style.css";
import parse from "html-react-parser";

export const BlogDetails = () => {
  const { id } = useParams();
  // const [article, setArticle] = useState({});
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/blogs/${id}?populate=*`).then((rs) => {
      const { data } = rs;
      const article = data.data.attributes;
      setImg(URL_BACKEND + article.Media.data.attributes.url);

      setTitle(article.title);
      setTime(article.publishedAt);
     

      article.Content = article.Content.replaceAll(
        `/uploads/`,
        `${URL_BACKEND}/uploads/`
      );
      setContent(article.Content);
    });
  }, []);

  return (
    <div className="full-width">
      <div className="container">
        <div className="row block">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 d-flex justify-content-center">
              <h2 className=" second">{title}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img style={{ width: "100%" }} src={img} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <h3 className="description mt-3">
                {moment(time).format("DD/MM/YYYY HH:mm")}
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col" id="content">
              {parse(content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
