import { auth } from "@/auth";
import BlogCard from "@/components/admin/blog.card";
import { handleFetchAllBlogs } from "@/utils/action";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ApproveBlogPage = async (props: IProps) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;


  const res = await handleFetchAllBlogs({
    current,
    pageSize,
    isApproved: false,
  })

  return (
    <div>
      <BlogCard isApproved={false} isMyBlog={false} meta={res.data.meta} blogsData={res.data.results} />
    </div>
  );
};

export default ApproveBlogPage;
