import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

import withPrivateRoute from "../components/withPrivateRoute";

// components
import Loading from "../components/loader";
import http from "../components/http";
import ProfileHeader from "../components/profile/profileHeader";
import UserInfo from "../components/profile/userInfo";
import UserPosts from "../components/profile/userPosts";
import { Col, Row } from "antd";

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const getUser = () => {
    setLoading(true);
    http
      .get("/auth/me")
      .then((res) => {
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
      <Loading loading={loading} />
      <div className="container-xl">
        <ProfileHeader />
        <Row className="mt-4">
          <Col span={12}>
            <UserPosts />
          </Col>
          <Col span={12}>
            <UserInfo />
          </Col>
        </Row>
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
