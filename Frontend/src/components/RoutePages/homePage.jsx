import { CardTitle } from "../ui/card.jsx";
import FloatingItems from "../../components/floatingItems.jsx";
import Blobs from "../../components/bg-blobs.jsx";
import { LoginForm } from "../login-form";
import UrlSection from "../urlSection";

export default function HomePage({ onLogin, setData }) {
  return (
    <>
      <FloatingItems />
      <Blobs />
      <div className="h-[60px] pt-5 text-center">
        <CardTitle className="text-3xl">URL Shortener</CardTitle>
      </div>
      <div className="flex h-full flex-col items-center px-10 py-8">
        <UrlSection />
        <LoginForm onLogin={onLogin} setData={setData} />
      </div>
    </>
  );
}
