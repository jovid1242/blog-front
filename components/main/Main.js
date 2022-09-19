import LSidebar from "../sidebar/LSidebar";
import Sidebar from "../sidebar/Sidebar";

const Main = ({ store }) => {
  return (
    <section className="main-content">
      <div className="container-xl">
        <div className="row gy-4">
          <LSidebar posts={store.posts.posts} />
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default Main;
