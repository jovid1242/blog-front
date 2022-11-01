import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

// antd
import { Button, Form, Input } from "antd";
// import { UserOutlined } from "@ant-design/icons";

// slice
import { fetchRegister } from "../../redux/slices/auth/authSlice";

// components
import Header from "../../components/header/Header";

// styles
import style from "../../styles/login.module.scss";

const Register = () => {
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
    dispatch(fetchRegister(values));
    if (auth.isError !== false) {
      toast.error(auth.isError);
    } else if (Object.keys(auth.user).length !== 0) {
      route.push("/profile");
    }
  };

  return (
    <>
      {/* <div className={style.form}>
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
      </div> */}
      <div className="main-wrap">
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url(
                "http://uitheme.net/sociala/images/login-bg.jpg")`,
            }}
          ></div>
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="fw-700 display1-size display2-md-size mb-4">
                  Create <br />
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
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите ваше имя пользователя!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Логин" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input size="large" placeholder="E-mail" />
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
                      Отправить
                    </Button>
                  </Form.Item>
                </Form>

                <div className="col-sm-12 p-0 text-left">
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Already have account{" "}
                    <Link href="/auth/login">
                      <a className="fw-700 ms-1">Вход</a>
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

export default Register;
