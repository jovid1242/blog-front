import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, Modal, Form, Input, Space, Badge, Avatar } from 'antd'
import { toast } from 'react-toastify'

// api
import http from '../http'
import { API_URL } from '../api'

const editUser = ({ open, setOpen, user }) => {
    const router = useRouter()
    const [form] = Form.useForm()

    const [fields, setFields] = useState([])

    const showModal = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const onReset = () => {
        form.resetFields()
    }

    const onFinish = (values) => {
        const data = new FormData()
        data.append('social', values.social)
        data.append('info', values.info)
        data.append('image', values.image.target.files[0])
        http.post('/user/info', data)
            .then((res) => {
                onReset()
                toast.success('Профиль успешно изменено!')
            })
            .catch(function (errors) {
                toast.error(`Размер изображения должен быть меньше 512Кб!`)
            })
            .finally(() => {
                window.location.reload()
            })
    }

    useEffect(() => {
        setFields([
            {
                name: ['social'],
                value: user?.social,
            },
            {
                name: ['info'],
                value: user?.info,
            },
        ])
    }, [user])

    return (
        <Modal
            title="Редактирование информации о пользователе"
            open={open}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                name="basic"
                form={form}
                fields={fields}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="social"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, напишите ссылку телеграм',
                        },
                    ]}
                >
                    <Input placeholder="Ссылка instagram" />
                </Form.Item>

                <Form.Item
                    valuePropName="fileList"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, добавьте аватарку',
                        },
                    ]}
                >
                    <Input type="file" placeholder="avatar" />
                </Form.Item>
                <Form.Item
                    name="info"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, заполните информация о себе',
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder="информация о себе"
                        showCount
                        maxLength={100}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default editUser
