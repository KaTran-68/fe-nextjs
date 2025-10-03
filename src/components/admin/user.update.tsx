import { handleUpdateUserAction } from "@/utils/action";
import { Button, Col, Form, Input, message, Modal, notification, Row } from "antd";
import { useEffect } from "react";

interface IProps {
  isModalUpdateOpen: boolean;
  setIsModalUpdateOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const UserUpdate = (props: IProps) => {
  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } =
    props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: dataUpdate.name,
      email: dataUpdate.email,
      phone: dataUpdate.phone,
      address: dataUpdate.address,
    });
  }, [dataUpdate]);

  const handleCloseModal = () => {
    // form.resetFields();
    // setDataUpdate(null);
    setIsModalUpdateOpen(false);
  };

  const onFinish = async (values: any) => {
    const { name, phone, address } = values;
    const res = await handleUpdateUserAction({
      _id: dataUpdate._id,
      name,
      phone,
      address,
    });
    if (res?.data) {
      handleCloseModal();
      message.success("Update user succeed");
    } else {
      notification.error({
        message: "Update User error",
        description: res?.message,
      });
    }
  };
  return (
    <Modal
      title="Update an user"
      open={isModalUpdateOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseModal()}
      maskClosable={false}
    >
      <Form
        form={form} // liên kết form instance
        name="demo_form"
        layout="vertical" // horizontal, vertical, inline
        onFinish={onFinish} // hàm gọi khi submit
      >
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input type="email" disabled />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
