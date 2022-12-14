import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

// antd
import { Button, Form, Input } from "antd";

// slice
import { fetchCategory } from "../../redux/slices/category";
import { fetchRegister } from "../../redux/slices/auth/authSlice";

// components
import Header from "../../components/header/Header";

// styles
import style from "../../styles/login.module.scss";

const Register = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const validateMessages = {
    required: "Пожалуйста, введите ваше ${label} ",
    types: {
      email: "${label} не является действительной электронной почтой!",
      number: "${label} is not a valid number!",
    },
  };

  const onFinish = (values) => {
    dispatch(fetchRegister(values));
    if (auth.isError !== false) {
      toast.error(auth.isError);
    } else if (Object.keys(auth.user).length !== 0) {
      route.push("/profile");
    }
  };

  return (
    <>
      <Header />
      <div className={style.form}>
        <div className="form_head">
          <h2>Регистрация</h2>
          {auth.isError && (
            <div>
              <p type="danger">{auth.isError}</p>
            </div>
          )}
        </div>
        <div className={style.form_wrapper}>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите ваше имя пользователя!",
                },
              ]}
            >
              <Input placeholder="Логин" />
            </Form.Item>

            <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите ваш пароль!",
                },
              ]}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={auth.status}
                block
                ghost
              >
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="form_footer">
          Есть аккаунт ?{" "}
          <Link href="/auth/login">
            <a>Вход</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
