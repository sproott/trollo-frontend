import {
  MutationCreateBoardArgs,
  TeamInfoFragment,
  useCreateBoardMutation,
} from "../../../generated/graphql"

import { Centered } from "../common/Centered"
import { CreateBoardButton } from "./teams.styled"
import ModalForm from "../common/form/ModalForm"
import { PlusOutlined } from "@ant-design/icons"
import React from "react"
import TextInput from "../common/form/TextInput"

const NewBoardButton = ({ team: { id: teamId, name: teamName } }: { team: TeamInfoFragment }) => {
  const [createBoard, { loading, data }] = useCreateBoardMutation()

  const onSubmit = async (formData: MutationCreateBoardArgs) => {
    await createBoard({
      variables: { teamId, ...formData },
    })
  }

  return (
    <ModalForm
      title={`Create a new board in ${teamName}`}
      defaultValues={{
        name: "",
      }}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createBoard.exists}
      customSuccessCondition={(data) => !!data?.createBoard && !data.createBoard.exists}
      renderForm={(useFormMethods, reset) => (
        <TextInput
          label="Name"
          name="name"
          error={
            useFormMethods.errors.name?.message ??
            (!reset && data?.createBoard.exists && "Board with this name already exists")
          }
          useFormMethods={useFormMethods}
        />
      )}
      renderButton={(showModal) => (
        <CreateBoardButton onClick={showModal}>
          <Centered style={{ height: "100%" }}>
            <PlusOutlined />
          </Centered>
        </CreateBoardButton>
      )}
    />
  )
}

export default NewBoardButton
