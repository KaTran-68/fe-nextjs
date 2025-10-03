import { auth } from "@/auth";
import {
  handleUpdateCourseAction,
  handleUpdateUserAction,
} from "@/utils/action";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Upload,
} from "antd";
import { useEffect } from "react";

interface IProps {
  isModalUpdateOpen: boolean;
  setIsModalUpdateOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
  access_token: any;
}

const CourseUpdate = (props: IProps) => {
  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, access_token } =
    props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: dataUpdate.name,
      description: dataUpdate.description,
    });
  }, [dataUpdate]);

  const handleCloseModal = () => {
    // form.resetFields();
    // setDataUpdate(null);
    setIsModalUpdateOpen(false);
  };

  const onFinish = async (values: any) => {
    const { name, description, image } = values;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image && image.originFileObj) {
      formData.append("image", image.originFileObj);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${dataUpdate._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        handleCloseModal();
        message.success("Update course succeed");
        window.location.reload();
      } else {
        notification.error({
          message: "Update course error",
          description: data.message || "Something went wrong",
        });
      }
    } catch (error: any) {
      notification.error({
        message: "Update course error",
        description: error.message || "Something went wrong",
      });
    }
  };
  return (
    <Modal
      title="Create a course"
      open={isModalUpdateOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseModal()}
      maskClosable={false}
    >
      <Form form={form} name="demo_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: false, message: "Please input your course's name!" },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Description" 
          name="description"
          rules={[
            { required: false, message: "Please input course's description!" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter course description..."
            maxLength={500}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          valuePropName="file"
          getValueFromEvent={(e) => e.fileList[0]}
          rules={[
            {
              required: false,
              message: "Please upload an image!",
            },
          ]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseUpdate;
