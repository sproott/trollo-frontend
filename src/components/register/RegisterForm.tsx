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
  RegisterInput,
  TeamsDocument,
  useRegisterMutation,
} from "../../../generated/graphql"
import { H4 } from "../common/Text"
import { useRouter } from "next/router"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Box from "../common/Box"

const layout = {
  layout: "vertical",
} as FormProps

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
})

const RegisterForm = () => {
  const [register, { loading, error: gqlError, data }] = useRegisterMutation()
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const { control, handleSubmit, errors, getValues } = useForm<RegisterInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  })

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
        <Col xs={16} sm={12} md={10} lg={8} xl={6}>
          <div style={{ minHeight: "30px" }}>
            {gqlError && <H4 color="red">Something went wrong</H4>}
          </div>
          <TextInput
            label="Username"
            name="username"
            error={
              errors.username?.message || (!!registerError?.username && "Username already exists")
            }
            control={control}
          />
          <TextInput
            label="E-mail"
            name="email"
            error={errors.email?.message || (!!registerError?.email && "E-mail already exists")}
            control={control}
          />
          <PasswordInput
            label="Password"
            name="password"
            error={errors.password?.message}
            control={control}
          />
          <Box padding="20px 0 0 0">
            <HorizontallyCentered>
              <SubmitButton label="Register" loading={submitted} />
            </HorizontallyCentered>
          </Box>
        </Col>
      </Row>
    </Form>
  )
}

export default RegisterForm
