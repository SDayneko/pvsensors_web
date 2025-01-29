// import Container from "@/components/Container";
import LatestPosts from "@/components/home/latest-posts";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth(); // Fetch session details
  return (
    <>
        <div>
          <LatestPosts />
          {session && <SignOut />}
        </div>
    </>
  );
}
