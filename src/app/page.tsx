import { auth } from "@/auth";
import HomePage from "@/components/layout/homepage";

export default async function Home() {
  const session = await auth()
  return (
    <div style={{
      textAlign: 'center',
    }}>
      <HomePage />
    </div>
  );
}
