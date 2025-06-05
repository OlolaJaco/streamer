'use client'

import { useEffect, useState } from "react"
import RadialProgress from "./ui/RadialProgress"
import Link from "next/link"
import LoadingBars from "./ui/LoadingBars"

interface MovieType {
    id: number,
    name: string,
    title: string,
    backdrop_path: string,
    vote_average: number
    popularity: number,
    overview?: string
}

const Herosection = () => {
    const [, setNowPlaying] = useState<MovieType[]>([]);
    const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);

    useEffect(() => {
        fetch("/api/now-playing")
            .then((res) => res.json())
            .then((data) => {
                setNowPlaying(data.results);
                // Select a random movie when data is loaded
                if (data.results && data.results.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    setRandomMovie(data.results[randomIndex]);
                }
            })
            .catch((error) => console.error("Error fetching movies:", error))
    }, []);

    return (
        <div className="bg-base-200 min-h-[400px] flex flex-col justify-end" 
             style={randomMovie?.backdrop_path ? {
                backgroundImage: `url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
             } : {}}>
            <div className="text-white w-full px-2 md:px-8 pb-4 md:pb-8">
                <div className="backdrop-blur-sm bg-black/50 p-3 md:p-6 max-w-sm">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
                        {randomMovie ? randomMovie.title : <LoadingBars />}
                    </h1>
                    <RadialProgress popularity={777} />
                    <Link href={`/${randomMovie?.id}`} className="btn btn-neutral btn-sm md:btn-md ml-2 mt-2 md:m-4">Watch Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Herosection