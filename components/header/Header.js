import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [activeBtn, setActiveBtn] = useState(router.query.id);
  const [menuVisible, setmenuVisible] = useState(false);

  const hedaerData = [
    {
      id: 1,
      href: "/category/1",
      text: "Разработка",
    },
    {
      id: 2,
      href: "/category/2",
      text: "Дизайн",
    },
    {
      id: 3,
      href: "/category/3",
      text: "Маркетинг",
    },
    {
      id: 4,
      href: "/category/4",
      text: "Игри",
    },
    {
      id: 5,
      href: "/category/5",
      text: "Кино",
    },
    {
      id: 6,
      href: "/auth/login",
      text: "Login",
    },
    {
      id: 7,
      href: "/auth/register",
      text: "Register",
    },
  ];

  useMemo(() => {
    setActiveBtn(router.query.id);
  }, []);

  return (
    <>
      <header className="header-default">
        <nav className="navbar navbar-expand-lg">
          <div className="container-xl">
            <Link href="/">
              <a className="navbar-brand w40">
                <Image
                  src="http://backend.1026361-ca72388.tmweb.ru/api/image/1.jpg"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                  width={50}
                  height={50}
                  layout="fill"
                  alt="logo"
                />
              </a>
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {hedaerData?.map((item) => {
                  return (
                    <li
                      className={
                        activeBtn === item.id ? "nav-item active" : "nav-item"
                      }
                      onClick={() => setActiveBtn(item.id)}
                      key={item.id}
                    >
                      <Link href={item.href}>
                        <a className="nav-link">{item.text}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="header-right">
              <ul className="social-icons list-unstyled list-inline mb-0">
                <li className="list-inline-item">
                  <Link href="/">
                    <a>
                      <i className="fab fa-instagram"></i>
                    </a>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/">
                    <a>
                      <i className="fab fa-youtube"></i>
                    </a>
                  </Link>
                </li>
              </ul>
              <div className="header-buttons">
                {/* <button className="search icon-button">
                <i className="icon-magnifier"></i>
              </button> */}
                <button
                  className="burger-menu icon-button ms-2 float-end float-md-none"
                  onClick={() => setmenuVisible(true)}
                >
                  <span className="burger-icon"></span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={
          menuVisible
            ? "canvas-menu d-flex align-items-end flex-column open"
            : "canvas-menu d-flex align-items-end flex-column"
        }
      >
        <button
          type="button"
          onClick={() => setmenuVisible(false)}
          className="btn-close"
          aria-label="Close"
        ></button>

        {/* <!-- logo --> */}
        <div className="logo">
          <Link href="/">
            <a className="navbar-brand w40">
              <Image
                src="http://backend.1026361-ca72388.tmweb.ru/api/image/1.jpg"
                style={{ borderRadius: "50%" }}
                width={40}
                height={40}
                layout="fill"
                alt="logo"
              />
            </a>
          </Link>
        </div>

        {/* 
	<!-- menu --> */}
        <nav>
          <ul className="vertical-menu">
            {hedaerData?.map((item) => {
              return (
                <li
                  className={activeBtn === item.id ? "active" : ""}
                  onClick={() => setActiveBtn(item.id)}
                  key={item.id}
                >
                  <Link href={item.href}>
                    <a className="nav-link">{item.text}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* <!-- social icons --> */}
        <ul className="social-icons list-unstyled list-inline mb-0 mt-auto w-100">
          {/* <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li> */}
          <li className="list-inline-item">
            <a href="https://instagram.com/jovid92002" target="_blanck">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          {/* <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-pinterest"></i>
            </a>
          </li> */}
          {/* <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-medium"></i>
            </a>
          </li> */}
          <li className="list-inline-item">
            <a
              href="https://www.youtube.com/channel/UCic_oyZ_5DvUjw0C1it7znQ"
              target="_blanck"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
