import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
       <main className="flex flex-col items-start justify-evenly mt-16 md:flex-row">
        <p>News</p>
       </main>
    </>
  );
}
