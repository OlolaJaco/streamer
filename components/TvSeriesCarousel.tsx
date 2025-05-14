"use client"

import { useEffect, useState } from "react";
import Image from 'next/image';
import Rating from "./ui/Rating";
import Link from "next/link";

interface MovieType {
    id: number,
    name: string,
    title: string,
    backdrop_path: string,
    vote_average: number
}

const TvSeriesCarousel = () => {

    const [trending, setTrending] = useState<MovieType[]>([]);

    useEffect(() => {
        fetch("/api/tv")
            .then((res) => res.json())
            .then((data) => setTrending(data.results))
            .catch((error) => console.error("Error fetching movies:", error))
    }, []);

    return (
        <section className="space-y-6 mt-8 text-base-content">
            <h1 className="text-2xl font-bold">Tv Series</h1>
            <div className="carousel rounded-box space-x-10 max-w-7xl">
                {trending.map((movie) => (
                    <div className="carousel-item" key={movie.id}>
                        <Link href={`/${movie.id}`}>
                            <div className="card bg-base-100 shadow-2xl max-w-7xl hover:shadow-3xl transition-all cursor-pointer">
                                <figure>
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                        alt={movie.name || movie.title}
                                        width={300}
                                        height={0}
                                        className="rounded-lg p-4"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{movie.name || movie.title}</h2>
                                    <Rating rating={movie.vote_average} />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TvSeriesCarousel