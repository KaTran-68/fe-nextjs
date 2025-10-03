"use client";
import { Button, Form, Input } from "antd";

const CreateBlog = () => {
  const [form] = Form.useForm();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh", // full màn hình
      }}
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ width: "70%" }}
        onFinish={() => ""}
      >
        {/* Username */}
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

        {/* Submit button */}
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
