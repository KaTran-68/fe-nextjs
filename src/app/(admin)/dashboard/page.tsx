import { auth } from "@/auth";
import CourseCard from "@/components/admin/course.card";
import { handleFetchCourseData } from "@/utils/action";

const DashboardPage = async () => {
  const session = await auth();
  const isAdmin = session?.user?.admin;
  const access_token = session?.user?.access_token;
  const courseData = await handleFetchCourseData();
  return (
    <div>
      <CourseCard courseData={courseData.data}  access_token={access_token} isAdmin={isAdmin}/>
    </div>
  );
};

export default DashboardPage;
