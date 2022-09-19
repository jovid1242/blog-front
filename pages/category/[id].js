import Head from "next/head";

// api
import http from "../../components/http";

// components
import Header from "../../components/header/Header";
import Category from "../../components/category";
import Sidebar from "../../components/sidebar/Sidebar";
import PageHeader from "../../components/pageHeader/PageHeader";
import Footer from "../../components/footer/Footer";

const Index = (props) => {
  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Repost</title>
        <meta name="description" content="Repost" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div className="site-wrapper">
        <div className="main-overlay"></div>
        <Header />
        <PageHeader />
        <section className="main-content">
          <div className="container-xl">
            <div className="row gy-4">
              <Category posts={props} />
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
  await http.get(`/category/${params.id}`).then((res) => {
    post = res.data.posts;
  });

  if (Object.keys(post).length == 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: post, // will be passed to the page component as props
  };
}

export default Index;
