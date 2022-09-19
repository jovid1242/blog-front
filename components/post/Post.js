import { useEffect, useState } from "react";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import * as moment from "moment";
import { short } from "../../utils/short";
import "moment/locale/ru";
import Image from "next/image";
import eyeIcon from "../../assets/eye-solid.svg";
moment.locale("ru");

const Post = ({ title, text, id, date, imageUrl, view }) => {
  const [textPost, setTextPost] = useState("");
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
                src={imageUrl}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
                width={1000}
                height={1000}
                className="imgCover"
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
                src="http://backend.1026361-ca72388.tmweb.ru/api/image/1.jpg"
                className="author mr-2"
                alt="author"
                style={{ borderRadius: "50%" }}
                width={40}
                height={40}
              />
              <div style={{ marginLeft: "12px" }}>Repost</div>
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
