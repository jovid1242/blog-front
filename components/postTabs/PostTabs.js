import React, { useState } from "react";
import Link from "next/link";
import { short } from "../../utils/short";
import * as moment from "moment";
import "moment/locale/ru";
import Image from "next/image";
moment.locale("ru");

const PopularPosts = ({ data }) => {
  const [activeTab, setActiveTab] = useState("popularPosts");

  const btnDate = [
    {
      id: 12,
      name: "Популярный",
      status: "popularPosts",
    },
    {
      id: 14,
      name: "Недавний",
      status: "resentPosts",
    },
  ];

  return (
    <div className="post-tabs rounded bordered">
      <ul className="nav nav-tabs nav-pills nav-fill" role="tablist">
        {btnDate?.map((item) => {
          return (
            <li className="nav-item" role="presentation" key={item.id}>
              <button
                type="button"
                className={
                  activeTab === item.status ? "nav-link active" : "nav-link"
                }
                onClick={() => setActiveTab(item.status)}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        <div className="lds-dual-ring"></div>
        <div
          aria-labelledby="popular-tab"
          className="tab-pane fade show active"
        >
          {data[activeTab][activeTab]?.items?.map((elm) => {
            return (
              <div className="post post-list-sm circle" key={elm.id}>
                <div className="thumb circle">
                  <Link href={`/post/${elm.id}`}>
                    <a>
                      <div className="inner">
                        <Image
                          src={elm?.imageUrl}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          width={50}
                          height={50}
                          priority
                          alt="post-title"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="details clearfix">
                  <h6 className="post-title my-0">
                    <Link href={`/post/${elm.id}`}>
                      <a>{short.shortText(elm.title, 30)}</a>
                    </Link>
                  </h6>
                  <ul className="meta list-inline mt-1 mb-0">
                    <li className="list-inline-item">
                      {moment(elm.createdAt).format("LL")}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularPosts;
