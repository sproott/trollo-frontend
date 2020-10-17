import React from "react"
import { CreateBoardButton } from "./teams.styled"
import { PlusOutlined } from "@ant-design/icons"
import { Centered } from "../common/Centered"
import {
  BoardsDocument,
  BoardsQuery,
  TeamInfoFragment,
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
          const boards = store.readQuery<BoardsQuery>({ query: BoardsDocument })

          store.writeQuery<BoardsQuery>({
            query: BoardsDocument,
            data: produce(boards, (x) => {
              x.currentUser.ownTeams
                .find((team) => team.id == teamId)
                .boards.push(data.createBoard.board)
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
      customSuccessCondition={(data) => !!data?.createBoard && !data.createBoard.exists}
      renderForm={(control, errors) => (
        <TextInput
          label="Name"
          name="name"
          error={
            errors.name?.message ||
            (data?.createBoard.exists && "Board with this name already exists")
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
