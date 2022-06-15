import {Button, Form, Input, message} from "antd";
import Cookies from 'js-cookie'
import {AuthBlock} from "./atoms";
import auth from "../../service/auth";
import {useNavigate} from "react-router-dom";

export const AuthPage = () => {
    const navigate = useNavigate()
    const onFinish = (data) => {
        console.log('Success:', data);
        const params = new URLSearchParams()
        params.append('_subdomain', 'toko')
        params.append('_username', data._username)
        params.append('_password', data._password)

        auth.getToken(params)
            .then(response => {
                if (response.status === 200) {
                    Cookies.set('token', response.data.token)
                    navigate('/')
                }
            })
            .catch(error => message.error(error?.response?.data?.message))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <AuthBlock>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="_username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="_password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </AuthBlock>
    )
}