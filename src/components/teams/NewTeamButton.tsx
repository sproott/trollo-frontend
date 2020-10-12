import React, { useState } from "react"
import { Button, Form, Modal } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup"
import TextInput from "../common/form/TextInput"
import {
  BoardsDocument,
  BoardsQuery,
  MutationCreateTeamArgs,
  useCreateTeamMutation,
} from "../../../generated/graphql"
import produce from "immer"

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
})

const NewTeamButton = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [createTeam, { loading, data }] = useCreateTeamMutation()
  const { control, handleSubmit, errors, reset: resetForm } = useForm<MutationCreateTeamArgs>({
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: MutationCreateTeamArgs) => {
    setSubmitted(true)
    await createTeam({
      variables: formData,
      update: (store, { data }) => {
        if (!data.createTeam.exists) {
          const boards = store.readQuery<BoardsQuery>({ query: BoardsDocument })
          const ownTeams = boards.currentUser.ownTeams

          store.writeQuery<BoardsQuery>({
            query: BoardsDocument,
            data: produce(boards, (x) => {
              x.currentUser.ownTeams.push(data.createTeam.team)
            }),
          })
        }
      },
    })
  }

  const showModal = () => {
    resetForm()
    setModalVisible(true)
  }
  const closeModal = () => setModalVisible(false)

  if (submitted && !loading && !!data?.createTeam && !data.createTeam.exists) {
    setSubmitted(false)
    setModalVisible(false)
  }

  return (
    <>
      <Modal
        title="Create new team"
        visible={modalVisible}
        onCancel={closeModal}
        onOk={handleSubmit(onSubmit)}
        confirmLoading={submitted}
      >
        <Form onSubmitCapture={handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            name="name"
            error={
              errors.name?.message ||
              (data?.createTeam.exists && "Team with this name already exists")
            }
            control={control}
          />
        </Form>
      </Modal>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        New team
      </Button>
    </>
  )
}

export default NewTeamButton
