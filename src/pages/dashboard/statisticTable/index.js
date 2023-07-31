import React from "react";
import Style from "./style";
import Table from "components/table";
import { Empty } from "antd";
import IntlMessages from "utils/intlMessages";

const StatisticTable = ({
  columns,
  expandedRowRender,
  dataSource,
  loading,
}) => {
  const emptyText = <IntlMessages id="table.empty" />;
  return (
    <Style>
      <div className="table-wrapper">
        <Table
          locale={{ emptyText }}
          rowKey={item => item.id}
          columns={columns}
          expandedRowRender={expandedRowRender}
          dataSource={dataSource}
          loading={loading}
        />
      </div>
    </Style>
  );
};
export default StatisticTable;
