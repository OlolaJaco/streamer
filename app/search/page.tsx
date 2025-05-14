"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchInput from '@/components/ui/SearchInput';
import SearchResultsSuspense from '@/components/SearchResultsSuspense';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    if (!query) {
        return (
            <div className="p-10 md:p-20 text-center">
                <h1 className="text-3xl font-bold">Please enter a search term</h1>
                <SearchInput />
            </div>
        );
    }

    return (
        <Suspense fallback={<div className="p-10 md:p-20 text-center"><span className="loading loading-spinner loading-lg"></span></div>}>
            <SearchResultsSuspense query={query} />
        </Suspense>
    );
}