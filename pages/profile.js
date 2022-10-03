import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

// components
import Loader from "../components/loader";
import Header from "../components/header/Header";
import Post from "../components/post/Post";

const Profile = () => {
  const route = useRouter();
  const token = getCookie("token");

  const checkToke = () => {
    if (typeof token === "undefined" || token === "") {
      route.push("/auth/login");
    }
  };

  useEffect(() => {
    checkToke();
    console.log("token", token);
  }, []);

  const arr = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="container-xl">
        <Header />
        <Loader />
        <section className="main-content">
          <div className="container-xl">
            <div className="row gy-4">
              <div className="col-lg-8">
                <div className="row gy-4">
                  <div className="row">
                    {arr.length > 0 ? (
                      arr?.map((post) => {
                        return (
                          <Post
                            id={"post.id"}
                            title={"post.title"}
                            imageUrl={"post.imageUrl"}
                            author={"post.user_id"}
                            view={"post.viewCount"}
                            text={"post.text"}
                            date={"post.createdAt"}
                            key={"post.id"}
                          />
                        );
                      })
                    ) : (
                      <>
                        <h2>Здесь пока что нет ни одного поста</h2>
                      </>
                    )}
                  </div>
                </div>

                <nav>
                  <ul className="pagination justify-content-center">
                    <li className="page-item active" aria-current="page">
                      <span className="page-link">1</span>
                    </li>
                    <li className="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-4">
                <div className="sidebar">
                  <div className="widget rounded">
                    <div className="widget-header text-center">
                      <h3 className="widget-title">Explore Topics</h3>
                      <img src="images/wave.svg" class="wave" alt="wave" />
                    </div>
                    <div className="widget-content">
                      <ul className="list">
                        <li>
                          <a href="#">Lifestyle</a>
                          <span>(5)</span>
                        </li>
                        <li>
                          <a href="#">Inspiration</a>
                          <span>(2)</span>
                        </li>
                        <li>
                          <a href="#">Fashion</a>
                          <span>(4)</span>
                        </li>
                        <li>
                          <a href="#">Politic</a>
                          <span>(1)</span>
                        </li>
                        <li>
                          <a href="#">Trending</a>
                          <span>(7)</span>
                        </li>
                        <li>
                          <a href="#">Culture</a>
                          <span>(3)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
