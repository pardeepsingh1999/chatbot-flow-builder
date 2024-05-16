import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Position,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, Col, Row } from "reactstrap";

import NodePanel from "./NodePanel";
import { getNodeId, showToast } from "../helpers";
import EditMessageCard from "./EditMessageCard";
import { initialEdges, initialNodes, nodeTypes } from "../config";

const ReactFlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) {
        // return if source and target are pointing to same node
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const _onSave = () => {
    /**
     * Check whether every node in the graph is connected
     * either as a source or a target to at least one other node.
     */
    const isEmptyTarget = nodes.some((each) => {
      if (
        !edges.find((e) => e.source === each.id) &&
        !edges.find((e) => e.target === each.id)
      ) {
        return true;
      }
      return false;
    });

    // If a node without any source or target connections is found, an error should be thrown
    if (isEmptyTarget) {
      showToast("Cannot save flow");
      return;
    }

    showToast("Flow has been saved", "success");
  };

  const _toggleSelectedNode = (event, node = null) => {
    // block the current selection node if previous selected node data is empty string
    if (selectedNode?.data?.value === "") return;

    setSelectedNode(node);

    const newNodes = [...nodes];

    // reset previous selected nodes
    newNodes.forEach((each) => (each.data.isSelected = false));

    if (!newNodes?.[node?.id]) {
      setNodes(newNodes);
      return;
    }

    // mark current selected nodes
    newNodes[node.id].data.isSelected = true;

    setNodes(newNodes);
  };

  const _onChangeMessageText = (value) => {
    const newNodes = [...nodes];

    if (!newNodes?.[selectedNode?.id]) {
      return;
    }

    newNodes[selectedNode.id].data.value = value;
    setNodes(newNodes);
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = getNodeId(type);

      const newNode = {
        id,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type,
        position,
        data: { value: "", isSelected: true },
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNode(newNode);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reactFlowInstance]
  );

  return (
    <>
      <div className="header text-end">
        <Button color="primary" outline onClick={_onSave}>
          Save Changes
        </Button>
      </div>

      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <Row className="m-0 p-0">
            <Col sm="9" className="reactFlow m-0 p-0">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                // fitView
                nodeTypes={nodeTypes}
                onNodeClick={_toggleSelectedNode}
              >
                <Controls />
                <MiniMap />
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={12}
                  size={1}
                />
              </ReactFlow>
            </Col>

            <Col sm="3" className="nodePanel m-0 p-0">
              {selectedNode?.id ? (
                <>
                  {/* When a node is selected, display the edit message card. */}
                  <EditMessageCard
                    selectedNode={selectedNode}
                    toggleSelectedNode={_toggleSelectedNode}
                    onChangeMessageText={_onChangeMessageText}
                  />
                </>
              ) : (
                <>
                  <NodePanel />
                </>
              )}
            </Col>
          </Row>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default ReactFlowComponent;
