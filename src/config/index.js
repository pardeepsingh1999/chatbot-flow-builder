import { Position } from "reactflow";
import MessageNode from "../Components/MessageNode";

export const initialNodes = [
  {
    id: "0",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 50, y: 150 },
    type: "messageNode",
    data: { value: "test message 1" },
  },
  {
    id: "1",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 550, y: 50 },
    type: "messageNode",
    data: { value: "test message 2" },
  },
];

export const initialEdges = [{ id: "e1-2", source: "0", target: "1" }];

export const nodeTypes = {
  messageNode: MessageNode,
};
