import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

import withPrivateRoute from "../components/withPrivateRoute";
import { setUser } from "../redux/slices/auth/authSlice";

// components
import Loading from "../components/loader";
import http from "../components/http";
import ProfileHeader from "../components/profile/profileHeader";
import UserInfo from "../components/profile/userInfo";
import UserPosts from "../components/profile/userPosts";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorPosts } from "../redux/slices/author/author";

export default function Profile() {
  const { authorPosts } = useSelector((state) => state.author);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getUser = () => {
    setLoading(true);
    dispatch(fetchAuthorPosts());
    http
      .get("/auth/me")
      .then((res) => {
        dispatch(setUser(res.data.user));
        setCookie("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Loading loading={authorPosts.isLoad} />
      <div className="container-xl">
        <ProfileHeader />
        <div className="row gy-4 mt-4">
          <div className="col-lg-4">
            <UserInfo />
          </div>
          <div className="col-lg-8">
            <UserPosts />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { locale } = ctx;
  withPrivateRoute(ctx);
  return {
    props: {},
  };
};
