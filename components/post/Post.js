import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import Image from "next/image";
import * as moment from "moment";

// parser html
import ReactHtmlParser from "react-html-parser";

// utils
import { short } from "../../utils/short";
import { getAuthors } from "../../utils/author";
import { translitRuEnLowercase } from "../../utils/translateUrl";

// api
import { API_URL } from "../api";

// moment
import "moment/locale/ru";
import { convertDataToHtml } from "../../utils/convertDataToHtml";
moment.locale("ru");

const Post = ({ title, text, id, date, imageUrl, user_id, view }) => {
  const [textPost, setTextPost] = useState("");
  const { users } = useSelector((state) => state.users);

  const user = getAuthors.getAuthor(users.items, user_id);
  console.log('-ddddddd', user);

  const IsJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const parseText = () => {
    if (IsJsonString(text)) {
      const textPostToHtml = ReactHtmlParser(
        convertDataToHtml(JSON.parse(text).blocks)
      );
      setTextPost(short.shortText(textPostToHtml[0].props.children[1], 160)); 
    } else {
      const textPostToHtml = ReactHtmlParser(short.shortText(text, 160))
      setTextPost(textPostToHtml); 
    }
  };

  useEffect(() => {
    parseText();
  }, []);

  return (
    <div className="col-md-12 col-sm-6 text-content">
      <div className="post post-list clearfix">
        <div className="thumb rounded pb-4">
          <span className="post-format-sm">
            <i className="icon-picture"></i>
          </span>
          <Link href={`/post/${translitRuEnLowercase(title)}/${id}`}>
            <a className="inner w100">
              <Image
                src={`${API_URL}image/${imageUrl}`}
                // style={{
                //   width: "100%",
                //   height: 200,
                //   objectFit: "cover",
                //   borderRadius: "15px",
                // }}
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
              <Link href={`/author/${user_id}`}>
                <a>
                  <Image
                    src={
                      !user.imageUrl
                        ? "/static/insta-2.jpg"
                        : `${API_URL}image/${user.imageUrl}`
                    }
                    className="author-picture mr-2 border50"
                    alt="author"
                    width={50}
                    height={50}
                    layout="intrinsic"
                  />
                </a>
              </Link>

              <div style={{ marginLeft: "12px" }}>
                <Link href={`/author/${user_id}`}>
                  <a>{getAuthors.getAuthorName(users.items, user_id)}</a>
                </Link>
              </div>
            </li>
            <li className="list-inline-item d-flex align-items-center">
              <Link href="/">
                <a>
                  <Image
                    src="/static/view-eye-svgrepo-com.svg"
                    alt="eye icon"
                    className="svg-path"
                    width={12}
                    height={12}
                  />
                </a>
              </Link>
              <div style={{ marginLeft: "6px" }}>{view}</div>
            </li>
            <li className="list-inline-item">{moment(date).format("LL")}</li>
          </ul>
          <h5 className="post-title">
            <Link href={`/post/${translitRuEnLowercase(title)}/${id}`}>
              <a>{title}</a>
            </Link>
          </h5>
          <span className="excerpt mb-0 ">{textPost}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
