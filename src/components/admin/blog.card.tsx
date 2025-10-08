"use client";

import { setSelectedBlog } from "@/library/redux/blogSlice";
import { Button, Card, Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
const { Meta } = Card;
interface IProps {
  isMyBlog: boolean;
  isApproved: boolean;
  isAdmin: boolean | undefined;
  blogsData: any;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}

const BlogCard = (props: IProps) => {
  const { blogsData, meta, isMyBlog, isApproved, isAdmin } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // const dispatch = useDispatch();
  const router = useRouter();

  const handlePageChange = (page: number, pageSize?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", page.toString());
    if (pageSize) params.set("pageSize", pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleCardClick = (blog: any) => {
    // dispatch(setSelectedBlog(blog));
    if (!isApproved && isMyBlog) {
      router.push("/dashboard/blog/create");
    }
    else if (!isApproved) {
      router.push(`/dashboard/blog/approve/${blog.slug}`);
    }
    else {
      router.push(`/dashboard/blog/${blog.slug}`);
    }
  };
  return (
    <>
      {!isMyBlog && (
        <>
          {isApproved ? 
            <>
              <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3>Các bài viết</h3>
              {isAdmin &&
                <Button
                  type="primary"
                  onClick={() => router.push("/dashboard/blog/approve")}
                >
                  Approve Blog
                </Button>
              }
            </div>
            <p style={{ fontSize: "14px", marginBottom: "20px" }}>
              Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
              và các kỹ thuật lập trình web.
            </p>
            </>
            :
            <div>
              <h3>Các bài viết chưa được duyệt</h3>
            </div>
          }
          
        </>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {blogsData.length > 0 ? (
          blogsData?.map((blog: any) => (
            <Card
              key={`blog-${blog._id}`}
              hoverable
              title={blog.title}
              style={{ width: "70%", marginTop: "20px" }}
              onClick={() => handleCardClick(blog)}
            >
              <Meta
                title={""}
                description={
                  <div
                    style={{
                      flex: 1,
                      height: "45px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      whiteSpace: "normal",
                    }}
                  >
                    {blog.content}
                  </div>
                }
              />
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>1 tháng trước</p>
                {!isMyBlog ? (
                  <p>Author: {blog.author}</p>
                ) : (
                  <p>IsApproved: {blog.isApproved.toString()}</p>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div>Chưa có bài viết nào</div>
        )}
      </div>
      {blogsData.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Pagination
            current={meta.current}
            pageSize={meta.pageSize}
            total={meta.total}
            onChange={handlePageChange}
            showSizeChanger
            showTotal={(total, range) => (
              <div>
                {range[0]}–{range[1]} trên {total} bài viết
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};

export default BlogCard;
