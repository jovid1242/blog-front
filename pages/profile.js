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
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const getUser = () => {
    dispatch(fetchAuthorPosts());
    http
      .get("/auth/me")
      .then((res) => {
        dispatch(setUser(res.data.user));
        setCookie("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Loading loading={authorPosts.isLoad} />
      <div className="container-xl">
        <ProfileHeader user={user} />
        <div className="row mt-4">
          <div className="col-lg-12">
            <UserInfo />
          </div>
          <div className="col-lg-12">
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
