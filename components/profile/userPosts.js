import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";

// components
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

// utils
import { short } from "../../utils/short";
import { translitRuEnLowercase } from "../../utils/translateUrl";

// slices
import { setLoad, removePost } from "../../redux/slices/author/author";

// api
import http from "../http";
import { API_URL } from "../api";

// styles
import styles from "../../styles/profile.module.scss";

const userPosts = () => {
  const [posts, setPosts] = useState([]);
  const { authorPosts } = useSelector((state) => state.author);
  const dispatch = useDispatch();
  const user = getCookie("user");

  const checkAuthorPosts = () => {
    if (authorPosts.status === "loaded") setPosts(authorPosts?.items);
  };

  const removePostById = (id) => {
    dispatch(setLoad(true));
    http
      .delete(`/author/post/${id}`)
      .then((res) => {
        dispatch(setLoad(false));
        dispatch(removePost(id));
        checkAuthorPosts();
        toast.success(res.data.ok);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        dispatch(setLoad(false));
      });
  };

  useEffect(() => {
    checkAuthorPosts();
    console.log("posts", posts[0]);
  }, [authorPosts]);

  return (
    <>
      <h3 className={styles.title}>Мои пости</h3>
      <div className={styles.posts}>
        {posts?.length > 0 ? (
          posts?.map((elm) => {
            return (
              <div className={styles.post} key={elm.id}>
                <div className={styles.post_image}>
                  <Image
                    src={`${API_URL}image/${elm.imageUrl}`}
                    className="imgCover"
                    width={500}
                    height={500}
                    priority
                    alt="post-title"
                  />
                </div>
                <div className="post_title">
                  <Link
                    href={`/post/${translitRuEnLowercase(elm.title)}/${elm.id}`}
                  >
                    <a target="_blank" className={styles.post_title}>
                      {short.shortText(elm.title, 40)}
                    </a>
                  </Link>
                </div>
                <div className={styles.post_action}>
                  <div className="d-flex align-items-center">
                    <div
                      className={styles.btn_remove}
                      onClick={() => removePostById(elm.id)}
                    >
                      <DeleteOutlined />
                    </div>
                    {/* <EditOutlined /> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h4 className={styles.title}>Здесь пока что нет ни одного поста</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default userPosts;
