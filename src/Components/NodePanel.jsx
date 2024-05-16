import React from "react";
import SvgIcons from "./SvgIcons";

const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <div className="dndflow">
        <div className="description">
          You can drag these nodes to the panel on the left.
        </div>

        <div
          className="dndnode text-center w-50"
          onDragStart={(event) => onDragStart(event, "messageNode")}
          draggable
        >
          <SvgIcons type="message" />
          <span className="d-block">Message</span>
        </div>
      </div>
    </>
  );
};

export default NodePanel;
