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
    const [posts, setPosts] = useState([])
    const [author, setAuthor] = useState({}) 
    const [limit, setLimit] = useState(6)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    const getUser = () => {
        http.get('/auth/me').then((res) => {
            setChekUser(props.user.user.id === res.data.user.id ? true : false)
        })
        http.get(`/author/${props.id}/posts`).then((res) => {
            setPosts(res.data.posts)
        })
        http.get(`/user/${props.id}`).then((res) => {
            setAuthor(res.data)
        })
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const fethcNewsPosts = () => {
        setLimit((prev) => prev + 3)
    }

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            100
        ) {
            fethcNewsPosts()
        }
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
                <title>Ofolio</title>
                <meta name="description" content="Ofolio" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <div className="site-wrapper">
                <div className="main-overlay"></div>
                <Header />
                <AuthorBanner author={author.user} status={true} />
                <section className="main-content">
                    <div className="container-md">
                        <div className="row">
                            {posts?.rows?.length > 0 ? (
                                posts?.rows?.slice(0, limit)?.map((post) => {
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
    // let post = {}
    // let user = {}
    // await http.get(`/author/${params.id}/posts`).then((res) => {
    //     post = res.data.posts
    // })
    // await http.get(`/user/${params.id}`).then((res) => {
    //     user = res.data
    // })

    // if (Object.keys(post).length == 0) {
    //     return {
    //         notFound: true,
    //     }
    // }

    return {
        props: { id: params.id }, // will be passed to the page component as props
    }
}

export default Index
