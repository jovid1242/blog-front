import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthors } from '../../redux/slices/users'

// utils
import { getAuthors } from '../../utils/author'
import { convertDataToHtml } from '../../utils/convertDataToHtml'

// parser html
import ReactHtmlParser from 'react-html-parser'

// api
import { API_URL } from '../api'
import http from '../http'

import * as moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

const FullPost = ({ post }) => {
    const [tags, setTags] = useState([])
    const [textPost, setTextPost] = useState('')
    const { users } = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const user = getAuthors.getAuthor(users.items, post.user_id)

    const IsJsonString = (str) => {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }
        return true
    }

    const parseText = () => {
        if (IsJsonString(post.text)) {
            var textPostToHtml = ReactHtmlParser(
                convertDataToHtml(JSON.parse(post.text).blocks)
            )
        } else {
            var textPostToHtml = ReactHtmlParser(post.text)
        }
        setTextPost(textPostToHtml)
    }

    useEffect(() => {
        parseText()
    }, [])

    useEffect(() => {
        dispatch(fetchAuthors())
        http.get(`/post-tags/${post.id}`).then(({ data }) => {
            data.data.map((itm) => {
                http.get(`/tags/${itm.tag_id}`).then(({ data }) => {
                    setTags(prev => [...prev , data.data])
                })
            })
        })
    }, [])

    return (
        <div className="col-lg-8">
            <div className="post post-single">
                <div className="post-header">
                    <h1 className="title mt-0 mb-3">{post.title}</h1>
                    <div className="details">
                        <ul className="meta list-inline mb-0 d-flex align-items-center">
                            <li className="list-inline-item d-flex align-items-center">
                                <Link href={`/author/${post.user_id}`}>
                                    <a>
                                        <Image
                                            src={
                                                !user.imageUrl
                                                    ? '/static/insta-2.jpg'
                                                    : `${API_URL}image/${user.imageUrl}`
                                            }
                                            className="w40 mr-2 avatar-img border50"
                                            alt="author"
                                            width={40}
                                            height={40}
                                            layout="intrinsic"
                                        />
                                    </a>
                                </Link>
                                <div style={{ marginLeft: '12px' }}>
                                    <Link href={`/author/${post.user_id}`}>
                                        {getAuthors.getAuthorName(
                                            users.items,
                                            post.user_id
                                        )}
                                    </Link>
                                </div>
                            </li>
                            <li className="list-inline-item dflex">
                                Просмотр
                                <div className="c-black ml-1">
                                    {post.viewCount}
                                </div>
                            </li>
                            <li className="list-inline-item">
                                {moment(post.createdAt).format('LL')}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="featured-image">
                    <Image
                        src={`${API_URL}image/${post.imageUrl}`}
                        width={1000}
                        height={500}
                        className="imgCover"
                        priority
                        alt="post-title"
                    />
                </div>
                <div className="post-content clearfix">
                    <p>{textPost}</p>
                </div>
            </div>
            <div class="post-bottom">
                <div class="row d-flex align-items-center">
                    <div class="col-md-12 col-12 text-center text-md-start">
                        {tags?.map((elm) => {
                            return (
                                <a href="#" class="tag mrr-1" key={elm.id}>
                                    {elm.name}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullPost
