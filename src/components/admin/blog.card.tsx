"use client";

import { Button, Card } from "antd";
const { Meta } = Card;
const BlogCard = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h3>Các bài viết</h3>
        {true && (
          <Button type="primary" onClick={() => true}>
            Manage Blog
          </Button>
        )}
      </div>
      <p style={{fontSize: '14px', marginBottom: '20px'}}>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          hoverable
          title=" TRẢI NGHIỆM HỌC THỬ REACT NATIVE, DEVOPS, C++ VÔ CÙNG CHẤT LƯỢNG CÙNG F8 "
          style={{ width: "70%" }}
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
                Ngành Công Nghệ Thông Tin (CNTT) là một lĩnh vực đang phát triển
                mạnh mẽ và có vai trò quan trọng trong hầu hết mọi mặt của đời
                sống hiện đại. Từ các ứng dụng trên điện thoại, website, trí tuệ
                nhân tạo cho đến hệ thống mạng và an ninh mạng, CNTT không ngừng
                mở rộng và tạo ra cơ hội nghề nghiệp hấp dẫn cho hàng triệu
                người trên thế giới.
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
            <p>Author: asdas</p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BlogCard;
