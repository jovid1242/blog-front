import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

// antd
import { Button, Form, Input } from "antd";
// import { UserOutlined } from "@ant-design/icons";

// slice
import { fetchLogin } from "../../redux/slices/auth/authSlice";

// components

// styles
import style from "../../styles/login.module.scss";

const Login = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const route = useRouter();

  const validateMessages = {
    required: "Пожалуйста, введите ваше ${label} ",
    types: {
      email: "${label} не является действительной электронной почтой!",
      number: "${label} is not a valid number!",
    },
  };

  const onFinish = (values) => {
    dispatch(fetchLogin(values));
    if (auth.isError !== false) {
      toast.error(auth.isError);
    } else if (Object.keys(auth.user).length !== 0) {
      route.push("/profile");
    }
  };

  return (
    <>
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0"></div>

        <div className="row">
          <div
            class="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url(
                "http://uitheme.net/sociala/images/login-bg.jpg")`,
            }}
          ></div>
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Login into <br />
                  your account
                </h2>
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
                    name="email"
                    className="form-group"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input size="large" placeholder="E-mail" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    className="form-group"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите ваш пароль!",
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Пароль" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={auth.status}
                      block
                    >
                      Войти
                    </Button>
                  </Form.Item>
                </Form>

                <div className="col-sm-12 p-0 text-left">
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Dont have account{" "}
                    <Link href="/auth/register">
                      <a class="fw-700 ms-1">Регистрация</a>
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
