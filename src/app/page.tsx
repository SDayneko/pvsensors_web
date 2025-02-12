import Container from "@/components/Container";
import LatestPosts from "@/components/home/latest-posts";
// import TeensyUpdater from "@/components/TeensyUpdater";
// import USBWebcam from "@/components/USBwebcam";

export default async function Home() {
  
  return (
    <Container>
      <main className="flex flex-col items-start justify-evenly mt-16 md:flex-row">
        <div>
          <LatestPosts />
        </div>
      </main>
      {/* <USBWebcam /> */}
      {/* <TeensyUpdater /> */}
    </Container>
  );
}
