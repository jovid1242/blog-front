import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

//
import { fetchPopularPost } from "../../redux/slices/popularPosts";
import { fetchResentPost } from "../../redux/slices/resentPosts";

// axios
import http from "../http";

// components
import PostTabs from "../postTabs/PostTabs";

// api
import { API_URL } from "../api";

const Hero = () => {
  const [banner, setBanner] = useState({});
  const dispatch = useDispatch();
  const popularPosts = useSelector((state) => state.popularPosts);
  const resentPosts = useSelector((state) => state.resentPosts);
  // const posts = useSelector((state) => state.posts);

  let data = {
    popularPosts,
    resentPosts,
  };

  useEffect(() => {
    dispatch(fetchPopularPost());
    dispatch(fetchResentPost());
    http.get("/banners").then((res) => {
      setBanner(res.data.data[0]);
    });
  }, []);
  return (
    <section id="hero">
      <div className="container-xl">
        <div className="row gy-4">
          <div className="col-lg-8">
            <div className="post featured-post-lg">
              <div className="details clearfix">
                <h2 className="post-title">
                  <Link href="/category/1">
                    <a>{banner?.title}</a>
                  </Link>
                </h2>
                <ul className="meta list-inline mb-0">
                  <li className="list-inline-item">
                    <Link href="/">
                      <a>Repost</a>
                    </Link>
                  </li>
                  <li className="list-inline-item">Сегодня в 00:01</li>
                </ul>
              </div>
              <Link href="/category/1">
                <a>
                  <div className="thumb rounded">
                    <div
                      className="inner data-bg-image"
                      style={{
                        backgroundImage: `url(${API_URL}image/${banner?.imageUrl}
                      )`,
                      }}
                    ></div>
                  </div>
                </a>
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <PostTabs data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
