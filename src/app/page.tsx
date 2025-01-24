// import Container from "@/components/Container";
import LatestPosts from "@/components/home/latest-posts";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-start justify-evenly mt-16 md:flex-row">
        <div>
          <LatestPosts />
        </div>
      </main>
    </>
  );
}
