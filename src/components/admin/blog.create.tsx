"use client";
import { clearSelectedBlog } from "@/library/redux/blogSlice";
import { RootState } from "@/library/redux/store";
import {
  handleCreateBlogAction,
  handleDeleteBlog,
  handleUpdateDraftBlog,
} from "@/utils/action";
import { Button, Form, Input, message, notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateBlog = (props: any) => {
  const { author, authorId } = props;
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedBlog = useSelector(
    (state: RootState) => state.blog.selectedBlog
  );

  useEffect(() => {
    if (selectedBlog) {
      form.setFieldsValue({
        title: selectedBlog.title,
        content: selectedBlog.content,
      });
    }
  }, [selectedBlog, form, dispatch]);
  const onFinish = async (values: any) => {
    const { title, content } = values;

    if (selectedBlog) {
      await handleDeleteBlog(selectedBlog._id);
    }

    const res = await handleCreateBlogAction({
      author,
      authorId,
      title,
      content,
      isDraft: false,
    });
    if (res?.data) {
      message.success(
        "Create blog successfully! Hãy đợi admin duyệt bài của bạn!"
      );
      router.push("/dashboard/blog");
    } else {
      notification.error({
        message: "Create Blog error",
        description: res?.message,
      });
    }
    dispatch(clearSelectedBlog());
  };

  const onCreateDraft = async () => {
    try {
      const values = await form.validateFields();
      const { title, content } = values;

      if (selectedBlog) {
        const res = await handleUpdateDraftBlog(selectedBlog._id, values);
        if (res?.data) {
          message.success(
            'Update draft blog successfully! Hãy xem phần "Blogs của tôi"!'
          );
          router.push("/dashboard/blog/myblog");
        } else {
          notification.error({
            message: "Update Draft Blog error",
            description: res?.message,
          });
        }
        dispatch(clearSelectedBlog());
        return;
      }

      const res = await handleCreateBlogAction({
        author,
        authorId,
        title,
        content,
        isDraft: true,
      });

      if (res?.data) {
        message.success(
          'Create draft blog successfully! Hãy xem phần "Blogs của tôi"!'
        );
        router.push("/dashboard/blog/myblog");
      } else {
        notification.error({
          message: "Create Draft Blog error",
          description: res?.message,
        });
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
    dispatch(clearSelectedBlog());
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        marginTop: "20px",
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
          <Button
            type="default"
            onClick={onCreateDraft}
            style={{ marginRight: "10px" }}
          >
            Bản nháp
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBlog;
