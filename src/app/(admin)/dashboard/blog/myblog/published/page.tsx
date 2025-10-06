import { auth } from "@/auth";
import BlogCard from "@/components/admin/blog.card";
import { handleFetchMyBlog } from "@/utils/action";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const MyPublishedBlog = async (props: IProps) => {
  const session = await auth();
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await handleFetchMyBlog({
    authorId: session?.user?._id,
    current,
    pageSize,
    isDraft: false,
  });

  return (
    <div>
      <BlogCard isApproved={true} isMyBlog={true} meta={res.data.meta} blogsData={res.data.results} />
    </div>
  );
};

export default MyPublishedBlog;
