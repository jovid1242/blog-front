import { useState } from "react";
import Image from "next/image";

// components
import Post from "../post/Post";
import LoadButton from "../ui/button/LoadButton";

// api
import { API_URL } from "../api";

const LSidebar = ({ posts }) => {
  const [limit, setLimit] = useState(5);

  const fethcNewsPosts = () => {
    setLimit(limit + 5);
  };

  return (
    <div className="col-lg-8">
      <div className="section-header">
        <h3 className="section-title">Последние посты</h3>
        <div className="w-auto-40">
          <Image
            src={`${API_URL}image/wave.svg`}
            width={40}
            height={15}
            layout="responsive"
            className="wave"
            alt="wave"
          />
        </div>
      </div>

      <div className="padding-30 rounded bordered">
        <div className="row">
          {!posts.length ? (
            posts?.items?.slice(0, limit).map((post) => {
              return (
                <Post
                  id={post.id}
                  title={post.title}
                  imageUrl={post.imageUrl}
                  author={post.user_id}
                  view={post.viewCount}
                  text={post.text}
                  date={post.createdAt}
                  key={post.id}
                />
              );
            })
          ) : (
            <>
              <h2>Здесь пока что нет ни одного поста</h2>
            </>
          )}
        </div>
        <LoadButton onClick={() => fethcNewsPosts()} />
      </div>
    </div>
  );
};

export default LSidebar;
