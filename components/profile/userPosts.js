import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import Link from "next/link";

// components
import { Avatar } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

// utils
import { short } from "../../utils/short";
import { translitRuEnLowercase } from "../../utils/translateUrl";

// slices
import { setLoad, removePost } from "../../redux/slices/author/author";

// api
import http from "../http";

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
  }, [authorPosts]);

  return (
    <>
      <h3 className={styles.title}>Мои пости</h3>
      <div className={styles.posts}>
        {posts?.map((elm) => {
          return (
            <div className={styles.post} key={elm.id}>
              <div className="post_img">
                <Avatar size={64} src="https://joeschmoe.io/api/v1/random" />
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
                {elm.user_id === JSON.parse(user).id ? (
                  <div className="d-flex align-items-center">
                    <div
                      className={styles.btn_remove}
                      onClick={() => removePostById(elm.id)}
                    >
                      <DeleteOutlined />
                    </div>
                    {/* <EditOutlined /> */}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default userPosts;
