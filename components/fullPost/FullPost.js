import { useEffect, useState } from "react";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import * as moment from "moment";
import "moment/locale/ru";
import Image from "next/image";
import { useMemo } from "react";
moment.locale("ru");

const FullPost = ({ post }) => {
  const [textPost, setTextPost] = useState("");

  const parseText = () => {
    var textPostToHtml = ReactHtmlParser(post.text);
    setTextPost(textPostToHtml);
  };

  useEffect(() => {
    parseText();
  }, []);

  return (
    <div className="col-lg-8">
      <div className="post post-single">
        <div className="post-header">
          <h1 className="title mt-0 mb-3">{post.title}</h1>
          <ul className="meta list-inline mb-0">
            <li className="list-inline-item">
              <Link href="/">
                <a className="w40">
                  <Image
                    src="http://backend.1026361-ca72388.tmweb.ru/api/image/1.jpg"
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50% ",
                    }}
                    priority
                    className="author"
                    alt="author"
                  />
                  Repost
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              {moment(post.createdAt).format("LL")}
            </li>
          </ul>
        </div>
        <div className="featured-image">
          <Image
            src={post?.imageUrl}
            width={1000}
            height={500}
            className="imgCover"
            priority
            alt="post-title"
          />
        </div>
        <div className="post-content clearfix">
          <p>{textPost}</p>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
