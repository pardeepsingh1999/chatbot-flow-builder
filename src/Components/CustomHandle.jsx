import React, { useMemo } from "react";
import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow";

const selector = (s) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (typeof props.isConnectable === "function") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return props.isConnectable({ node, connectedEdges });
    }

    if (typeof props.isConnectable === "number") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      const isSourceConnected = connectedEdges.find(
        (each) => each.source === node.id
      );

      return isSourceConnected ? false : true;
    }

    return props.isConnectable;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeInternals, edges, nodeId, props.isConnectable]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

export default CustomHandle;
