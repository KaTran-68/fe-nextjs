"use client";
import { clearSelectedBlog } from "@/library/redux/blogSlice";
import { RootState } from "@/library/redux/store";
import { handleApproveBlog } from "@/utils/action";
import { Button, message, notification } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  isApprovePage: boolean;
}

const BlogView = (props: IProps) => {
  const { isApprovePage } = props;
  const dispatch = useDispatch();
  const router = useRouter()

  const selectedBlog = useSelector(
    (state: RootState) => state.blog.selectedBlog
  );

  const onApproveBlog = async () => {
    if (selectedBlog) {
      const res = await handleApproveBlog(selectedBlog._id);
      if (res?.data) {
        message.success("Approve draft blog successfully!");
        router.push("/dashboard/blog/approve");
      } else {
        notification.error({
          message: "Approve Draft Blog error",
          description: res?.message,
        });
      }
      dispatch(clearSelectedBlog());
      return;
    }
    else{
      console.log('something wrongs!')
    }
  };
  return (
    <div style={{ textAlign: "justify", padding: "0px 20%" }}>
      {isApprovePage &&
        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={() => onApproveBlog()}>
            Duyệt bài
          </Button>
        </div>
      }
      <h1 style={{ textAlign: "center" }}>{selectedBlog?.title}</h1>
      <p>{selectedBlog?.content}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "700" }}>1 tháng</p>
        <p style={{ fontWeight: "700" }}>Author: {selectedBlog?.author}</p>
      </div>
    </div>
  );
};

export default BlogView;
