"use client";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
  AppstoreOutlined,
  MailOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
interface IProps {
  isAdmin: boolean | undefined;
}
const AdminSideBar = (props: IProps) => {
  const { isAdmin } = props
  const { Sider } = Layout;
  const { collapseMenu } = useContext(AdminContext)!;
  const pathname = usePathname();
  const items: MenuItem[] = [
    {
      key: "grp",
      label: "Ka Web",
      type: "group",
      children: [
        {
          key: "/dashboard",
          label: <Link href={"/dashboard"}>Dashboard</Link>,
          icon: <AppstoreOutlined />,
        },
        isAdmin && {
          key: "/dashboard/user",
          label: <Link href={"/dashboard/user"}>Manage Users</Link>,
          icon: <TeamOutlined />,
        },
        {
          key: "/dashboard/blog",
          label: <Link href={"/dashboard/blog"}>Blogs</Link>,
          icon: <ReadOutlined />,
        },
      ].filter(Boolean) as MenuItem[],
    },
  ];

  return (
    <Sider collapsed={collapseMenu}>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={items}
        style={{ height: "100vh" }}
      />
    </Sider>
  );
};

export default AdminSideBar;
