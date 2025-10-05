export default function CreateBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-xl font-bold">Viết blog mới</h1>
      <div>{children}</div>
    </div>
  );
}
