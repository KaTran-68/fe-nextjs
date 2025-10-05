'use client'

import { Tabs } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const items = [
    {
      key: "/dashboard/blog/myblog",
      label: <Link href="/dashboard/blog/myblog">Bản nháp</Link>,
    },
    {
      key: "/dashboard/blog/myblog/published",
      label: <Link href="/dashboard/blog/myblog/published">Đã xuất bản</Link>,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Các blogs của bạn</h1>

      <Tabs
        activeKey={pathname}
        items={items}
        tabBarStyle={{
          borderBottom: "1px solid #f0f0f0",
          marginBottom: "16px",
        }}
      />

      <div>{children}</div>
    </div>
  );
}
