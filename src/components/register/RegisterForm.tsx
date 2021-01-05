import { Col, Form, Row } from "antd"
import {
  CurrentUserDocument,
  CurrentUserQuery,
  RegisterInput,
  useRegisterMutation,
} from "../../../generated/graphql"
import React, { useState } from "react"

import Box from "../common/Box"
import { Constants } from "../../constants/Constants"
import { FormProps } from "antd/es/form"
import { H4 } from "../common/Text"
import { HorizontallyCentered } from "../common/Centered"
import PasswordInput from "../common/form/PasswordInput"
import SubmitButton from "../common/form/SubmitButton"
import TextInput from "../common/form/TextInput"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"

const layout = {
  layout: "vertical",
} as FormProps

const RegisterForm = () => {
  const [register, { loading, error: gqlError, data }] = useRegisterMutation()
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const useFormMethods = useForm<RegisterInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  })
  const { handleSubmit, errors } = useFormMethods

  const onSubmit = async (formData: RegisterInput) => {
    setSubmitted(true)
    try {
      await register({
        variables: {
          input: formData,
        },
        update: (store, { data }) => {
          store.writeQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
            data: {
              currentUser: data?.register?.user,
            },
          })
        },
      })
    } catch (error) {
      setSubmitted(false)
      return
    }
    setDone(true)
  }

  if (done && !!data) {
    if (!!data.register?.error) {
      setSubmitted(false)
      setDone(false)
    }
    if (!!data.register?.user) {
      router.replace("/")
    }
  }

  const registerError = data?.register?.error

  return (
    <Form {...layout} onSubmitCapture={handleSubmit(onSubmit)}>
      <Row justify="center">
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
          <Box flex flexDirection="column" gap="15px">
            <div style={{ minHeight: "30px" }}>
              {gqlError && <H4 color="red">Something went wrong</H4>}
            </div>
            <TextInput
              label="Username"
              name="username"
              error={
                errors.username?.message ?? (!!registerError?.username && "Username already exists")
              }
              rules={{ pattern: { value: /^[^@]*$/, message: "Username cannot contain @" } }}
              useFormMethods={useFormMethods}
              maxLength={20}
            />
            <TextInput
              label="E-mail"
              name="email"
              error={errors.email?.message ?? (!!registerError?.email && "E-mail already exists")}
              useFormMethods={useFormMethods}
              rules={{ pattern: { value: Constants.EMAIL_REGEX, message: "E-mail is invalid" } }}
              maxLength={254}
            />
            <PasswordInput
              label="Password"
              name="password"
              error={errors.password?.message}
              useFormMethods={useFormMethods}
              rules={{
                minLength: { value: 8, message: "Password must be at least 8 characters long" },
              }}
              maxLength={32}
            />
            <Box padding="20px 0 0 0">
              <HorizontallyCentered>
                <SubmitButton label="Register" loading={submitted} />
              </HorizontallyCentered>
            </Box>
          </Box>
        </Col>
      </Row>
    </Form>
  )
}

export default RegisterForm
