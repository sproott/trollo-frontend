import {
  FlairInfoFragment,
  useChangeFlairHueMutation,
  useDeleteFlairMutation,
  useRenameFlairMutation,
} from "../../../../generated/graphql"
import React, { DOMAttributes, ForwardedRef, HTMLAttributes, forwardRef, useState } from "react"

import Box from "../../common/util/Box"
import { Button } from "antd"
import { CSSProperties } from "styled-components"
import ColorPicker from "../../common/ColorPicker"
import ConfirmDeleteModal from "../../common/ConfirmDeleteModal"
import { Div } from "../../common/util/Text"
import EditableText from "../../common/form/EditableText"
import { Flair } from "../../common/Flair"
import Modal from "antd/lib/modal/Modal"

export type FlairFromFragmentProps = {
  flair: FlairInfoFragment
  icon?: (color: string) => React.ReactNode
  nonEditable?: boolean
  style?: CSSProperties
} & HTMLAttributes<HTMLSpanElement> &
  DOMAttributes<HTMLSpanElement>

export const FlairFromFragment = forwardRef(
  (
    { flair, icon, nonEditable, ...other }: FlairFromFragmentProps,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    const [internalHue, setInternalHue] = useState(flair.hue)
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
      setInternalHue(flair.hue)
    }

    return (
      <>
        <Flair
          ref={ref}
          label={flair.name}
          hue={flair.hue}
          icon={icon}
          {...other}
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
              <Flair label={flair.name} hue={internalHue} />
            </Box>
            <EditableText
              label="Name"
              text={flair.name}
              maxLength={20}
              onConfirm={rename}
              error={renameData?.renameFlair.exists && "Flair with this name already exists"}
              success={renameData?.renameFlair.success}
            />
            <Box flex alignItems="center" gap="7px">
              <Div>Hue: </Div>
              <ColorPicker onChange={setInternalHue} onDragEnd={changeHue} value={internalHue} />
            </Box>
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
)
