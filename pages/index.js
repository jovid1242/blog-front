import Head from "next/head";

// store
import { wrapper } from "../redux/store";
import { fetchPosts } from "../redux/slices/posts";

// components
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Hero from "../components/section/Hero";
import Footer from "../components/footer/Footer";
import Loading from "../components/loader";
import { useSelector } from "react-redux";

const Home = (props) => {
  const { popularPosts } = useSelector((state) => state.popularPosts);
  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta property="og:title" content="Repost digital posts" />
        <meta
          property="og:description"
          content="Сюда приходят обсудить новости индустрии и поделиться опытом."
        />
        <title>Repost</title>
        <meta name="description" content="Repost" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div className="site-wrapper">
        <Loading loading={popularPosts.status === "loading" ? true : false} />
        <div className="main-overlay"></div>
        <Header store={props} />
        <Hero />
        <Main store={props} />
        <Footer />
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchPosts());
    return {
      props: store.getState(),
    };
  }
);

export default Home;
