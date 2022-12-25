import React from "react";
import Link from "next/link";
import { Carousel } from "antd";

import * as moment from "moment";

// api
import { API_URL } from "../api";

// utils
import { getAuthors } from "../../utils/author";
import { short } from "../../utils/short";
import { translitRuEnLowercase } from "../../utils/translateUrl";

// redux
import { useSelector } from "react-redux";

// moment
import "moment/locale/ru";
moment.locale("ru");

const Slider = () => {
  const popularPosts = useSelector((state) => state.popularPosts);
  const { users } = useSelector((state) => state.users);

  const getUser = (user_id) => {
    return getAuthors.getAuthor(users.items, user_id);
  };

  return (
    <>
      <Carousel dotPosition={"bottom"} autoplay>
        {popularPosts?.popularPosts?.items?.map((elm, i) => {
          return (
            <div className="post featured-post-lg" key={elm + i}>
              <div className="details clearfix">
                <h2 className="post-title">
                  <Link
                    href={`/post/${translitRuEnLowercase(elm.title)}/${elm.id}`}
                  >
                    <a>{short.shortText(elm.title, 30)}</a>
                  </Link>
                </h2>
                <ul className="meta list-inline mb-0">
                  <li className="list-inline-item">
                    <Link href={`/author/${elm.user_id}`}>
                      <a>{getUser(elm.user_id)?.name}</a>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    {moment(elm.createdAt).format("LL")}
                  </li>
                </ul>
              </div>
              <Link
                href={`/post/${translitRuEnLowercase(elm.title)}/${elm.id}`}
              >
                <a>
                  <div className="thumb rounded">
                    <div
                      className="inner data-bg-image"
                      style={{
                        backgroundImage: `url(${API_URL}image/${elm.imageUrl})`,
                      }}
                    ></div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default Slider;
