import { ActionType } from "../action-types"
import { CellTypes } from "../cell"

export type Direction = "up" | "down"

export interface MoveCellAction {
  type: ActionType.MOVE_CELL
  payload: {
    id: string
    direction: Direction
  }
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL
  payload: string
}

export interface InsertCellAction {
  type: ActionType.INSERT_CELL
  payload: {
    id: string | null
    type: CellTypes
    direction: Direction
  }
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL
  payload: {
    id: string
    content: string
  }
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAction
  | InsertCellAction
  | UpdateCellAction
