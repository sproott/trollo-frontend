import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Col, Form, Row } from "antd"
import TextInput from "../common/form/TextInput"
import PasswordInput from "../common/form/PasswordInput"
import { FormProps } from "antd/es/form"
import SubmitButton from "../common/form/SubmitButton"
import { HorizontallyCentered } from "../common/Centered"
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginInput,
  TeamsDocument,
  useLoginMutation,
} from "../../../generated/graphql"
import { H4 } from "../common/Text"
import { useRouter } from "next/router"

const layout = {
  layout: "vertical",
} as FormProps

const LoginForm = () => {
  const [login, { loading, error: gqlError, data }] = useLoginMutation()
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const { control, handleSubmit, errors } = useForm<LoginInput>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  })
  const onSubmit = async (formData: LoginInput) => {
    setSubmitted(true)
    try {
      await login({
        variables: {
          input: formData,
        },
        update: (store, { data }) => {
          store.writeQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
            data: {
              currentUser: data?.login,
            },
          })
        },
      })
    } catch (error) {
      setSubmitted(false)
      return
    }

    await router.replace("/")
  }

  return (
    <Form {...layout} onSubmitCapture={handleSubmit(onSubmit)}>
      <Row justify="center">
        <Col xs={16} sm={12} md={10} lg={8} xl={6}>
          <div style={{ minHeight: "30px" }}>
            {gqlError && <H4 color="red">Wrong username or password</H4>}
          </div>
          <TextInput label="Username or e-mail" name="usernameOrEmail" control={control} />
          <PasswordInput label="Password" name="password" control={control} />
          <HorizontallyCentered>
            <SubmitButton label="Login" loading={submitted} />
          </HorizontallyCentered>
        </Col>
      </Row>
    </Form>
  )
}

export default LoginForm
