import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../../redux/slices/users";
import LSidebar from "../sidebar/LSidebar";
import Sidebar from "../sidebar/Sidebar";

const Main = ({ posts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, []);
  
  return (
    <section className="main-content">
      <div className="container-xl">
        <div className="row gy-4">
          <LSidebar posts={posts} />
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default Main;
