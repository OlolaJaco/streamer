"use client"

import Link from 'next/link';
import ThemeController from './ThemeController';

const NavBar = () => {
    

    return (
        <div className="navbar bg-base-100 shadow-2xl border text-base-content">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost text-xl">STREAMER</Link>
            </div>
            <div className="flex-none">
                <ThemeController />
            </div>
        </div>
    )
}

export default NavBar