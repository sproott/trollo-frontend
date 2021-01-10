import { Button, Divider } from "antd"
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"

import Box from "../common/util/Box"
import { Div } from "../common/util/Text"
import { FlairBox } from "./board.styled"
import { FlairFromFragment } from "./FlairFromFragment"
import { FlairInfoFragment } from "../../../generated/graphql"
import Modal from "antd/lib/modal/Modal"
import { NewFlairButton } from "./NewFlairButton"

export const EditFlairs = ({
  cardFlairs,
  teamFlairs,
}: {
  cardFlairs: FlairInfoFragment[]
  teamFlairs: FlairInfoFragment[]
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [cardFlairsLookup, setCardFlairsLookup] = useState<{ [key: string]: FlairInfoFragment }>({})
  useEffect(() => {
    setCardFlairsLookup(
      cardFlairs.reduce(function (map: { [key: string]: FlairInfoFragment }, flair) {
        map[flair.id] = flair
        return map
      }, {})
    )
  }, [cardFlairs])

  return (
    <>
      <EditOutlined
        style={{ padding: "6px", cursor: "pointer" }}
        onClick={setModalVisible.bind(this, true)}
      />
      <Modal
        visible={modalVisible}
        onCancel={setModalVisible.bind(this, false)}
        footer={
          <Button type="primary" onClick={setModalVisible.bind(this, false)}>
            Close
          </Button>
        }
      >
        <Box flex flexDirection="column">
          <Div style={{ marginBottom: "7px" }}>Card flairs</Div>
          <FlairBox>
            {[...cardFlairs]
              .sort((f1, f2) => f1.name.localeCompare(f2.name))
              .map((f) => (
                <FlairFromFragment
                  key={f.id}
                  flair={f}
                  icon={(color) => (
                    <CloseOutlined style={{ color: color, padding: "3px", marginLeft: "4px" }} />
                  )}
                />
              ))}
          </FlairBox>
          <Divider />
          <Div style={{ marginBottom: "7px" }}>Available flairs</Div>
          <FlairBox>
            {[...teamFlairs]
              .sort((f1, f2) => f1.name.localeCompare(f2.name))
              .filter((f) => !cardFlairsLookup[f.id])
              .map((f) => (
                <FlairFromFragment
                  key={f.id}
                  flair={f}
                  icon={(color) => (
                    <PlusOutlined style={{ color: color, padding: "3px", marginLeft: "4px" }} />
                  )}
                />
              ))}
            <NewFlairButton />
          </FlairBox>
        </Box>
      </Modal>
    </>
  )
}
