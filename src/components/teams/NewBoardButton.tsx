import React from "react"
import { CreateBoardButton } from "./teams.styled"
import { PlusOutlined } from "@ant-design/icons"
import { Centered } from "../common/Centered"
import {
  TeamInfoFragment,
  TeamsDocument,
  TeamsQuery,
  useCreateBoardMutation,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"
import TextInput from "../common/form/TextInput"
import * as yup from "yup"

type FormData = {
  name: string
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
})

const NewBoardButton = ({
  team: { id: teamId, name: teamName },
}: {
  team: { __typename?: "Team" } & TeamInfoFragment
}) => {
  const [createBoard, { loading, data }] = useCreateBoardMutation()

  const onSubmit = async (formData: FormData) => {
    await createBoard({
      variables: { teamId, ...formData },
      update: (store, { data }) => {
        if (!data.createBoard.exists) {
          const boards = store.readQuery<TeamsQuery>({ query: TeamsDocument })

          store.writeQuery<TeamsQuery>({
            query: TeamsDocument,
            data: produce(boards, (x) => {
              x.currentUser.owns
                .find((p) => p.team.id === teamId)
                .team.boards.push(data.createBoard.board)
            }),
          })
        }
      },
    })
  }

  return (
    <ModalForm
      title={`Create a new board in ${teamName}`}
      defaultValues={{
        name: "",
      }}
      schema={schema}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createBoard.exists}
      customSuccessCondition={(data) => !!data?.createBoard && !data.createBoard.exists}
      renderForm={(control, errors, reset) => (
        <TextInput
          label="Name"
          name="name"
          error={
            errors.name?.message ||
            (!reset && data?.createBoard.exists && "Board with this name already exists")
          }
          control={control}
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
