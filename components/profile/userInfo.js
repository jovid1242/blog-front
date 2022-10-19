import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import FormData from "form-data";

// components
import { Button, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import http from "../http";

// // slices
import { addPost, setLoad } from "../../redux/slices/author/author";
import { fetchCategory } from "../../redux/slices/category";

// styles

import dynamic from "next/dynamic";
const Jjeditor = dynamic(() => import("../editor/JoditEditor"), {
  ssr: false,
});
import styles from "../../styles/profile.module.scss";
// import Jjeditor from "";

const UserInfo = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { category } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const [htmlContent, setHtmlContent] = useState("");

  const validateMessages = {
    required: "Пожалуйста, заполните поля ${label} ",
  };

  const onReset = () => {
    form.resetFields();
  };

  const hanldeChange = (html) => {
    setHtmlContent(html);
  };

  const onFinish = (values) => {
    if (htmlContent === "Начни писать сюда!!!") {
      toast.error("Добавьте описание поста");
    }
    const data = new FormData();
    data.append("title", values.title);
    data.append("text", htmlContent);
    data.append("image", values.image.target.files[0]);
    data.append("category", values.category);
    data.append("user_id", user.id);
    dispatch(setLoad(true));
    http
      .post("/post", data)
      .then((res) => {
        onReset();
        toast.success("Пост успешно добавлен!");
        dispatch(addPost(res.data.data));
      })
      .catch(function (errors) {
        toast.error(`Упс, ошибка, ${errors.message}`);
      })
      .finally(() => {
        dispatch(setLoad(false));
      });
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  return (
    <div className={styles.user_info}>
      <div className={styles.form_wrapper}>
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          validateMessages={validateMessages}
          autoComplete="off"
        >
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Заголовок" />
          </Form.Item>

          <Form.Item name="category" rules={[{ required: true }]}>
            <Select placeholder="Категория">
              {category?.items?.map((item) => {
                return (
                  <Select.Option value={item.id} key={item.id}>
                    {item.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="text">
            {/* <Tiptap hanldeChange={hanldeChange} /> */}
            <Jjeditor hanldeChange={hanldeChange} />
          </Form.Item>

          <Form.Item
            valuePropName="fileList"
            name="image"
            rules={[{ required: true }]}
          >
            <Input type="file" placeholder="Заголовок" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={false}
              block
              ghost
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserInfo;
