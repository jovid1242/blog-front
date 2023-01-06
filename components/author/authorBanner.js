import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

import { Popover } from 'antd'
import { API_URL } from '../api'
import EditUser from '../profile/editUser'

const AuthorBanner = ({ author }) => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(false)
    console.log('=---author---', author)

    function parseJwt(token) {
        if (!token) {
            return
        }
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))
    }

    const content = (
        <div onClick={() => setOpen(true)} className="cursorp">
            <p>Изменить информацию</p>
        </div>
    )

    useEffect(() => {
        setUser(parseJwt(getCookie('token')))
    }, [])

    return (
        <>
            <EditUser open={open} setOpen={setOpen} user={user} />
            <section
                className="hero data-bg-image d-flex align-items-center"
                style={{ backgroundImage: `url(${'/static/hero.jpg'})` }}
            >
                <div className="container-xl">
                    <div className="cta text-center">
                        {user ? (
                            <Popover content={content} title={false}>
                                <Image
                                    src={
                                        !author?.imageUrl ||
                                        author?.imageUrl === null
                                            ? '/static/insta-2.jpg'
                                            : `${API_URL}image/${author.imageUrl}`
                                    }
                                    className="w40 mr-2 border50 cursorp post-image"
                                    alt="author"
                                    width={130}
                                    height={130}
                                    layout="intrinsic"
                                />
                            </Popover>
                        ) : (
                            <Image
                                src={
                                    !author?.imageUrl ||
                                    author?.imageUrl === null
                                        ? '/static/insta-2.jpg'
                                        : `${API_URL}image/${author.imageUrl}`
                                }
                                className="w40 mr-2 border50 post-image"
                                alt="author"
                                width={130}
                                height={130}
                                layout="intrinsic"
                            />
                        )}

                        {/* <h2 className={'mt-0 mb-2 ' + user?.imageUrl}>
                            {user?.name}
                        </h2>
                        <Link href={user?.social}>
                            <a className="mb-4" target="_blank">
                                <i
                                    className="icon-social-instagram"
                                    style={{ fontSize: 28 }}
                                />
                            </a>
                        </Link>
                        <p className="mt-0">
                            {user?.info !== null ? (
                                user?.info
                            ) : (
                                <>
                                    Hello, I’m a content writer who is
                                    fascinated by content fashion, celebrity and
                                    lifestyle. She helps clients bring the right
                                    content to the right people.
                                </>
                            )}
                        </p> */}
                    </div>
                </div>
                <span className="mouse mt-4">
                    <span className="wheel"></span>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 260">
                    <path
                        fill="#FFF"
                        fillOpacity="1"
                        d="M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,245.3C840,235,960,181,1080,176C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </section>
        </>
    )
}

export default AuthorBanner
