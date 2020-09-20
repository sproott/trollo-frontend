import { useLoginMutation } from "../../generated/graphql"
import React, { useEffect } from "react"

export default function ExampleComp() {
  const [login, { loading, error, data }] = useLoginMutation()

  useEffect(() => {
    login({
      variables: {
        input: {
          usernameOrEmail: "appadmin",
          password: "omegalul",
        },
      },
    })
  }, [])

  if (error) return <div>Error while loading.</div>
  if (loading || !data) return <div>loading...</div>

  const { id, username, email } = data.login

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{id}</div>
      <div>{username}</div>
      <div>{email}</div>
    </div>
  )
}
