import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import FormData from "form-data";

// components
import { Button, Form, Input, Select } from 'antd'
import { toast } from 'react-toastify'
import http from '../http'

// // slices
import { addPost, setLoad } from '../../redux/slices/author/author'
import { fetchCategory } from '../../redux/slices/category'

import dynamic from 'next/dynamic'
const Jjeditor = dynamic(() => import('../editor/editorjs/Editor'), {
    ssr: false,
})

import styles from '../../styles/profile.module.scss'
const { Option } = Select

const NewPost = () => {
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const { category } = useSelector((state) => state.category)
    const { user } = useSelector((state) => state.auth)
    const [content, setContent] = useState({})

    const validateMessages = {
        required: 'Пожалуйста, заполните поля ${label} ',
    }

    const onReset = () => {
        form.resetFields()
    }

    const onFinish = (values) => {
        const data = new FormData()
        data.append('title', values.title)
        data.append('tags', JSON.stringify(selectedTags))
        data.append('text', JSON.stringify(content))
        data.append('image', values.image.target.files[0])
        data.append('category', values.category)
        data.append('user_id', user.id)
        dispatch(setLoad(true))
        http.post('/post', data)
            .then((res) => {
                // onReset()
                toast.success('Пост успешно добавлен!')
                dispatch(addPost(res.data.data))
            })
            .catch(function (errors) {
                toast.error(
                    'Упс, ошибка при загрузка файла , ( размер изображение должен быть меньше 400-600кб)'
                )
            })
            .finally(() => {
                dispatch(setLoad(false))
            })
    }

    useEffect(() => {
        dispatch(fetchCategory())
        http.get('/tags').then(({ data }) => {
            setTags(
                data.data.map((tag) => {
                    return {
                        value: tag.name,
                        label: tag.name,
                        id: tag.id,
                    }
                })
            )
        })
    }, [])

    const handleSelectTags = (value, key) => {
        const checkTag = tags.filter((item) => item.value === value)
        if (!checkTag.length) {
            http.post('/tags/create', { name: value }).then(({ data }) => {
                setSelectedTags((prev) => [
                    ...prev,
                    {
                        value: data.name,
                        label: data.name,
                        id: data.id,
                    },
                ])
            })
        } else {
            setSelectedTags((prev) => [...prev, key])
        }
    }

    return (
        <div className={styles.user_info}>
            <div className={styles.form_wrapper}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    autoComplete="off"
                >
                    <Form.Item name="title" rules={[{ required: true }]}>
                        <Input placeholder="Заголовок" size="large" />
                    </Form.Item>

                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Item
                                valuePropName="fileList"
                                name="image"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="file"
                                    placeholder="Заголовок"
                                    size="middle"
                                />
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item
                                name="category"
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Категория" size="large">
                                    {category?.items?.map((item) => {
                                        return (
                                            <Select.Option
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.title}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item name="text">
                        <Jjeditor setContent={setContent} />
                    </Form.Item>

                    <div className="col-sm-12">
                        <Form.Item name="tags" rules={[{ required: true }]}>
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Выберите тег"
                                onSelect={handleSelectTags}
                                maxTagCount={6}
                                options={tags}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={false}
                            block
                        >
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default NewPost
