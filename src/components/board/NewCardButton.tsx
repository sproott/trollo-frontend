import {
  BoardQueryListFragment,
  MutationCreateCardArgs,
  useCreateCardMutation,
} from "../../../generated/graphql"

import { Centered } from "../common/util/Centered"
import { CreateCardButton } from "./board.styled"
import ModalForm from "../common/form/ModalForm"
import { PlusOutlined } from "@ant-design/icons"
import React from "react"
import TextArea from "../common/form/TextArea"
import TextInput from "../common/form/TextInput"

const NewCardButton = ({ list }: { list: BoardQueryListFragment }) => {
  const [createCard, { loading, data }] = useCreateCardMutation()

  const onSubmit = async (formData: MutationCreateCardArgs) => {
    await createCard({
      variables: { listId: list.id, ...formData },
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
              useFormMethods.errors.name?.message ??
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
