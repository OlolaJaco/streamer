"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className='flex justify-center py-10'>
            <form onSubmit={handleSearch} className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-warning ml-2 text-black">Search</button>
            </form>
        </div>
    );
};

export default SearchInput;