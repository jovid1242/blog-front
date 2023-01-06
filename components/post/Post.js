import { useSelector } from 'react-redux'

import Link from 'next/link'
import Image from 'next/image'
import * as moment from 'moment'

// parser html
import ReactHtmlParser from 'react-html-parser'

// utils
import { short } from '../../utils/short'
import { getAuthors } from '../../utils/author'
import { translitRuEnLowercase } from '../../utils/translateUrl'
import { convertDataToHtml } from '../../utils/convertDataToHtml'

// api
import { API_URL } from '../api'

// moment
import 'moment/locale/ru'
moment.locale('ru')

const Post = ({ title, text, id, date, imageUrl, user_id, view }) => {
    const { users } = useSelector((state) => state.users)

    const user = getAuthors.getAuthor(users.items, user_id)

    const IsJsonString = (str) => {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }
        return true
    }

    const parseText = () => {
        if (IsJsonString(text)) { 
            return ReactHtmlParser(short.shortText(convertDataToHtml(JSON.parse(text).blocks), 150))
        } else {
            return ReactHtmlParser(short.shortText(text, 160))
        }
    }

    return (
        <div className="post post-classic rounded bordered p-0">
            <div className="thumb top-rounded">
                <span className="post-format">
                    <i className="icon-picture" />
                </span>
                <Link href={`/post/${translitRuEnLowercase(title)}/${id}`}>
                    <a>
                        <div className="inner">
                            <Image
                                src={`${API_URL}image/${imageUrl}`}
                                width={1000}
                                height={500}
                                className="imgCover"
                                priority
                                alt="post-title"
                            />
                        </div>
                    </a>
                </Link>
            </div>
            <div className="details">
                <ul className="meta list-inline mb-0 post-head">
                    <li className="list-inline-item post-head">
                        <div style={{ marginRight: 16 }}>
                            <Link href={`/author/${user_id}`}>
                                <a>
                                    <Image
                                        src={
                                            !user.imageUrl
                                                ? '/static/insta-2.jpg'
                                                : `${API_URL}image/${user.imageUrl}`
                                        }
                                        className="author-picture mr-2 border50 author"
                                        alt="author"
                                        width={50}
                                        height={50}
                                        layout="intrinsic"
                                    />
                                </a>
                            </Link>
                        </div>
                        <Link href={`/author/${user_id}`}>
                            <a>
                                {getAuthors.getAuthorName(users.items, user_id)}
                            </a>
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        {moment(date).format('LL')}
                    </li>
                    <li className="list-inline-item">
                        <i className="icon-eye" /> {view}
                    </li>
                </ul>
                <h5 className="post-title mb-3 mt-3">
                    <Link href={`/post/${translitRuEnLowercase(title)}/${id}`}>
                        <a target="_blank">{title}</a>
                    </Link>
                </h5>
                <span className="excerpt mb-0">{parseText(text)}</span>
            </div>
            <div className="post-bottom clearfix d-flex align-items-center">
                <div className="float-end d-none d-md-block">
                    <Link href={`/post/${translitRuEnLowercase(title)}/${id}`}>
                        <a className="more-link" target="_blank">
                            Продолжить чтение
                            <i className="icon-arrow-right" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Post
