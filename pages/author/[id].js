import Head from "next/head";

// api
import http from "../../components/http";

// components
import Header from "../../components/header/Header";
import Category from "../../components/category";
import Sidebar from "../../components/sidebar/Sidebar";
import AuthorBanner from "../../components/author/authorBanner";

const Index = (props) => {
  // console.log("props.user", props.user);
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
        <AuthorBanner
          name={props.user.user.name}
          info={props.user.user?.info}
          avatar={props.user.user?.imageUrl}
        />
        <section className="main-content">
          <div className="container-xl">
            <div className="row gy-4">
              <Category posts={props.post} />
              <Sidebar />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  let post = {};
  let user = {};
  await http.get(`/author/${params.id}/posts`).then((res) => {
    post = res.data.posts;
  });
  await http.get(`/user/${params.id}`).then((res) => {
    user = res.data;
  });

  if (Object.keys(post).length == 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, user }, // will be passed to the page component as props
  };
}

export default Index;
