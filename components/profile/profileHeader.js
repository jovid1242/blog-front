import { useState } from "react";
import Link from "next/link";
import { Button, Modal, Form, Input, Space, Badge, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
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
import Image from "next/image";
import { useEffect } from "react";

const ProfileHeader = ({ user }) => {
  console.log("user", user);
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
    console.log("values", values);
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
      <Space direction="horizontal">
        <Badge count={1}>
          {user.imageUrl === null ? (
            <Avatar shape="square" size="large" />
          ) : (
            <Image
              src={`${API_URL}image/${user.imageUrl}`}
              className="imgCover"
              width={45}
              height={45}
              priority
              alt="post-title"
            />
          )}
        </Badge>
        <Button type="link" onClick={showModal}>
          {user?.name}
        </Button>
      </Space>

      <Modal
        title="Редактирование информации о пользователе"
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          fields={fields}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="social"
            rules={[
              {
                required: true,
                message: "Пожалуйста, напишите ссылку телеграм",
              },
            ]}
          >
            <Input placeholder="ссылка телеграм" />
          </Form.Item>

          <Form.Item
            valuePropName="fileList"
            name="image"
            rules={[
              { required: true, message: "Пожалуйста, добавьте аватарку" },
            ]}
          >
            <Input type="file" placeholder="avatar" />
          </Form.Item>
          <Form.Item
            name="info"
            rules={[
              {
                required: true,
                message: "Пожалуйста, заполните информация о себе",
              },
            ]}
          >
            <Input.TextArea
              placeholder="информация о себе"
              showCount
              maxLength={100}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className={styles.user_edit_btn}>
        <button onClick={() => isLogout()}>Выйти</button>
      </div>
    </div>
  );
};

export default ProfileHeader;
