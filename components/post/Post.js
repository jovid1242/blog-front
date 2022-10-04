import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import Image from "next/image";
import * as moment from "moment";

// parser html
import ReactHtmlParser from "react-html-parser";

// utils
import imageLoader from "../../utils/imageLoader";
import { short } from "../../utils/short";
import getAuthor from "../../utils/author";

// api
import { API_URL } from "../api";

// moment
import "moment/locale/ru";
import eyeIcon from "../../assets/eye-solid.svg";
moment.locale("ru");

const Post = ({ title, text, id, date, imageUrl, author, view }) => {
  const [textPost, setTextPost] = useState("");
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    const textPostToHtml = ReactHtmlParser(short.shortText(text, 350));
    setTextPost(textPostToHtml);
  }, []);

  return (
    <div className="col-md-12 col-sm-6">
      <div className="post post-list clearfix">
        <div className="thumb rounded pb-4">
          <span className="post-format-sm">
            <i className="icon-picture"></i>
          </span>
          <Link href={`/post/${id}`}>
            <a className="inner w100">
              <Image
                src={`${API_URL}image/${imageUrl}`}
                loader={imageLoader}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
                width={1000}
                height={1000}
                className="imgCover w100"
                priority
                alt="post-title"
              />
            </a>
          </Link>
        </div>
        <div className="details">
          <ul className="meta list-inline mb-3 d-flex align-items-center">
            <li className="list-inline-item d-flex align-items-center">
              <Image
                src={`${API_URL}image/1.jpg`}
                className="w40 mr-2"
                alt="author"
                style={{ borderRadius: "50%" }}
                width={40}
                height={40}
                layout="intrinsic"
              />
              <div style={{ marginLeft: "12px" }}>
                {getAuthor(users.items, author)}
              </div>
            </li>
            <li className="list-inline-item d-flex align-items-center">
              <Link href="/">
                <a>
                  <Image src={eyeIcon} alt="eye icon" width={10} height={10} />
                </a>
              </Link>
              <div style={{ marginLeft: "6px" }}>{view}</div>
            </li>
            <li className="list-inline-item">{moment(date).format("LL")}</li>
          </ul>
          <h5 className="post-title">
            <Link href={`/post/${id}`}>
              <a>{short.shortText(title, 50)}</a>
            </Link>
          </h5>
          <p className="excerpt mb-0">{textPost}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
