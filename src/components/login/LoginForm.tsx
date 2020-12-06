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
  useLoginMutation,
} from "../../../generated/graphql"
import { H4 } from "../common/Text"
import { useRouter } from "next/router"
import Box from "../common/Box"

const layout = {
  layout: "vertical",
} as FormProps

const LoginForm = () => {
  const [login, { loading, error: gqlError, data }] = useLoginMutation()
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const useFormMethods = useForm<LoginInput>({
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

  const { handleSubmit } = useFormMethods

  return (
    <Form {...layout} onSubmitCapture={handleSubmit(onSubmit)}>
      <Row justify="center">
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <Box flex flexDirection="column" gap="10px">
            <div style={{ minHeight: "30px" }}>
              {gqlError && <H4 color="red">Wrong username or password</H4>}
            </div>
            <TextInput
              label="Username or e-mail"
              name="usernameOrEmail"
              useFormMethods={useFormMethods}
              maxLength={254}
            />
            <PasswordInput
              label="Password"
              name="password"
              useFormMethods={useFormMethods}
              maxLength={32}
            />
            <HorizontallyCentered>
              <SubmitButton label="Login" loading={submitted} />
            </HorizontallyCentered>
          </Box>
        </Col>
      </Row>
    </Form>
  )
}

export default LoginForm
