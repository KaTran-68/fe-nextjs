"use server";
import { auth, signIn } from "@/auth";
import { sendRequest } from "./api";
import { revalidateTag } from "next/cache";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    return r;
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return {
        error: "Internal server error",
        code: 0,
      };
    }
  }
}

export const handleCreateUserAction = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      ...data,
    },
  });
  revalidateTag("list-users");
  return res;
};

export const handleUpdateUserAction = async (data: any) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      ...data,
    },
  });
  revalidateTag("list-users");
  return res;
};

export const handleDeleteUserAction = async (id: string) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-users");
  return res;
};

export const handleFetchCourseData = async () => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-courses"] },
    },
  });
  return res;
};

export const handleCreateCourseAction = async (data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      ...data,
    },
  });
  revalidateTag("list-courses");
  return res;
};

export const handleUpdateCourseAction = async (id: string, data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      ...data,
    },
  });
  revalidateTag("list-courses");
  return res;
};

export const handleDeleteCourseAction = async (id: string) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-courses");
  return res;
};

export const handleChangePasswordUser = async (
  email: string,
  password: string
) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/changePassword`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      email,
      password,
    },
  });

  return res;
};

export const handleCreateBlogAction = async (data: {
  author: string;
  authorId: string;
  title: string;
  content: string;
  isDraft: boolean;
}) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      ...data,
    },
  });
  revalidateTag("list-blogs");
  return res;
};

export const handleFetchAllBlogs = async (data: {
  current: string | number | string[];
  pageSize: string | number | string[];
  isApproved: boolean;
}) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`,
    method: "GET",
    queryParams: {
      ...data,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-blogs"] },
    },
  });
  return res;
};

export const handleFetchMyBlog = async (data: {
  authorId: string | undefined;
  isDraft: boolean | undefined;
  current: string | number | string[];
  pageSize: string | number | string[];
}) => {
  const session = await auth();
  const { authorId, current, pageSize, isDraft } = data;
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/myblog/fetchmyblog`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    queryParams: {
      current,
      pageSize,
    },
    body: {
      authorId,
      isDraft,
    },
    nextOption: {
      next: { tags: ["list-myblog"] },
    },
  });
  return res;
};

export const handleDeleteBlog = async (id: string) => {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-myblog");
  return res;
};

export const handleUpdateDraftBlog = async (id: string, data: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      ...data,
    },
  });
  revalidateTag("list-myblog");
  return res;
};

export const handleApproveBlog = async (id: string) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/approveBlog/${id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-blogs");
  return res;
};

export const handleGetBlogBySlug = async (slug: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${slug}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return res;
}

export const handleGetCourseBySlug = async (slug: any) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${slug}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["course-view"] },
    },
  });
  return res;
}

export const handleAddOutcome = async (id: string, outcome: string) => {
  const session = await auth()
  const res = await sendRequest<IBackendRes<any>>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/outcomes/${id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      newItem: outcome,
    }
  });
  revalidateTag("course-view");
  return res;
}

export const handleDeleteOutcome = async (id: string, outcome: string) => {
  const session = await auth()
  const res = await sendRequest<IBackendRes<any>>({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/outcomes/${id}`,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: {
      outcome: outcome,
    }
  });
  revalidateTag("course-view");
  return res;
}