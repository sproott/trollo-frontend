import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Col, Form, Modal, Row } from "antd"
import TextInput from "../common/form/TextInput"
import PasswordInput from "../common/form/PasswordInput"
import { FormProps } from "antd/es/form"
import SubmitButton from "../common/form/SubmitButton"
import Centered from "../common/Centered"
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useCurrentUserQuery,
  useLoginMutation,
} from "../../../generated/graphql"
import { H1, H4 } from "../common/Text"
import { useRouter } from "next/router"
import { rejects } from "assert"

const layout = {
  layout: "vertical",
} as FormProps

type FormData = {
  usernameOrEmail: string
  password: string
}

const LoginForm = () => {
  const [login, { loading, error: gqlError, data }] = useLoginMutation()
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const { control, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  })
  const onSubmit = useCallback(async (formData) => {
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

    router.replace("/")
  }, [])

  return (
    <Form {...layout} onSubmitCapture={handleSubmit(onSubmit)}>
      <Row justify="center">
        <Col xs={16} sm={12} md={10} lg={8} xl={6}>
          <div style={{ minHeight: "30px" }}>
            {gqlError && <H4 color="red">Wrong username or password</H4>}
          </div>
          <TextInput label="Username or e-mail" name="usernameOrEmail" control={control} />
          <PasswordInput label="Password" name="password" control={control} />
          <Centered>
            <SubmitButton label="Login" loading={submitted} />
          </Centered>
        </Col>
      </Row>
    </Form>
  )
}

export default LoginForm
