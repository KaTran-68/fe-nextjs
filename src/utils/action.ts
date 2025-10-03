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
  description: string;
  image: File;
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

export const handleUpdateCourseAction = async (id: string,data: any) => {
  const session = await auth();
  console.log(data)
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
}

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