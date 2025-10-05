"use client";

import { Button, Card, Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const { Meta } = Card;
interface IProps {
  blogsData: any;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}

const BlogCard = (props: IProps) => {
  const { blogsData, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handlePageChange = (page: number, pageSize?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", page.toString());
    if (pageSize) params.set("pageSize", pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: '20px',
        }}
      >
        <h3>Các bài viết</h3>
        {true && (
          <Button type="primary" onClick={() => true}>
            Manage Blog
          </Button>
        )}
      </div>
      <p style={{ fontSize: "14px", marginBottom: "20px" }}>
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và
        các kỹ thuật lập trình web.
      </p>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: 'wrap' }}>
        {blogsData?.map((blog: any) => (
          <Card
            key={`blog-${blog._id}`}
            hoverable
            title={blog.title}
            style={{ width: "70%", marginTop: '20px' }}
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
                  { blog.content}
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
              <p>Author: {blog.author}</p>
            </div>
          </Card>
        ))}
      </div>
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
    </>
  );
};

export default BlogCard;
