import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Col, Form, Row } from "antd"
import TextInput from "../common/form/TextInput"
import PasswordInput from "../common/form/PasswordInput"
import { FormProps } from "antd/es/form"
import SubmitButton from "../common/form/SubmitButton"
import Centered from "../common/Centered"

const layout = {
  layout: "vertical",
} as FormProps

type FormData = {
  usernameOrEmail: string
  password: string
}

const LoginForm = () => {
  const { control, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  })
  const onSubmit = useCallback((data) => console.log(data), [])

  return (
    <Form {...layout} onSubmitCapture={handleSubmit(onSubmit)}>
      <Row justify="center">
        <Col xs={16} sm={12} md={10} lg={8} xl={6}>
          <TextInput label="Username or e-mail" name="usernameOrEmail" control={control} />
          <PasswordInput label="Password" name="password" control={control} />
          <Centered>
            <SubmitButton label="Login" />
          </Centered>
        </Col>
      </Row>
    </Form>
  )
}

export default LoginForm
