import { Button, Form, Tooltip } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { useGenerateInviteMutation, useInviteIntervalsQuery } from "../../../generated/graphql"

import { CopyToClipboard } from "react-copy-to-clipboard"
import { Div } from "../common/util/Text"
import { Select } from "antd"
import _ from "lodash"

const InviteLink = ({ link }: { link: string }) => {
  const basePath =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port && ":" + window.location.port)
  const [copied, setCopied] = useState(false)

  const debouncedCopiedReset = useCallback(_.debounce(setCopied.bind(this, false), 1000), [])

  const onCopy = () => {
    setCopied(true)
    debouncedCopiedReset()
  }

  return (
    <Tooltip title="Copied to clipboard!" visible={copied}>
      <CopyToClipboard text={link && `${basePath}?invite-token=${link}`} onCopy={onCopy}>
        <Button type={link ? "primary" : "default"} disabled={!link}>
          Copy invitation link
        </Button>
      </CopyToClipboard>
    </Tooltip>
  )
}

const CreateInviteLink = ({ teamId }: { teamId: string }) => {
  const [initDone, setInitDone] = useState(false)
  const { data, loading } = useInviteIntervalsQuery()
  const [generateInvite, { data: inviteData }] = useGenerateInviteMutation()

  const createInviteLink = (value: string) => {
    generateInvite({
      variables: {
        teamId,
        expiration: value,
      },
    })
  }

  useEffect(() => {
    if (data && !initDone) {
      createInviteLink(data.inviteIntervals[0])
      setInitDone(true)
    }
  }, [data])

  return loading ? (
    <></>
  ) : (
    <>
      <Div style={{ marginTop: "15px" }}>Create invitation link</Div>
      <Form.Item label="Expiration: ">
        <Select defaultValue={data.inviteIntervals[0]} onChange={createInviteLink}>
          {data.inviteIntervals.map((interval) => (
            <Select.Option key={interval} value={interval}>
              {interval}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <InviteLink link={inviteData?.generateInvite} />
    </>
  )
}

export default CreateInviteLink
