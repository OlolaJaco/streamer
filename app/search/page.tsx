"use client";

import { Suspense } from 'react';
import SearchResultsClient from '@/components/SearchResultsClient';

export default function SearchResults() {
    return (
        <Suspense fallback={<div className="p-10 md:p-20 text-center"><span className="loading loading-spinner loading-lg"></span></div>}>
            <SearchResultsClient />
        </Suspense>
    );
}