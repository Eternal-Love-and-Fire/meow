import { Header } from "@/components/header/Header";
import { HeaderAuth } from "@/components/header/HeaderAuth";
import { HeaderCenter } from "@/components/header/HeaderCenter";


function Home() {
  return (
    <div className="min-w-screen">
      <Header />
      <HeaderAuth />
      <HeaderCenter />
      <footer></footer>
    </div>
  );
}

export default Home;
