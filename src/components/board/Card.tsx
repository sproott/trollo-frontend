import React, { CSSProperties } from "react"
import { Card as AntdCard } from "antd"

const style = { width: "100%", cursor: "pointer", userSelect: "none" } as CSSProperties

const Card = ({ children }: React.PropsWithChildren<any>) => {
  return <AntdCard.Grid style={style}>{children}</AntdCard.Grid>
}

export default Card
