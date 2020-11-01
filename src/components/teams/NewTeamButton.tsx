import React from "react"
import { PlusOutlined } from "@ant-design/icons"
import * as yup from "yup"
import TextInput from "../common/form/TextInput"
import {
  MutationCreateTeamArgs,
  TeamsDocument,
  TeamsQuery,
  useCreateTeamMutation,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"
import { Button } from "antd"

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
})

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
              x.currentUser.owns.push({ team: data.createTeam.team })
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
      schema={schema}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      customSuccessCondition={(data) => !!data?.createTeam && !data.createTeam.exists}
      renderForm={(control, errors) => (
        <TextInput
          label="Name"
          name="name"
          error={
            errors.name?.message ||
            (data?.createTeam.exists && "Team with this name already exists")
          }
          control={control}
        />
      )}
      renderButton={(showModal) => (
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          New team
        </Button>
      )}
    />
  )
}

export default NewTeamButton
