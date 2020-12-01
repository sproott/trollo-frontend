import React from "react"
import * as yup from "yup"
import TextInput from "../common/form/TextInput"
import {
  BoardDocument,
  BoardQuery,
  Card,
  List,
  MutationCreateTeamArgs,
  useCreateCardMutation,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"
import { Maybe } from "graphql/jsutils/Maybe"
import { CreateCardButton } from "./board.styled"
import { PlusOutlined } from "@ant-design/icons"
import { Centered } from "../common/Centered"

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
})

const NewCardButton = ({
  boardId,
  list,
}: {
  boardId: string
  list: { __typename?: "List" } & Pick<List, "id" | "name"> & {
      cards?: Maybe<Array<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "index">>>
    }
}) => {
  const [createCard, { loading, data }] = useCreateCardMutation()

  const onSubmit = async (formData: MutationCreateTeamArgs) => {
    await createCard({
      variables: { listId: list.id, ...formData },
      update: (store, { data }) => {
        if (!data.createCard.exists) {
          console.log("bruh")
          const boardData = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: boardId },
          })

          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(boardData, (x) => {
              x.board.lists.find((l) => l.id === list.id).cards.push(data.createCard.card)
            }),
          })
        }
      },
    })
  }

  return (
    <ModalForm
      title={`Create a new card in ${list.name}`}
      defaultValues={{
        name: "",
      }}
      schema={schema}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createCard.exists}
      customSuccessCondition={(data) => !!data?.createCard && !data.createCard.exists}
      renderForm={(control, errors, reset) => (
        <TextInput
          label="Name"
          name="name"
          error={
            errors.name?.message ||
            (!reset && data?.createCard.exists && "Card with this name already exists")
          }
          control={control}
        />
      )}
      renderButton={(showModal) => (
        <CreateCardButton onClick={showModal}>
          <Centered style={{ height: "100%" }}>
            <PlusOutlined />
          </Centered>
        </CreateCardButton>
      )}
    />
  )
}

export default NewCardButton
