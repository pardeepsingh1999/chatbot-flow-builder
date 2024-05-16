import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import SvgIcons from "./SvgIcons";
import { Position } from "reactflow";
import CustomHandle from "./CustomHandle";

const MessageNode = ({ data, isConnectable }) => {
  return (
    <>
      <CustomHandle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <Card className={`messageNode ${data?.isSelected ? "selected" : ""}`}>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <SvgIcons type="message" /> Send Message
          </div>
          <SvgIcons type="whatsapp" />
        </CardHeader>
        <CardBody>
          {data.value ? (
            data.value
          ) : (
            <p className="placeholder">Enter the text...</p>
          )}
        </CardBody>
      </Card>

      <CustomHandle type="source" position={Position.Right} isConnectable={1} />
    </>
  );
};

export default MessageNode;
