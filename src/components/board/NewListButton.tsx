import React from "react"
import TextInput from "../common/form/TextInput"
import {
  Board,
  BoardDocument,
  BoardQuery,
  Card,
  List,
  MutationCreateListArgs,
  useCreateListMutation,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"
import { Button } from "antd"
import { Maybe } from "graphql/jsutils/Maybe"

const NewListButton = ({
  board,
}: {
  board: { __typename?: "Board" } & Pick<Board, "id" | "name"> & {
      lists?: Maybe<
        Array<
          { __typename?: "List" } & Pick<List, "id" | "name"> & {
              cards?: Maybe<
                Array<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "description" | "index">>
              >
            }
        >
      >
    }
}) => {
  const [createList, { loading, data }] = useCreateListMutation()

  const onSubmit = async (formData: MutationCreateListArgs) => {
    await createList({
      variables: { boardId: board.id, ...formData },
      update: (store, { data }) => {
        if (!data.createList.exists) {
          const boardData = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: board.id },
          })

          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(boardData, (x) => {
              // @ts-ignore
              x.board.lists.push(data.createList.list)
            }),
          })
        }
      },
    })
  }

  return (
    <ModalForm
      title={`Create a new list in ${board.name}`}
      defaultValues={{
        name: "",
      }}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createList.exists}
      customSuccessCondition={(data) => !!data?.createList && !data.createList.exists}
      renderForm={(useFormMethods, reset) => (
        <TextInput
          label="Name"
          name="name"
          error={
            useFormMethods.errors.name?.message ||
            (!reset && data?.createList.exists && "List with this name already exists")
          }
          useFormMethods={useFormMethods}
        />
      )}
      renderButton={(showModal) => (
        <Button type="primary" onClick={showModal}>
          New list
        </Button>
      )}
    />
  )
}

export default NewListButton
