import { Button, Form, Input, Select, Upload, TextArea } from "antd";

// icons
import { PlusOutlined } from "@ant-design/icons";

// styles
import styles from "../../styles/profile.module.scss";

const userInfo = () => {
  const validateMessages = {
    required: "Пожалуйста, введите ваше ${label} ",
    types: {
      email: "${label} не является действительной электронной почтой!",
      number: "${label} is not a valid number!",
    },
  };

  const onFinish = (values) => {
    dispatch(fetchLogin(values));
    route.push("/profile");
  };

  return (
    <div className={styles.user_info}>
      <div className={styles.form_wrapper}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          validateMessages={validateMessages}
          autoComplete="off"
        >
          <Form.Item name="title" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Заголовок" />
          </Form.Item>

          <Form.Item>
            <Select placeholder="Категория">
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo23">Demo1</Select.Option>
              <Select.Option value="demo33">Demo2</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Input.TextArea placeholder="Описание" rows={4} />
          </Form.Item>

          <Form.Item valuePropName="fileList">
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Выбрать файл
                </div>
              </div>
            </Upload>
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

export default userInfo;
