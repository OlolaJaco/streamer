"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Rating from '@/components/ui/Rating';
import SearchInput from '@/components/ui/SearchInput';
import Image from 'next/image';

interface MovieType {
    id: number;
    name: string;
    title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average: number;
    media_type: string;
}

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`/api/search?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data.results || []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error searching:", err);
                    setError("Failed to load search results");
                    setLoading(false);
                });
        }
    }, [query]);

    if (!query) {
        return (
            <div className="p-10 md:p-20 text-center">
                <h1 className="text-3xl font-bold">Please enter a search term</h1>
                <SearchInput />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-10 md:p-20 text-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 md:p-20 text-center">
                <h1 className="text-xl font-bold text-error">{error}</h1>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <SearchInput />
            <h1 className="text-3xl font-bold mb-6">Search Results for: {query}</h1>

            {results.length === 0 ? (
                <p className="text-xl">No results found for your search.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((item) => (
                        <Link key={item.id} href={`/${item.id}`}>
                            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                                <figure>
                                    {(item.backdrop_path || item.poster_path) ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                                            alt={item.title || item.name}
                                            width={500}
                                            height={192}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                                            No Image
                                        </div>
                                    )}
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title || item.name}</h2>
                                    <Rating rating={item.vote_average} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}