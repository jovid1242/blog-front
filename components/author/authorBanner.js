import Image from "next/image";
import React from "react";
import { API_URL } from "../api";

const AuthorBanner = ({ name, avatar, info }) => { 
  return (
    <>
      <section
        className="hero data-bg-image d-flex align-items-center"
        style={{ backgroundImage: `url(${"/static/hero.jpg"})` }}
      >
        <div className="container-xl">
          <div className="cta text-center">
            {avatar !== null ? (
              <Image
                src={`${API_URL}image/${avatar}`}
                className="w40 mr-2"
                alt="author" 
                width={150}
                height={150}
                layout="intrinsic"
              />
            ) : null}

            <h2 className={"mt-0 mb-2 " + avatar}>{name}</h2>
            <p className="mt-0 mb-4">
              {info !== null ? (
                info
              ) : (
                <>
                  Hello, I’m a content writer who is fascinated by content
                  fashion, celebrity and lifestyle. She helps clients bring the
                  right content to the right people.
                </>
              )}
            </p>
          </div>
        </div>
        <span className="mouse mt-2">
          <span className="wheel"></span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 260">
          <path
            fill="#FFF"
            fillOpacity="1"
            d="M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,245.3C840,235,960,181,1080,176C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>
    </>
  );
};

export default AuthorBanner;
