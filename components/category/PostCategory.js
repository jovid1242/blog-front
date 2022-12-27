import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthors } from '../../redux/slices/users'
import { DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

// next
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

// utils
import { getAuthors } from '../../utils/author'
import { translitRuEnLowercase } from '../../utils/translateUrl'

import { setLoad } from '../../redux/slices/author/author'

// api
import { API_URL } from '../api'
import http from '../http'

// momentjs
import * as moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

const PostCategory = ({ post, col = 'col-sm-6', status }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const { category } = useSelector((state) => state.category)
    const { users } = useSelector((state) => state.users) 
    const user = getAuthors.getAuthor(users.items, post.user_id)

    const filterCategory = category?.items.filter(
        (elm) => elm.id == router.query.id
    )
    useEffect(() => {
        dispatch(fetchAuthors())
    }, [])

    const removePostById = (id) => {
        dispatch(setLoad(true))
        http.delete(`/author/post/${id}`)
            .then((res) => { 
              window.location.reload()
                toast.success(res.data.ok)
            })
            .catch((err) => {
                toast.error(err)
            })
            .finally(() => {
                dispatch(setLoad(false))
            })
    }

    return (
        <div className={col}>
            <div className="post post-grid rounded bordered mb-2">
                <div className="thumb top-rounded">
                    {status ? (
                        <div
                            className="category-badge position-absolute cursorp"
                            onClick={() => removePostById(post.id)}
                        >
                            <DeleteOutlined />
                        </div>
                    ) : (
                        <Link href={`/category/${router.query.id}`}>
                            <a className="category-badge position-absolute">
                                {filterCategory[0]?.title}
                            </a>
                        </Link>
                    )}

                    <span className="post-format">
                        <i className="icon-picture"></i>
                    </span>
                    <Link
                        href={`/post/${translitRuEnLowercase(post.title)}/${
                            post.id
                        }`}
                    >
                        <a>
                            <div className="inner">
                                <Image
                                    src={`${API_URL}image/${post.imageUrl}`}
                                    className="imgCover"
                                    width={1000}
                                    height={600}
                                    priority
                                    alt="post-title"
                                />
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="details">
                    <ul className="meta list-inline mb-3 d-flex align-items-center">
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
                                    <a>
                                        {getAuthors.getAuthorName(
                                            users.items,
                                            post.user_id
                                        )}
                                    </a>
                                </Link>
                            </div>
                        </li>
                        <li className="list-inline-item d-flex align-items-center">
                            <Link href="/">
                                <a>
                                    <Image
                                        src="/static/eye-solid.svg"
                                        alt="eye icon"
                                        width={10}
                                        height={10}
                                    />
                                </a>
                            </Link>
                            <div style={{ marginLeft: '6px' }}>
                                {post.viewCount}
                            </div>
                        </li>
                        <li
                            className="list-inline-item"
                            style={{ fontSize: '12px' }}
                        >
                            {moment(post.createdAt).format('LL')}
                        </li>
                    </ul>
                    <h5 className="post-title">
                        <Link
                            href={`/post/${translitRuEnLowercase(post.title)}/${
                                post.id
                            }`}
                        >
                            <a>{post.title}</a>
                        </Link>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default PostCategory
