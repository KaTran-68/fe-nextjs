import { auth } from "@/auth";
import BlogCard from "@/components/admin/blog.card";
import { handleFetchMyBlog } from "@/utils/action";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const MyDraftBlogs = async (props: IProps) => {
  const session = await auth();
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;

  const res = await handleFetchMyBlog({
    authorId: session?.user?._id,
    current,
    pageSize,
    isDraft: true,
  });

  return (
    <div>
      <BlogCard isApproved={false} isMyBlog={true} meta={res.data.meta} blogsData={res.data.results} />
    </div>
  );
};

export default MyDraftBlogs;
