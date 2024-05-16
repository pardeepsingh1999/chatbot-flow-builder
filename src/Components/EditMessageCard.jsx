import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import SvgIcons from "./SvgIcons";
import { showToast } from "../helpers";

const EditMessageCard = ({
  selectedNode,
  toggleSelectedNode = () => {},
  onChangeMessageText = () => {},
}) => {
  const _toggleSelectedNode = () => {
    if (!selectedNode?.data?.value?.trim()) {
      showToast("Please enter text");
      return;
    }

    toggleSelectedNode();
  };

  return (
    <>
      <>
        <Card className="messageCardInput">
          <CardHeader className="d-flex align-items-center">
            <div
              className="cursorPointer me-1"
              onClick={() => _toggleSelectedNode()}
            >
              <SvgIcons type="back" />
            </div>
            Message
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label>Text</Label>
              <Input
                type="textarea"
                value={selectedNode.data.value}
                placeholder="Enter the text..."
                onChange={(e) => onChangeMessageText(e.target.value)}
              />
            </FormGroup>

            <div className="text-center">
              <Button color="primary" outline onClick={_toggleSelectedNode}>
                Save
              </Button>
            </div>
          </CardBody>
        </Card>
      </>
    </>
  );
};

export default EditMessageCard;
