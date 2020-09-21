import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Col, Form, Modal, Row } from "antd"
import TextInput from "../common/form/TextInput"
import PasswordInput from "../common/form/PasswordInput"
import { FormProps } from "antd/es/form"
import SubmitButton from "../common/form/SubmitButton"
import Centered from "../common/Centered"
import { useLoginMutation } from "../../../generated/graphql"
import { H1, H4 } from "../common/Text"
import { useRecoilState } from "recoil"
import { userState } from "../../state/user.state"
import redirect from "../../lib/redirect"

const layout = {
  layout: "vertical",
} as FormProps

type FormData = {
  usernameOrEmail: string
  password: string
}

const LoginForm = () => {
  const [login, { loading, error: gqlError, data }] = useLoginMutation()
  const [user, setUser] = useRecoilState(userState)
  const [submitted, setSubmitted] = useState(false)

  const { control, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  })
  const onSubmit = useCallback((formData) => {
    console.log(formData)
    setSubmitted(true)
    login({
      variables: {
        input: formData,
      },
    })
      .then(({ data: { login: user } }) => {
        setUser(user)
        redirect("/")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Modal
        visible={submitted && !loading && !!data?.login}
        title="Login success"
        okText="OK"
        onOk={() => setSubmitted(false)}
        onCancel={() => setSubmitted(false)}
      >
        <H1>Successfully logged in as {data?.login?.username}</H1>
      </Modal>
      <Form {...layout} onSubmitCapture={handleSubmit(onSubmit)}>
        <Row justify="center">
          <Col xs={16} sm={12} md={10} lg={8} xl={6}>
            <div style={{ minHeight: "30px" }}>
              {gqlError && <H4 color="red">Wrong username or password</H4>}
            </div>
            <TextInput label="Username or e-mail" name="usernameOrEmail" control={control} />
            <PasswordInput label="Password" name="password" control={control} />
            <Centered>
              <SubmitButton label="Login" loading={submitted && !data?.login && !gqlError} />
            </Centered>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default LoginForm
