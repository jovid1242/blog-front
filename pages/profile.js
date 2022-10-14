// import { useRouter } from "next/router";
// import { getCookie } from "cookies-next";
// import { useEffect } from "react";

import withPrivateRoute from "../components/withPrivateRoute";

// components
// import Loader from "../components/loader";
import ProfileHeader from "../components/profile/profileHeader";
import UserInfo from "../components/profile/userInfo";
import UserPosts from "../components/profile/userPosts";
import { Col, Row } from "antd";

export default function Profile() {
  return (
    <>
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
