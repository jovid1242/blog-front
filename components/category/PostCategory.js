import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../../redux/slices/users";

// next
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

// utils
import { short } from "../../utils/short";
import getAuthor from "../../utils/author";
import { translitRuEnLowercase } from "../../utils/translateUrl";

// api
import { API_URL } from "../api";

// momentjs
import * as moment from "moment";
import "moment/locale/ru";

// icon
import eyeIcon from "../../assets/eye-solid.svg";
moment.locale("ru");

const PostCategory = ({ post }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);
  const { users } = useSelector((state) => state.users);

  const filterCategory = category?.items.filter(
    (elm) => elm.id == router.query.id
  );

  const [textPost, setTextPost] = useState("");

  useEffect(() => {
    const textPostToHtml = ReactHtmlParser(short.shortText(post.text, 100));
    setTextPost(textPostToHtml);
  }, []);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, []);

  return (
    <div className="col-sm-6">
      <div className="post post-grid rounded bordered">
        <div className="thumb top-rounded">
          <Link href={`/category/${router.query.id}`}>
            <a className="category-badge position-absolute">
              {filterCategory[0]?.title}
            </a>
          </Link>

          <span className="post-format">
            <i className="icon-picture"></i>
          </span>
          <Link href={`/post/${translitRuEnLowercase(post.title)}/${post.id}`}>
            <a>
              <div className="inner">
                <Image
                  src={`${API_URL}image/${post.imageUrl}`}
                  style={{
                    width: "100%",
                  }}
                  className="imgCover"
                  width={1000}
                  height={600}
                  priority
                  alt="post-title"
                />
              </div>
            </a>
          </Link>
        </div>
        <div className="details">
          <ul className="meta list-inline mb-3 d-flex align-items-center">
            <li className="list-inline-item d-flex align-items-center">
              <Image
                src={`${API_URL}image/1.jpg`}
                className="w40 mr-2"
                alt="author"
                style={{ borderRadius: "50%" }}
                width={40}
                height={40}
              />
              <div style={{ marginLeft: "12px" }}>
                {getAuthor(users.items, post.user_id)}
              </div>
            </li>
            <li className="list-inline-item d-flex align-items-center">
              <Link href="/">
                <a>
                  <Image src={eyeIcon} alt="eye icon" width={10} height={10} />
                </a>
              </Link>
              <div style={{ marginLeft: "6px" }}>{post.viewCount}</div>
            </li>
            <li className="list-inline-item" style={{ fontSize: "12px" }}>
              {moment(post.createdAt).format("LL")}
            </li>
          </ul>
          <h5 className="post-title">
            <Link
              href={`/post/${translitRuEnLowercase(post.title)}/${post.id}`}
            >
              <a>{short.shortText(post.title, 50)}</a>
            </Link>
          </h5>
          <p className="excerpt mb-0">{textPost}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCategory;
