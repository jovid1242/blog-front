import { useEffect } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { fetchCategory } from "../../redux/slices/category";

// api
import http from "../../components/http";

// components
import Header from "../../components/header/Header"; 
import PageHeader from "../../components/pageHeader/PageHeader";
import Footer from "../../components/footer/Footer";
import PostCategory from "../../components/category/PostCategory";

const Index = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  
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
          <div className="container-md">
            <div className="row">
              {props?.rows.length > 0 ? (
                props.rows.map((post) => {
                  return (
                    <PostCategory
                      post={post}
                      key={post.id}
                      col="col-sm-4 col-md-4"
                    />
                  );
                })
              ) : (
                <>
                  <h2>Здесь пока что нет ни одного поста</h2>
                </>
              )}
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
