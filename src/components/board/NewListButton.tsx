import {
  BoardQueryBoardFragment,
  MutationCreateListArgs,
  useCreateListMutation,
} from "../../../generated/graphql"

import { Button } from "antd"
import ModalForm from "../common/form/ModalForm"
import React from "react"
import TextInput from "../common/form/TextInput"

const NewListButton = ({ board }: { board: BoardQueryBoardFragment }) => {
  const [createList, { loading, data }] = useCreateListMutation()

  const onSubmit = async (formData: MutationCreateListArgs) => {
    await createList({
      variables: { boardId: board.id, ...formData },
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
            useFormMethods.errors.name?.message ??
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
