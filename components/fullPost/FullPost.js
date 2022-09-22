import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../../redux/slices/users";

import ReactHtmlParser from "react-html-parser";

import * as moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const FullPost = ({ post }) => {
  const [textPost, setTextPost] = useState("");
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const parseText = () => {
    var textPostToHtml = ReactHtmlParser(post.text);
    setTextPost(textPostToHtml);
  };

  useEffect(() => {
    parseText();
  }, []);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, []);

  return (
    <div className="col-lg-8">
      <div className="post post-single">
        <div className="post-header">
          <h1 className="title mt-0 mb-3">{post.title}</h1>
          <div className="details">
            <ul className="meta list-inline mb-0 d-flex align-items-center">
              <li className="list-inline-item d-flex align-items-center">
                <Image
                  src="http://backend.1026361-ca72388.tmweb.ru/api/image/1.jpg"
                  className="author mr-2"
                  alt="author"
                  style={{ borderRadius: "50%" }}
                  width={40}
                  height={40}
                />
                <div style={{ marginLeft: "12px" }}>
                  {users.items.map((elm) => {
                    return <>{elm.id == post.user_id ? elm.name : "Repost"}</>;
                  })}
                </div>
              </li>
              <li className="list-inline-item">
                {moment(post.createdAt).format("LL")}
              </li>
            </ul>
          </div>
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
