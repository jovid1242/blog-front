import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { fetchCategory } from '../../redux/slices/category'

// api
import http from '../../components/http'

// components
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import AuthorBanner from '../../components/author/authorBanner'
import PostCategory from '../../components/category/PostCategory'

const Index = (props) => {
    const [chekUser, setChekUser] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    const getUser = () => {
        http.get('/auth/me').then((res) => {
            setChekUser(props.user.user.id === res.data.user.id ? true : false)
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <Head>
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=UTF-8"
                />
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
                <AuthorBanner user={props.user.user} status={chekUser} />
                <section className="main-content">
                    <div className="container-md">
                        <div className="row">
                            {props.post?.rows.length > 0 ? (
                                props.post.rows.map((post) => {
                                    return (
                                        <PostCategory
                                            post={post}
                                            status={chekUser}
                                            key={post.id}
                                            col="col-sm-4 col-md-4"
                                        />
                                    )
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
    )
}

export async function getServerSideProps({ params }) {
    let post = {}
    let user = {}
    await http.get(`/author/${params.id}/posts`).then((res) => {
        post = res.data.posts
    })
    await http.get(`/user/${params.id}`).then((res) => {
        user = res.data
    })

    if (Object.keys(post).length == 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: { post, user }, // will be passed to the page component as props
    }
}

export default Index
