import MoviesCarousel from "@/components/MoviesCarousel";
import TrendingCarousel from "@/components/TrendingCarousel";
import TvSeriesCarousel from "@/components/TvSeriesCarousel";
import SearchInput from "@/components/ui/SearchInput";


export default function Home() {
  return (
    <div className="bg-base-100 text-base-content">
      <section className="max-w-7xl mx-auto">
        <SearchInput />
        <TrendingCarousel />
        <MoviesCarousel />
        <TvSeriesCarousel />
      </section>
    </div>
  );
}
