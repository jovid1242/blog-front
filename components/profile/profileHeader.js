import {useEffect, useState } from "react";
import Image from "next/image"; 
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { Button, Modal, Form, Input, Space, Badge, Avatar } from "antd";
import { toast } from "react-toastify";

// api
import http from "../http";
import { API_URL } from "../api";

// slices
import { logout } from "../../redux/slices/auth/authSlice";
import { setLoad } from "../../redux/slices/author/author";

// icons
import { RollbackOutlined } from "@ant-design/icons";

// styles
import styles from "../../styles/profile.module.scss";

const ProfileHeader = ({ user }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [fields, setFields] = useState([]);

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    // console.log("values", values);
    const data = new FormData();
    data.append("social", values.social);
    data.append("info", values.info);
    data.append("image", values.image.target.files[0]);
    dispatch(setLoad(true));
    http
      .post("/user/info", data)
      .then((res) => {
        onReset();
        toast.success("Профиль успешно изменено!");
        // window.location.reload();
      })
      .catch(function (errors) {
        toast.error(`Размер изображения должен быть меньше 512Кб!`);
      })
      .finally(() => {
        dispatch(setLoad(false));
      });
  };

  const isLogout = () => {
    dispatch(logout());
    router.push("/auth/login").then((res) => {});
  };

  useEffect(() => {
    setFields([
      {
        name: ["social"],
        value: user?.social,
      },
      {
        name: ["info"],
        value: user?.info,
      },
    ]);
  }, [user]);

  return (
    <div className={styles.profile_header}>
      <Link href="/">
        <a>
          <RollbackOutlined style={{ fontSize: "2rem" }} />
        </a>
      </Link>
      
      <div className={styles.user_edit_btn}>
        <button onClick={() => isLogout()}>Выйти</button>
      </div>
    </div>
  );
};

export default ProfileHeader;
