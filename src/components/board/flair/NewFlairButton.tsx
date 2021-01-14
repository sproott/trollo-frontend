import React, { useContext, useState } from "react"

import { BoardContext } from "../Board"
import Box from "../../common/util/Box"
import ColorPicker from "../../common/ColorPicker"
import { Div } from "../../common/util/Text"
import { Flair } from "../../common/Flair"
import ModalForm from "../../common/form/ModalForm"
import { PlusOutlined } from "@ant-design/icons"
import TextInput from "../../common/form/TextInput"
import { useCreateFlairMutation } from "../../../../generated/graphql"

type FormData = {
  name: string
}

export const NewFlairButton = () => {
  const [createFlair, { data, loading }] = useCreateFlairMutation()
  const [hue, setHue] = useState(0)
  const {
    team: { id: teamId, name: teamName },
  } = useContext(BoardContext)

  const onSubmit = async (formData: FormData) => {
    await createFlair({
      variables: { teamId, ...formData, hue },
    })
    setHue(0)
  }

  return (
    <ModalForm
      title={`Create a new flair in ${teamName}`}
      defaultValues={{
        name: "",
      }}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      error={data?.createFlair.exists}
      customSuccessCondition={(data) => !!data?.createFlair && !data.createFlair.exists}
      onClose={setHue.bind(this, 0)}
      renderForm={(useFormMethods, reset) => {
        const { name } = useFormMethods.watch()

        return (
          <>
            <Box flex alignItems="flex-start">
              <Flair label={name} hue={hue} style={{ width: "auto" }} />
            </Box>
            <TextInput
              label="Name"
              name="name"
              error={
                useFormMethods.errors.name?.message ??
                (!reset && data?.createFlair.exists && "Flair with this name already exists")
              }
              maxLength={20}
              useFormMethods={useFormMethods}
            />
            <Box flex alignItems="center" gap="7px">
              <Div>Hue: </Div>
              <ColorPicker value={hue} onChange={setHue} />
            </Box>
          </>
        )
      }}
      renderButton={(showModal) => (
        <PlusOutlined style={{ padding: "6px", cursor: "pointer" }} onClick={showModal} />
      )}
    />
  )
}
