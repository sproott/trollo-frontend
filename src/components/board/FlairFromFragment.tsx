import { Button, Form } from "antd"
import {
  FlairInfoFragment,
  useChangeFlairHueMutation,
  useDeleteFlairMutation,
  useRenameFlairMutation,
} from "../../../generated/graphql"
import React, { useState } from "react"

import Box from "../common/util/Box"
import ColorPicker from "../common/ColorPicker"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"
import EditableText from "../common/form/EditableText"
import { Flair } from "../common/Flair"
import Modal from "antd/lib/modal/Modal"

export const FlairFromFragment = ({
  flair,
  icon,
  nonEditable,
}: {
  flair: FlairInfoFragment
  icon?: (color: string) => React.ReactNode
  nonEditable?: boolean
}) => {
  const [internalHue, setInternalHue] = useState(flair.hue)
  const [internalName, setInternalName] = useState(flair.name)
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [renameMutate, { data: renameData }] = useRenameFlairMutation()
  const [changeHueMutate] = useChangeFlairHueMutation()
  const [deleteFlairMutate] = useDeleteFlairMutation()

  const rename = async (newName: string) => {
    await renameMutate({ variables: { flairId: flair.id, name: newName } })
  }
  const changeHue = async () => {
    await changeHueMutate({ variables: { flairId: flair.id, hue: internalHue } })
  }
  const deleteFlair = async () => {
    await deleteFlairMutate({ variables: { flairId: flair.id } })
    setConfirmationVisible(false)
    setModalVisible(false)
  }
  const closeModal = () => {
    setModalVisible(false)
    setInternalName(flair.name)
    setInternalHue(flair.hue)
  }

  return (
    <>
      <Flair
        label={flair.name}
        hue={flair.hue}
        icon={icon}
        onClick={setModalVisible.bind(this, true)}
      />
      <Modal
        visible={!nonEditable && modalVisible}
        onCancel={closeModal}
        destroyOnClose
        footer={
          <Button type="primary" danger onClick={setConfirmationVisible.bind(this, true)}>
            Delete flair
          </Button>
        }
      >
        <Box flex flexDirection="column" gap="15px">
          <Box flex justifyContent="flex-start">
            <Flair label={internalName} hue={internalHue} />
          </Box>
          <EditableText
            label="Name"
            text={flair.name}
            maxLength={20}
            onConfirm={rename}
            onChange={setInternalName}
            error={renameData?.renameFlair.exists && "Flair with this name already exists"}
          />
          <Form.Item label="Hue" style={{ alignItems: "center" }}>
            <ColorPicker
              onChange={setInternalHue}
              onDragEnd={changeHue}
              value={internalHue}
              style={{ minWidth: "300px" }}
            />
          </Form.Item>
        </Box>
      </Modal>
      <ConfirmDeleteModal
        title="Do you really want to delete this flair?"
        visible={!nonEditable && confirmationVisible}
        onCancel={setConfirmationVisible.bind(this, false)}
        onOk={deleteFlair}
      />
    </>
  )
}
