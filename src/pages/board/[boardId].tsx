import React from "react"
import { useRouter } from "next/router"
import Navbar from "../../components/common/Navbar"
import withCurrentUser from "../../lib/withCurrentUser"
import { redirectIfLoggedOut } from "../../lib/processDataFn"
import { Content, Layout } from "../../components/common/page.styled"
import Board from "../../components/board/Board"

const BoardPage = () => {
  const router = useRouter()
  const { boardId } = router.query
  return (
    <Layout>
      <Navbar />
      {boardId && <Board boardId={boardId as string} />}
    </Layout>
  )
}

export default withCurrentUser(BoardPage, redirectIfLoggedOut)
