import React from "react"
import { useBoardQuery } from "../../../generated/graphql"
import { useRouter } from "next/router"
import Spinner from "../loading/Spinner"
import { Content } from "../common/page.styled"

const Board = ({ boardId }: { boardId: string }) => {
  const { data, error, loading } = useBoardQuery({ variables: { id: boardId } })
  const router = useRouter()

  if (!!error) {
    router.replace("/")
  }

  return loading ? <Spinner /> : <Content>{JSON.stringify(data)}</Content>
}

export default Board
