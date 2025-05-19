"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Rating from '@/components/ui/Rating';
import Image from 'next/image';

// interface VideoType {
//     id: string;
//     key: string;
//     name: string;
//     site: string;
//     type: string;
//     official: boolean;
// }

interface MovieDetailType {
    id: number;
    title: string;
    name: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average: number;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    genres: { id: number; name: string }[];
    videos?: {
        results: Array<{
            key: string;
            name: string;
            site: string;
            type: string;
            id: string;
            official?: boolean;
        }>
    };
}

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    // Function to find the best trailer
    const findBestTrailer = (videos: MovieDetailType['videos']) => {
        if (!videos || !videos.results || videos.results.length === 0) return null;
        
        // First try to find an official trailer
        const officialTrailer = videos.results.find(
            video => video.type === "Trailer" && video.site === "YouTube" && video.official === true
        );
        if (officialTrailer) return officialTrailer.key;
        
        // If no official trailer, find any trailer
        const anyTrailer = videos.results.find(
            video => video.type === "Trailer" && video.site === "YouTube"
        );
        if (anyTrailer) return anyTrailer.key;
        
        // If no trailer, just get the first YouTube video
        const anyVideo = videos.results.find(video => video.site === "YouTube");
        return anyVideo ? anyVideo.key : null;
    };

    useEffect(() => {
        setLoading(true);
        fetch(`/api/movies/${id}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                // Find and set trailer key if available
                const key = findBestTrailer(data.videos);
                setTrailerKey(key);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching movie details:", err);
                setError("Failed to load movie details");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="p-10 md:p-20 text-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="p-10 md:p-20 text-center">
                <h1 className="text-xl font-bold text-error">{error || "Movie not found"}</h1>
            </div>
        );
    }

    // Defensive: If vote_average is missing, show 0 and skip Rating
    const voteAverage = typeof movie.vote_average === 'number' ? movie.vote_average : 0;
    // Defensive: If genres is missing or not an array, use empty array
    const genres = Array.isArray(movie.genres) ? movie.genres : [];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* YouTube Trailer Modal using iframe */}
            {showTrailer && trailerKey && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl">
                        <button 
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-full -mt-4 -mr-4 z-10"
                        >
                            X
                        </button>
                        <div className="aspect-video bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Movie Trailer"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="hero min-h-screen bg-base-200 rounded-xl shadow-xl">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                        {(movie.poster_path) ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                width={400}
                                height={600}
                                className="rounded-lg shadow-2xl"
                            />
                        ) : (
                            <div className="w-full h-[600px] bg-gray-300 flex items-center justify-center rounded-lg">
                                No Image Available
                            </div>
                        )}
                    </div>
                    <div className="lg:w-2/3 space-y-6 p-6">
                        <h1 className="text-4xl font-bold">{movie.title || movie.name}</h1>
                        <div className="flex items-center gap-4">
                            {typeof movie.vote_average === 'number' && <Rating rating={voteAverage} />}
                            <span>{voteAverage.toFixed(1)}</span>
                            
                            {/* Trailer Button */}
                            {trailerKey && (
                                <button 
                                    onClick={() => setShowTrailer(true)}
                                    className="btn btn-primary btn-sm ml-4"
                                >
                                    Watch Trailer
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {genres.map(genre => (
                                <span key={genre.id} className="badge badge-outline p-3">{genre.name}</span>
                            ))}
                        </div>
                        <p className="text-lg">{movie.overview}</p>
                        <div>
                            <p><strong>Release Date:</strong> {movie.release_date || movie.first_air_date || "Unknown"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}