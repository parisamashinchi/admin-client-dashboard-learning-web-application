import React from "react";
import { TableActionWrapper, ActionEdit, ActionDelete } from "./style";
import PopConfirm from "components/uiElements/popConfirm";
import { connect } from "react-redux";
import * as actions from "../actions";
import Button from '../../../components/uiElements/button';

const TableActions = ({
  name,
  url,
  record,
  editProps,
  deleteProps,
  placement = "top",
  removeRequest,
  customActions,
  secondCustomActions,
}) => {
  const removeConfirm = () => {
    removeRequest(name, url, record.id);
  };
  return (
    <TableActionWrapper>
        {customActions
            ? (() => {
                const { onClick , title} = customActions;
                  return (
                      <Button onClick={e => (e.preventDefault(), onClick(record.id))}>
                        {title}
                      </Button>
                  );
            })()
            : null}
      {secondCustomActions
          ? (() => {
            const { onClick,title } = secondCustomActions;
            return (
                <Button onClick={e => (e.preventDefault(), onClick(record.id))}>
                  {title}
                </Button>
            );
          })()
          : null}
      {editProps
        ? (() => {
            const { onClick } = editProps;
            return (
              <ActionEdit
                onClick={e => (e.preventDefault(), onClick(record.id))}
              />
            );
          })()
        : null}
      {deleteProps
        ? (() => {
            const { title, okText, cancelText } = deleteProps;
            return (
              <PopConfirm
                placement={placement}
                title={title}
                onConfirm={removeConfirm}
                okText={okText}
                cancelText={cancelText}
              >
                <ActionDelete />
              </PopConfirm>
            );
          })()
        : null}
    </TableActionWrapper>
  );
};

const mapDispatchToProps = {
  removeRequest: actions.remove,
};
export default connect(
  null,
  mapDispatchToProps
)(TableActions);
