import { FlairInfoFragment } from "../../../../generated/graphql"

export const FLAIR = "FLAIR"

export type FlairWithIndex = FlairInfoFragment & { index: number }

export type DraggedFlair = {
  type: string
  flair: FlairInfoFragment
  droppableId: string
}
