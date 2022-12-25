import Head from "next/head";
import { useDispatch } from "react-redux";
import FullPost from "../../../components/fullPost/FullPost";
import Sidebar from "../../../components/sidebar/Sidebar";

import { fetchCategory } from "../../../redux/slices/category";
import http from "../../../components/http";

// components
import Header from "../../../components/header/Header";

// styles
import styles from "../../../styles/Home.module.css";
import Footer from "../../../components/footer/Footer";
import { translitRuEnLowercase } from "../../../utils/translateUrl";

const Index = ({ post }) => {
  const dispatch = useDispatch();
  dispatch(fetchCategory());
  return (
    <div className={styles.container}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:description" content={post.title} />
        <title>Repost | {post.title}</title>
        <meta name="description" content={post.title} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div className="site-wrapper">
        <div className="main-overlay"></div>

        <Header />
        <section className="main-content">
          <div className="container-xl">
            <div className="row gy-4">
              <FullPost post={post} />
              <Sidebar />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  let post = {};
  let viewPost = {};

  await http
    .get(`/posts/${translitRuEnLowercase(params.title)}/${params.id}`)
    .then((res) => {
      post = res.data.post;
    });

  await http.post(`post-view/${post.id}`).then(({ data }) => {
    viewPost = data;
  });

  if (Object.keys(post).length == 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post }, // will be passed to the page component as props
  };
}

export default Index;
