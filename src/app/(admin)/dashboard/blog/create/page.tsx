import { auth } from "@/auth";
import BlogCard from "@/components/admin/blog.card";
import CreateBlog from "@/components/admin/blog.create";

const CreateBlogPage = async () => {
    const session = await auth();

    return (
        <CreateBlog author={session?.user?.name} authorId={session?.user?._id}/>
    )
}

export default CreateBlogPage;