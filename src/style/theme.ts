import { grey } from "@ant-design/colors"

const theme: Theme = {
  blue: [
    "#e6f7ff",
    "#bae7ff",
    "#91d5ff",
    "#69c0ff",
    "#40a9ff",
    "#1890ff",
    "#096dd9",
    "#0050b3",
    "#003a8c",
    "#002766",
  ],
  grey,
}

theme.blue.primary = theme.blue[5]

export type Theme = {
  blue: string[] & { primary?: string }
  grey: string[] & { primary?: string }
}

export default theme
