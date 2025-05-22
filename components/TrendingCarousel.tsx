"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Rating from "./ui/Rating";
import Link from "next/link";
import Skeleton from "./ui/Skeleton";

interface MovieType {
    id: number,
    name: string,
    title: string,
    backdrop_path: string,
    vote_average: number,
    media_type?: string
}

const TrendingCarousel = () => {

    const [trending, setTrending] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/movies")
            .then((res) => res.json())
            .then((data) => {
                setTrending(data.results);
                setLoading(false);
            })
            .catch((error) => { console.error("Error fetching movies:", error); setLoading(false); }) 
    }, []);

    return (
        <section className="space-y-6 pt-4 text-base-content">
            <h1 className="text-2xl font-bold ml-4">Trending Movies</h1>
            <div className="carousel rounded-box max-w-7xl">
                {loading ? (
                    // Show skeletons when loading
                    Array(6).fill(0).map((_, index) => (
                        <div className="carousel-item" key={`skeleton-${index}`}>
                            <div className="card bg-base-100 shadow-xs w-[300px] h-[400px]">
                                <div className="p-4">
                                    <Skeleton className="h-40 w-full rounded-lg" />
                                </div>
                                <div className="card-body">
                                    <Skeleton className="h-6 w-36" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    trending.map((movie) => (
                        <div className="carousel-item" key={movie.id}>
                            <Link href={`/${movie.id}`}>
                                <div className="card bg-base-100 shadow-xs w-[300px] h-[400px] hover:shadow-3xl transition-all cursor-pointer">
                                    <figure>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                            alt={movie.name || movie.title}
                                            width={300}
                                            height={160}
                                            className="rounded-lg p-4 object-cover"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-base line-clamp-2 h-12">{movie.name || movie.title}</h2>
                                        <Rating rating={movie.vote_average} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default TrendingCarousel