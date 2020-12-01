import React from "react"
import * as yup from "yup"
import TextInput from "../common/form/TextInput"
import {
  Board,
  BoardDocument,
  BoardQuery,
  Card,
  List,
  MutationCreateTeamArgs,
  useCreateListMutation,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"
import { Button } from "antd"
import { Maybe } from "graphql/jsutils/Maybe"

const schema = yup.object().shape({
  name: yup.string().required("Name is required").max(50, "Name is too long (>50 characters)"),
})

const NewListButton = ({
  board,
}: {
  board: { __typename?: "Board" } & Pick<Board, "id" | "name"> & {
      lists?: Maybe<
        Array<
          { __typename?: "List" } & Pick<List, "id" | "name"> & {
              cards?: Maybe<Array<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "index">>>
            }
        >
      >
    }
}) => {
  const [createList, { loading, data }] = useCreateListMutation()

  const onSubmit = async (formData: MutationCreateTeamArgs) => {
    await createList({
      variables: { boardId: board.id, ...formData },
      update: (store, { data }) => {
        if (!data.createList.exists) {
          console.log("bruh")
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
      schema={schema}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createList.exists}
      customSuccessCondition={(data) => !!data?.createList && !data.createList.exists}
      renderForm={(control, errors, reset) => (
        <TextInput
          label="Name"
          name="name"
          error={
            errors.name?.message ||
            (!reset && data?.createList.exists && "List with this name already exists")
          }
          control={control}
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
