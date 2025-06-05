import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Herosection from "@/components/Herosection";
import MoviesCarousel from "@/components/MoviesCarousel";
import TrendingCarousel from "@/components/TrendingCarousel";
import TvSeriesCarousel from "@/components/TvSeriesCarousel";
import SearchInput from "@/components/ui/SearchInput";

export default async function Home() {
  const session = await auth();

  // redirect to sign-in page if user is not authenticated
  if (!session) {
    redirect("/auth/sign-in");
  }
  
  return (
    <div className="bg-base-100 text-base-content">
      <section className="max-w-7xl mx-auto">
        <Herosection />
        <SearchInput />
        <TrendingCarousel />
        <MoviesCarousel />
        <TvSeriesCarousel />
      </section>
    </div>
  );
}
