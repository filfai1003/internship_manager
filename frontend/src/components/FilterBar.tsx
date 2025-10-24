import React from 'react';
import { Input, Select, Button, Space } from 'antd';
import type { FC } from 'react';

const { Option } = Select;

type Props = {
  department: string;
  onDepartmentChange: (value: string) => void;
  status: string | null;
  onStatusChange: (value: string | null) => void;
  statusOptions?: string[];
};

const FilterBar: FC<Props> = ({ department, onDepartmentChange, status, onStatusChange, statusOptions = [] }) => {
  return (
    <Space style={{ marginBottom: 16 }} wrap>
      <Input
        placeholder="Filter by department"
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        allowClear
        style={{ minWidth: 220 }}
      />

      <Select
        value={status ?? 'All'}
        onChange={(val) => onStatusChange(val === 'All' ? null : String(val))}
        style={{ minWidth: 200 }}
      >
        <Option value="All">All statuses</Option>
        {statusOptions.map((s) => (
          <Option key={s} value={s}>
            {s}
          </Option>
        ))}
      </Select>

      <Button
        onClick={() => {
          onDepartmentChange('');
          onStatusChange(null);
        }}
      >
        Clear
      </Button>
    </Space>
  );
};

export default FilterBar;
