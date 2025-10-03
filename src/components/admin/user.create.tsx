import { handleCreateUserAction } from "@/utils/action";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
} from "antd";
import { useEffect } from "react";

interface IProps {
  isModalCreateOpen: boolean;
  setIsModalCreateOpen: (v: boolean) => void;
}

const UserCreate = (props: IProps) => {
  const { isModalCreateOpen, setIsModalCreateOpen } = props;

  const [form] = Form.useForm();

  const handleCloseModal = () => {
    form.setFieldsValue({
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    })
    setIsModalCreateOpen(false);
  };

  const onFinish = async (values: any) => {
    const { email, name, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      notification.error({
        message: "Create User error",
        description: "Mật khẩu bạn nhập đang sai!",
      });
      return;
    }
    const res = await handleCreateUserAction({
      email,
      name,
      password,
    });
    if (res?.data) {
      handleCloseModal();
      message.success("Create user successfully!");
    } else {
      notification.error({
        message: "Create User error",
        description: res?.message,
      });
    }
  };
  return (
    <Modal
      title="Create an user"
      open={isModalCreateOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseModal()}
      maskClosable={false}
    >
      <Form form={form} name="demo_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input type="name" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your confirmPassword!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreate;
