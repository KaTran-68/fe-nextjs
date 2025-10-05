"use client";
import { AdminContext } from "@/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useContext, useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { signOut } from "next-auth/react";
import ChangePassword from "../admin/user.changePassword";
import Link from "next/link";

const AdminHeader = (props: any) => {
  // const { data: session, status} = useSession()
  const { session } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Header } = Layout;
  const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          href={"/dashboard/blog/create"}
          style={{ display: "block", width: "100%" }}
        >
          Viết blog
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href={"/dashboard/blog/myblog"}
          style={{ display: "block", width: "100%" }}
        >
          Blogs của tôi
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <span
          style={{ display: "block", width: "100%" }}
          onClick={() => setIsModalOpen(true)}
        >
          Change password
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      danger: true,
      label: (
        <span
          style={{ display: "block", width: "100%" }}
          onClick={() => signOut()}
        >
          Log out
        </span>
      ),
    },
  ];

  return (
    <>
      <Header
        style={{
          padding: 0,
          display: "flex",
          background: "#f5f5f5",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          type="text"
          icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapseMenu(!collapseMenu)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Dropdown
          menu={{ items }}
          overlayStyle={{ minWidth: 120 }}
          placement="bottomRight"
        >
          <a
            onClick={(e) => e.preventDefault()}
            style={{
              color: "unset",
              lineHeight: "0 !important",
              marginRight: 20,
            }}
          >
            <Space>
              Welcome {session?.user?.email ?? ""}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
      <ChangePassword
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userEmail={session?.user?.email}
      />
    </>
  );
};

export default AdminHeader;
