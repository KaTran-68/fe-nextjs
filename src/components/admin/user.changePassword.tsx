import {
  handleChangePasswordUser,
  handleCreateUserAction,
} from "@/utils/action";
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
import { signOut } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  userEmail: string;
}

const { confirm } = Modal;

const ChangePassword = (props: IProps) => {
  const { isModalOpen, setIsModalOpen, userEmail } = props;

  const [form] = Form.useForm();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.setFieldsValue({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
  };

  const onFinish = async (values: any) => {
    const { oldPassword, newPassword, confirmNewPassword } = values;
    if (oldPassword === newPassword) {
      notification.error({
        message: "Change password error",
        description: "Mật khẩu mới đang trùng với mật khẩu cũ!",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      notification.error({
        message: "Change password error",
        description: "Mật khẩu mới bạn nhập đang bị sai!",
      });
      return;
    }
    const res = await handleChangePasswordUser(userEmail, newPassword);
    if (res?.data) {
      handleCloseModal();
      confirm({
        title: "Change password successfully!",
        content: "Please login again",
        cancelButtonProps: { style: { display: "none" } },
        okText: "Login",
        onOk: async () => {
          signOut()
        },
      });
    } else {
      notification.error({
        message: "Change password error",
        description: res?.message,
      });
    }
  };
  return (
    <Modal
      title="Change password"
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseModal()}
      maskClosable={false}
    >
      <Form form={form} name="demo_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
