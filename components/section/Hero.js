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
import Slider from "../slider/Slider";

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
            <Slider />
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
