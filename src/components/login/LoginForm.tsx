import { Col, Form, Row } from "antd"
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginInput,
  useLoginMutation,
} from "../../../generated/graphql"
import React, { useState } from "react"

import Box from "../common/util/Box"
import { FormProps } from "antd/es/form"
import { H4 } from "../common/util/Text"
import { HorizontallyCentered } from "../common/util/Centered"
import PasswordInput from "../common/form/PasswordInput"
import SubmitButton from "../common/form/SubmitButton"
import TextInput from "../common/form/TextInput"
import { useForm } from "react-hook-form"

const layout = {
  layout: "vertical",
} as FormProps

const LoginForm = () => {
  const [login, { error: gqlError }] = useLoginMutation()
  const [submitted, setSubmitted] = useState(false)

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
  }

  const { handleSubmit } = useFormMethods

  return (
    <Form {...layout} onSubmitCapture={handleSubmit(onSubmit)}>
      <Row justify="center">
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <Box flex flexDirection="column" gap="15px">
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
