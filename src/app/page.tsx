import { HomeViewProvider } from "@/hooks/useHomeView";
import { HomePage } from "@/screen/home";

export default function Home() {
  return (
    <HomeViewProvider>
      <HomePage />
    </HomeViewProvider>
  );
}
