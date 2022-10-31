import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../../redux/slices/users";
import LSidebar from "../sidebar/LSidebar";
import Sidebar from "../sidebar/Sidebar";

const Main = ({ store }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, []);
  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          {/* <div class="preloader-wrap p-3">
                        <div class="box shimmer">
                            <div class="lines">
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                            </div>
                        </div>
                        <div class="box shimmer mb-3">
                            <div class="lines">
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                            </div>
                        </div>
                        <div class="box shimmer">
                            <div class="lines">
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                                <div class="line s_shimmer"></div>
                            </div>
                        </div>
                    </div>  
                    <!-- loader wrapper -->
                    */}
          <div className="row feed-body">
            <div className="col-xl-8 col-xxl-9 col-lg-8">
              <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                <div className="card-body p-0">
                  <a
                    href="#"
                    className=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
                  >
                    <i class="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>
                    Create Post
                  </a>
                </div>
                <div className="card-body p-0 mt-3 position-relative">
                  <figure className="avatar position-absolute ms-2 mt-1 top-5">
                    <img
                      src="images/user-8.png"
                      alt="image"
                      class="shadow-sm rounded-circle w30"
                    />
                  </figure>
                  <textarea
                    name="message"
                    class="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                    cols="30"
                    rows="10"
                    placeHolder="What's on your mind?"
                  ></textarea>
                </div>
                <div className="card-body d-flex p-0 mt-0">
                  <a
                    href="#"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                  >
                    <i class="font-md text-danger feather-video me-2"></i>
                    <span class="d-none-xs">Live Video</span>
                  </a>
                  <a
                    href="#"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                  >
                    <i class="font-md text-success feather-image me-2"></i>
                    <span class="d-none-xs">Photo/Video</span>
                  </a>
                  <a
                    href="#"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                  >
                    <i class="font-md text-warning feather-camera me-2"></i>
                    <span class="d-none-xs">Feeling/Activity</span>
                  </a>
                  <a
                    href="#"
                    className="ms-auto"
                    id="dropdownMenu4"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-start p-4 rounded-xxl border-0 shadow-lg"
                    aria-labelledby="dropdownMenu4"
                  >
                    <div className="card-body p-0 d-flex">
                      <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                      <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                        Save Link{" "}
                        <span class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Add this to your saved items
                        </span>
                      </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                      <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                      <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                        Hide Post{" "}
                        <span class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Save to your saved items
                        </span>
                      </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                      <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                      <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                        Hide all from Group{" "}
                        <span class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Save to your saved items
                        </span>
                      </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                      <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                      <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">
                        Unfollow Group{" "}
                        <span class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Save to your saved items
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
                <div className="card-body p-0 d-flex">
                  <figure className="avatar me-3">
                    <img
                      src="images/user-8.png"
                      alt="image"
                      class="shadow-sm rounded-circle w45"
                    />
                  </figure>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    Anthony Daugloi{" "}
                    <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                      2 hour ago
                    </span>
                  </h4>
                  <a href="#" className="ms-auto">
                    <i class="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                  </a>
                </div>
                <div className="card-body p-0 me-lg-5">
                  <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi nulla dolor, ornare at commodo non, feugiat non nisi.
                    Phasellus faucibus mollis pharetra. Proin blandit ac massa
                    sed rhoncus{" "}
                    <a href="#" class="fw-600 text-primary ms-2">
                      See more
                    </a>
                  </p>
                </div>
                <div className="card-body d-block p-0 mb-3">
                  <div className="row ps-2 pe-2">
                    <div class="col-sm-12 p-1">
                      <a href="images/t-30.jpg" data-lightbox="roadtr">
                        <img
                          src="images/t-31.jpg"
                          class="rounded-3 w-100"
                          alt="image"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex p-0">
                  <a
                    href="#"
                    className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                  >
                    <i class="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>{" "}
                    <i class="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>
                    2.8K Like
                  </a>
                  <div className="emoji-wrap">
                    <ul className="emojis list-inline mb-0">
                      <li className="emoji list-inline-item">
                        <i class="em em---1"></i>{" "}
                      </li>
                      <li className="emoji list-inline-item">
                        <i class="em em-angry"></i>
                      </li>
                      <li className="emoji list-inline-item">
                        <i class="em em-anguished"></i>{" "}
                      </li>
                      <li className="emoji list-inline-item">
                        <i class="em em-astonished"></i>{" "}
                      </li>
                      <li className="emoji list-inline-item">
                        <i class="em em-blush"></i>
                      </li>
                      <li className="emoji list-inline-item">
                        <i class="em em-clap"></i>
                      </li>
                      <li className="emoji list-inline-item">
                        <i class="em em-cry"></i>
                      </li>
                      <li className="emoji list-inline-item">
                        <i class="em em-full_moon_with_face"></i>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                  >
                    <i class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                    <span class="d-none-xss">22 Comment</span>
                  </a>
                  <a
                    href="#"
                    className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                  >
                    <i class="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                    <span class="d-none-xs">Share</span>
                  </a>
                </div>
              </div>

              <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                <div
                  className="snippet mt-2 ms-auto me-auto"
                  data-title=".dot-typing"
                >
                  <div className="stage">
                    <div className="dot-typing"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
