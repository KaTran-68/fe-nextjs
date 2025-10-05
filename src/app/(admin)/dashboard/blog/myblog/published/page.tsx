import { auth } from "@/auth";
import BlogCard from "@/components/admin/blog.card";
import { handleFetchMyBlogPublished } from "@/utils/action";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const MyPublishedBlog = async (props: IProps) => {
  const session = await auth();
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await handleFetchMyBlogPublished({
    authorId: session?.user?._id,
    current,
    pageSize,
  });
  console.log(res)
  return (
    <div>
      <BlogCard meta={res.data.meta} blogsData={res.data.results} />
    </div>
  );
};

export default MyPublishedBlog;
