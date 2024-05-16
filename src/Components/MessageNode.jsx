import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import SvgIcons from "./SvgIcons";
import { Position } from "reactflow";
import CustomHandle from "./CustomHandle";

const MessageNode = ({ data, isConnectable }) => {
  return (
    <>
      {/* 
        Custom-Handle: left side connection dot works as the target, 
        'isConnectable: true' means multiple connections on the target side are allowed.
      */}
      <CustomHandle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      {/* message node is displayed on the chart */}
      <Card className={`messageNode ${data?.isSelected ? "selected" : ""}`}>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <SvgIcons type="message" /> Send Message
          </div>
          <SvgIcons type="whatsapp" />
        </CardHeader>
        <CardBody>
          {data.value ? (
            // If the node has a value, display it; otherwise, show 'Enter the text...'
            <>{data.value}</>
          ) : (
            <p className="placeholder">Enter the text...</p>
          )}
        </CardBody>
      </Card>

      {/* 
        Custom-Handle: right side connection dot works as the source, 
        'isConnectable: 1' means only 1 connection on the source side is allowed.
      */}
      <CustomHandle type="source" position={Position.Right} isConnectable={1} />
    </>
  );
};

export default MessageNode;
