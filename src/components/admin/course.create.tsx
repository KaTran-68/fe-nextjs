import { handleCreateCourseAction } from "@/utils/action";
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

interface IProps {
  isModalCreateOpen: boolean;
  setIsModalCreateOpen: (v: boolean) => void;
  access_token: any;
}

const CourseCreate =  (props: IProps) => {

  const { isModalCreateOpen, setIsModalCreateOpen, access_token } = props;

  const [form] = Form.useForm();

  const handleCloseModal = () => {
    setIsModalCreateOpen(false);
  };

  const onFinish = async (values: any) => {
    const { name, description, image } = values;

    if (!image || !image.originFileObj) {
      console.error("No image selected");
      notification.error({ message: "Please select an image" });
      return;
    }

    // Tạo FormData để gửi file + data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image.originFileObj);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        handleCloseModal();
        message.success("Create course succeed");
      } else {
        notification.error({
          message: "Create course error",
          description: data.message || "Something went wrong",
        });
      }
    } catch (error: any) {
      console.error(error);
      notification.error({
        message: "Create course error",
        description: error.message || "Something went wrong",
      });
    }
  };
  return (
    <Modal
      title="Create a course"
      open={isModalCreateOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseModal()}
      maskClosable={false}
    >
      <Form form={form} name="demo_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your course's name!" },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input course's description!" },
          ]}
        >
          <Input.TextArea
            rows={4} // số dòng hiển thị ban đầu
            placeholder="Enter course description..."
            maxLength={500} // nếu muốn giới hạn ký tự
          />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          valuePropName="file"
          getValueFromEvent={(e) => e.fileList[0]}
          rules={[
            {
              required: true,
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

export default CourseCreate;
