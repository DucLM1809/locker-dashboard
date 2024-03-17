import { FC, useState } from 'react';

import MyTable from '@/components/core/table';

import products from '@/mock/Lab2_SonDS.products.json';
import catefories from '@/mock/Lab2_SonDS.categories.json';
import { Button, Drawer, Form, InputNumber, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';

const { Column } = MyTable;

interface ColumnType {
  _id: string;
  name: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const data: any[] = products;

const TalbePage: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [form] = Form.useForm();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Space direction="vertical">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setCollapsed(false)} />
        <MyTable<ColumnType> dataSource={data} rowKey={record => record._id} height="100%">
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Price" dataIndex="price" key="price" />
          <Column title="Description" dataIndex="description" key="description" ellipsis={true} />
          <Column
            title="Created date"
            dataIndex="createdAt"
            key="createdAt"
            render={val => dayjs(val).format('HH:mm:ss dd/mm/yyyy')}
          />
          <Column
            title="Updated date"
            dataIndex="updatedAt"
            key="updatedAt"
            render={val => dayjs(val).format('HH:mm:ss dd/mm/yyyy')}
          />
        </MyTable>
      </Space>
      <Drawer
        placement="right"
        bodyStyle={{ padding: 10, height: '100%' }}
        closable={true}
        onClose={toggle}
        open={!collapsed}
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button onClick={toggle} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button htmlType="submit" form="products" type="primary" style={{ flex: 1 }}>
              Submit
            </Button>
          </div>
        }
      >
        <Form name="products" form={form} layout="vertical" onFinish={value => console.log(value)}>
          <Form.Item label="Name" name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber style={{ width: '100%' }} size="large" min={0} addonAfter={'VND'} />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select
              size="large"
              options={catefories?.map((item: any) => ({
                label: item.name,
                value: item._id.$oid,
              }))}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={3} size="large" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default TalbePage;
