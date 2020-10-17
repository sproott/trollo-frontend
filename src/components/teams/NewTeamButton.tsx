import React from "react"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import * as yup from "yup"
import TextInput from "../common/form/TextInput"
import {
  BoardsDocument,
  BoardsQuery,
  MutationCreateTeamArgs,
  useCreateTeamMutation,
} from "../../../generated/graphql"
import produce from "immer"
import ModalForm from "../common/form/ModalForm"

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
          const boards = store.readQuery<BoardsQuery>({ query: BoardsDocument })
          const ownTeams = boards.currentUser.ownTeams

          store.writeQuery<BoardsQuery>({
            query: BoardsDocument,
            data: produce(boards, (x) => {
              x.currentUser.ownTeams.push(data.createTeam.team)
            }),
          })
        }
      },
    })
  }

  return (
    <ModalForm
      title="Create new team"
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
