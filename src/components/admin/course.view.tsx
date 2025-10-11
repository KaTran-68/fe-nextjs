"use client";
import { RootState } from "@/library/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  List,
  Button,
  Collapse,
  Typography,
  Image,
  notification,
  Input,
  Popconfirm,
} from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  handleAddOutcome,
  handleDeleteOutcome,
  handleGetCourseBySlug,
} from "@/utils/action";
import { CheckOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const CourseView = () => {
  // const dispatch = useDispatch();
  // const selectedCourse = useSelector(
  //   (state: RootState) => state.course.selectedCourse
  // );
  const params = useParams();
  const { slug } = params;
  const [selectedCourse, setSelectedCourse] = useState<any>({});
  const [isAddOutcome, setIsAddOutCome] = useState(false);
  const [outcomeValue, setOutcomeValue] = useState("");

  useEffect(() => {
    if (slug) {
      handleGetCourseBySlug(slug).then((res) => {
        if (res?.data) setSelectedCourse(res.data);
        else notification.error({ message: "Không tìm thấy khóa học!" });
      });
    }
  }, [slug, outcomeValue]);

  const collapseItems = [
    {
      key: "1",
      label: "1. Giới thiệu",
      children: (
        <List
          size="small"
          dataSource={["Giới thiệu — 03:58", "Demo AI hoạt động — 00:22"]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "2",
      label: "2. Xây dựng",
      children: (
        <List
          size="small"
          dataSource={[
            "Cài đặt môi trường",
            "Tạo React App",
            "Kết nối Tensorflow",
            "Huấn luyện mô hình",
            "Xử lý video đầu vào",
            "Hiển thị cảnh báo",
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "3",
      label: "3. Hoàn thiện & Tổng kết",
      children: (
        <List
          size="small"
          dataSource={[
            "Kiểm tra ứng dụng",
            "Đóng gói và triển khai",
            "Tổng kết khóa học",
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
  ];

  const submitAddOutcome = async () => {
    await handleAddOutcome(selectedCourse._id, outcomeValue);
    setIsAddOutCome(false);
    setOutcomeValue("");
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Row gutter={[32, 32]} align="top">
        {/* CỘT TRÁI */}
        <Col xs={24} md={16}>
          <Title level={2}>{selectedCourse?.name}</Title>
          <Paragraph className="text-gray-600">
            {selectedCourse?.description}
          </Paragraph>

          <div
            style={{
              display: "flex",
              marginTop: "20px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ margin: 0, paddingRight: "10px" }}>
              Bạn sẽ học được gì?
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddOutCome(true)}
            >
              Thêm outcome
            </Button>
          </div>
          {isAddOutcome && (
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <Input
                placeholder="Nhập outcome muốn thêm..."
                value={outcomeValue}
                onChange={(e) => setOutcomeValue(e.target.value)}
              />
              <Button
                type="primary"
                icon={<CheckOutlined />}
                style={{ marginLeft: "20px" }}
                onClick={() => submitAddOutcome()}
              >
                Hoàn tất
              </Button>
            </div>
          )}
          <List
            size="small"
            dataSource={selectedCourse.outcomes}
            renderItem={(item: string) => (
              <List.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>• {item}</span>
                  <Popconfirm
                    title="Xác nhận xóa?"
                    description="Bạn có chắc muốn xóa mục này không?"
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={async () => {
                      await handleDeleteOutcome(selectedCourse._id, item);
                      handleGetCourseBySlug(slug).then((res) => {
                        if (res?.data) setSelectedCourse(res.data);
                        else
                          notification.error({
                            message: "Không tìm thấy khóa học!",
                          });
                      });
                    }}
                    okButtonProps={{ danger: true }}
                  >
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                </div>
              </List.Item>
            )}
            grid={{
              gutter: 16,
              column: 2,
            }}
          />

          <Title level={4} className="mt-6">
            Nội dung khóa học
          </Title>

          <Collapse
            accordion
            className="mt-4 rounded-lg overflow-hidden"
            items={collapseItems}
          />
        </Col>

        {/* CỘT PHẢI */}
        <Col xs={24} md={8}>
          <Card
            cover={
              <Image
                alt={selectedCourse?.name}
                width={400}
                height={225}
                draggable={false}
                src={selectedCourse?.image}
                style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
            }
            bordered={true}
            className="shadow-md"
          >
            <Title level={4} className="text-center text-orange-500">
              Miễn phí
            </Title>
            <Button
              type="primary"
              block
              size="large"
              className="bg-blue-600 mt-2"
            >
              Đăng ký học
            </Button>

            {/* <div className="mt-5 space-y-1 text-gray-700 text-sm">
              <p>📘 Trình độ: Cơ bản</p>
              <p>🎬 Tổng số: 13 bài học</p>
              <p>⏱ Thời lượng: 01 giờ 34 phút</p>
              <p>💻 Học mọi lúc, mọi nơi</p>
            </div> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourseView;
