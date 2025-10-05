"use client";
import { handleCreateBlogAction } from "@/utils/action";
import { Button, Form, Input, message, notification } from "antd";
import { useRouter } from "next/navigation";

const CreateBlog = (props: any) => {
  const { author, authorId } = props
  const [form] = Form.useForm();
  const router = useRouter()

  const onFinish = async (values: any) => {
    const { title, content } = values;
  
    const res = await handleCreateBlogAction({
      author,
      authorId,
      title,
      content,
    });
    if (res?.data) {
      message.success("Create blog successfully! Hãy đợi admin duyệt bài của bạn!");
      router.push('/dashboard/blog')
    } else {
      notification.error({
        message: "Create Blog error",
        description: res?.message,
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        marginTop: '20px',
      }}
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ width: "70%" }}
        onFinish={onFinish}
      >

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input placeholder="Nhập tiêu đề của bài viết..." />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <Input.TextArea rows={6} placeholder="Nhập nội dung bài viết..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBlog;
