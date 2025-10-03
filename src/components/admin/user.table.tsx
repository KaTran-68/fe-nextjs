'use client'
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserUpdate from "./user.update";
import { useState } from "react";
import UserCreate from "./user.create";
import { handleDeleteUserAction } from "@/utils/action";
interface IProps {
    usersData: any;
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    }
}

const UserTable = (props: IProps) => {
    const { usersData, meta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)

    const columns = [
        {
            title: 'STT',
            render: (text: any, record: any, index: any) => {
                return (
                    <>{(index + 1) + (meta.current - 1) * (meta.pageSize) }</>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_iid',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            render: (text: any, record: any, index: any) => {
                return (
                    <>
                        <EditTwoTone 
                            twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 20px" }}
                            onClick={() => {
                                setDataUpdate(record)
                                setIsModalUpdateOpen(true)
                            }}
                        />
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={async () => await handleDeleteUserAction(record?._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                    </>
                )
            }
        },
    ];
    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams);
            params.set('current', pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Manager Users</span>
                <Button type="primary" onClick={() => setIsModalCreateOpen(true)}>Create User</Button>
            </div>
            <Table
                bordered
                dataSource={usersData}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        showSizeChanger: true,
                        total: meta.total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}

            />

            <UserUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

            <UserCreate 
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
            />
        </>
    )
}

export default UserTable;