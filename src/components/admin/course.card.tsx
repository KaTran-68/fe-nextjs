"use client";
import { Button, Card, Col, Popconfirm, Row } from "antd";
interface IProps {
  courseData: any;
  access_token: any;
  isAdmin: boolean | undefined;
}
import Image from "next/image";
import CourseCreate from "./course.create";
import { useEffect, useState } from "react";
import {
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
  HeartOutlined,
} from "@ant-design/icons";
import CourseUpdate from "./course.update";
import {
  handleDeleteCourseAction,
  handleDeleteUserAction,
} from "@/utils/action";
const { Meta } = Card;

const CourseCard = (props: IProps) => {
  const { courseData, access_token, isAdmin } = props;
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

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
        <span>Courses List</span>
        { isAdmin &&
          <Button type="primary" onClick={() => setIsModalCreateOpen(true)}>
            Create Course
          </Button>
        }
      </div>
      <Row gutter={[16, 24]}>
        {courseData.map((course: any, index: number) => {
          return (
            <Col span={8} key={`course-${index}`}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                cover={
                  <Image
                    alt={course.name}
                    width={220}
                    height={220}
                    draggable={false}
                    src={course.image}
                    style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                  />
                }
                actions={ isAdmin ? [
                  <EditTwoTone
                    key={"edit"}
                    twoToneColor="#f57800"
                    style={{ cursor: "pointer", margin: "0 20px" }}
                    onClick={() => {
                      setDataUpdate(course);
                      setIsModalUpdateOpen(true);
                    }}
                  />,
                  <Popconfirm
                    key={"del"}
                    placement="leftTop"
                    title={"Xác nhận xóa user"}
                    description={"Bạn có chắc chắn muốn xóa user này ?"}
                    onConfirm={async () =>
                      await handleDeleteCourseAction(course._id)
                    }
                    okText="Xác nhận"
                    cancelText="Hủy"
                  >
                    <DeleteTwoTone twoToneColor="#ff4d4f" />
                  </Popconfirm>,
                ] : []}
              >
                <Meta
                  title={course.name}
                  description={
                    <div
                      style={{
                        flex: 1,
                        height: "110px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        whiteSpace: "normal",
                      }}
                    >
                      {course.description}
                    </div>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      <CourseCreate
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        access_token={access_token}
      />
      <CourseUpdate
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        access_token={access_token}
      />
    </>
  );
};

export default CourseCard;
