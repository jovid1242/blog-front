import { useEffect, useState } from 'react'
import Image from 'next/image'

// components
import Post from '../post/Post'
import LoadButton from '../ui/button/LoadButton'

// api
import { API_URL } from '../api'

const LSidebar = ({ posts }) => {
    const [limit, setLimit] = useState(5)

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const fethcNewsPosts = () => {
        setLimit(prev => prev + 5)
    }

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            200
        ) {
            fethcNewsPosts()
        }
    }

    return (
        <div className="col-lg-8">
            {/* <div className="section-header">
        <h3 className="section-title">Последние посты</h3>
        <div className="w-auto-40">
          <Image
            src={`${API_URL}image/wave.svg`}
            width={40}
            height={15}
            layout="responsive"
            className="wave"
            alt="wave"
          />
        </div>
      </div> */}

            <div className="padding-10">
                <div className="row">
                    {!posts.length ? (
                        posts?.items?.slice(0, limit).map((post) => {
                            return (
                                <Post
                                    id={post.id}
                                    title={post.title}
                                    imageUrl={post.imageUrl}
                                    user_id={post.user_id}
                                    view={post.viewCount}
                                    text={post.text}
                                    date={post.createdAt}
                                    key={post.id}
                                />
                            )
                        })
                    ) : (
                        <>
                            <h2>Здесь пока что нет ни одного поста</h2>
                        </>
                    )}
                </div>
                <LoadButton onClick={() => fethcNewsPosts()} />
            </div>
        </div>
    )
}

export default LSidebar
