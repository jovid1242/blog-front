import React from "react";
import PostCategory from "./PostCategory";
// import Pagination from "../pagination";

const index = ({ posts }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="row gy-4">
          {posts?.rows.length > 0 ? (
            posts.rows.map((post) => {
              return <PostCategory post={post} key={post.id} />;
            })
          ) : (
            <>
              <h2>Здесь пока что нет ни одного поста</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default index;
