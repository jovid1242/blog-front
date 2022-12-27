import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";

// api
import { API_URL } from "../api";

const Header = () => {
  const router = useRouter();
  const [activeBtn, setActiveBtn] = useState(router.query.id);
  const { category } = useSelector((state) => state.category);
  const [menuVisible, setmenuVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [head, setHead] = useState(false);

  useMemo(() => {
    setActiveBtn(router.query.id);
    setIsAuth(getCookie("user"));
  }, []);

  const closeMenu = (id) => {
    if (id) {
      setActiveBtn(id);
    }
    setmenuVisible(false);
  };

  useEffect(() => {
    window.onscroll = function (e) {
      if (window.scrollY > 0) {
        setHead(true);
      } else {
        setHead(false);
      }
    };
  }, []);

  return (
    <>
      <header className="header-default">
        <nav
          className={
            head ? "navbar navbar-expand-lg affix" : "navbar navbar-expand-lg"
          }
        >
          <div className="container-xl">
            <Link href="/">
              <a className="navbar-brand w40">
                <Image
                  src="/static/nlogo.png" 
                  width={50}
                  height={50}
                  layout="responsive"
                  alt="logo"
                />
              </a>
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {category?.items?.map((item) => {
                  return (
                    <li
                      className={
                        activeBtn === item.id ? "nav-item active" : "nav-item"
                      }
                      onClick={() => closeMenu(item.id)}
                      key={item.id}
                    >
                      <Link href={`/category/${item.id}`}>
                        <a className="nav-link">{item.title}</a>
                      </Link>
                    </li>
                  );
                })}
                {isAuth === false ? (
                  <>
                    <li className="nav-item" onClick={() => closeMenu()}>
                      <Link href="/auth/login">
                        <a className="nav-link">Login</a>
                      </Link>
                    </li>
                    <li className="nav-item" onClick={() => closeMenu()}>
                      <Link href="/auth/register">
                        <a className="nav-link">Register</a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item" onClick={() => closeMenu()}>
                    <Link href="/profile">
                      <a className="nav-link">Публикация</a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="header-right">
              <ul className="social-icons list-unstyled list-inline mb-0">
                <li className="list-inline-item">
                  <a href="https://instagram.com/jovid92002">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.youtube.com/channel/UCic_oyZ_5DvUjw0C1it7znQ">
                    <i className="fab fa-youtube"></i>
                  </a>
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
          onClick={() => closeMenu()}
          className="btn-close"
          aria-label="Close"
        ></button>

        {/* <!-- logo --> */}
        <div className="logo">
          {/* <Link href="/">
            <a className="navbar-brand w40">
              <Image
                src={`${API_URL}image/1.jpg`} 
                width={40}
                height={40}
                layout="responsive"
                alt="logo"
              />
            </a>
          </Link> */}
        </div>

        {/* 
	<!-- menu --> */}
        <nav>
          <ul className="vertical-menu">
            {category?.items?.map((item) => {
              return (
                <li
                  className={activeBtn === item.id ? "active" : ""}
                  onClick={() => closeMenu(item.id)}
                  key={item.id}
                >
                  <Link href={`/category/${item.id}`}>
                    <a className="nav-link">{item.title}</a>
                  </Link>
                </li>
              );
            })}
            {isAuth === false ? (
              <>
                <li className="nav-item">
                  <Link href="/auth/login">
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/auth/register">
                    <a className="nav-link">Register</a>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/profile">
                  <a className="nav-link">Публикация</a>
                </Link>
              </li>
            )}
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
