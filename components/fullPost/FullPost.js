import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../../redux/slices/users";

// utils
import { getAuthors } from "../../utils/author";

// parser html
import ReactHtmlParser from "react-html-parser";

// api
import { API_URL } from "../api";

import * as moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const FullPost = ({ post }) => {
  const [textPost, setTextPost] = useState("");
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const user = getAuthors.getAuthor(users.items, post.user_id);

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
                <Link href={`/author/${post.user_id}`}>
                  <a>
                    <Image
                      src={
                        user.imageUrl !== null
                          ? `${API_URL}image/${user.imageUrl}`
                          : `${API_URL}image/1.jpg`
                      }
                      className="w40 mr-2 avatar-img"
                      alt="author"
                      style={{
                        borderRadius: "50%",
                        boxShadow: "0 2px 15px red",
                      }}
                      width={40}
                      height={40}
                      layout="intrinsic"
                    />
                  </a>
                </Link>
                <div style={{ marginLeft: "12px" }}>
                  <Link href={`/author/${post.user_id}`}>
                    {getAuthors.getAuthorName(users.items, post.user_id)}
                  </Link>
                </div>
              </li>
              <li className="list-inline-item dflex">
                Просмотр
                <div className="c-black ml-1">{post.viewCount}</div>
              </li>
              <li className="list-inline-item">
                {moment(post.createdAt).format("LL")}
              </li>
            </ul>
          </div>
        </div>
        <div className="featured-image">
          <Image
            src={`${API_URL}image/${post.imageUrl}`}
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
