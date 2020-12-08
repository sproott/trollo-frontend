import React from "react"
import TextInput from "../common/form/TextInput"
import {
  BoardDocument,
  BoardQuery,
  BoardQueryListFragment,
  Card,
  List,
  MutationCreateCardArgs,
  useCreateCardMutation,
  User,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"
import { CreateCardButton } from "./board.styled"
import { PlusOutlined } from "@ant-design/icons"
import { Centered } from "../common/Centered"
import TextArea from "../common/form/TextArea"

const NewCardButton = ({ boardId, list }: { boardId: string; list: BoardQueryListFragment }) => {
  const [createCard, { loading, data }] = useCreateCardMutation()

  const onSubmit = async (formData: MutationCreateCardArgs) => {
    await createCard({
      variables: { listId: list.id, ...formData },
      update: (store, { data }) => {
        if (!data.createCard.exists) {
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
        description: "",
      }}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createCard.exists}
      customSuccessCondition={(data) => !!data?.createCard && !data.createCard.exists}
      renderForm={(useFormMethods, reset) => (
        <>
          <TextInput
            label="Name"
            name="name"
            error={
              useFormMethods.errors.name?.message ||
              (!reset && data?.createCard.exists && "Card with this name already exists")
            }
            useFormMethods={useFormMethods}
          />
          <TextArea
            label="Description"
            name="description"
            error={useFormMethods.errors.description?.message}
            useFormMethods={useFormMethods}
            optional
          />
        </>
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
