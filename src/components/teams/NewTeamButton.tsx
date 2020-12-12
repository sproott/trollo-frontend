import React from "react"
import { PlusOutlined } from "@ant-design/icons"
import TextInput from "../common/form/TextInput"
import {
  MutationCreateTeamArgs,
  TeamsDocument,
  TeamsQuery,
  TeamInfoFragment,
  useCreateTeamMutation,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"
import { Button } from "antd"

const NewTeamButton = () => {
  const [createTeam, { loading, data }] = useCreateTeamMutation()

  const onSubmit = async (formData: MutationCreateTeamArgs) => {
    await createTeam({
      variables: formData,
      update: (store, { data }) => {
        if (!data.createTeam.exists) {
          const boards = store.readQuery<TeamsQuery>({ query: TeamsDocument })

          store.writeQuery<TeamsQuery>({
            query: TeamsDocument,
            data: produce(boards, (x) => {
              x.currentUser.owns.push({
                __typename: "Participant",
                team: data.createTeam.team as TeamInfoFragment,
              })
            }),
          })
        }
      },
    })
  }

  return (
    <ModalForm
      title="Create a new team"
      defaultValues={{
        name: "",
      }}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createTeam.exists}
      customSuccessCondition={(data) => !!data?.createTeam && !data.createTeam.exists}
      renderForm={(useFormMethods, reset) => {
        return (
          <TextInput
            label="Name"
            name="name"
            error={
              useFormMethods.errors.name?.message ||
              (!reset && data?.createTeam.exists && "Team with this name already exists")
            }
            useFormMethods={useFormMethods}
          />
        )
      }}
      renderButton={(showModal) => (
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          New team
        </Button>
      )}
    />
  )
}

export default NewTeamButton
