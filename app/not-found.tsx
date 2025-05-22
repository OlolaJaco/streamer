import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col">

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-2xl flex flex-col items-center gap-8">
          <div className="flex justify-center mb-8">
            <Image
              src="/404.png"
              alt="Page Not Found"
              width={200}
              height={200}
              className="max-w-full"
              quality={100}
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold">
            Oops! Page Not Found
          </h1>

          <p className="text-lg md:text-[20px]">
            We are very sorry for the inconveniences, it looks like you’re
            trying to access a page that has been deleted or doesn&apos;t exist
            yet.
          </p>

          <Link
            href="/"
            className="inline-block bg-primary-200 text-secondary-100
            px-10 md:px-24 py-5 rounded-2xl hover:bg-primary-150 
            transition-colors duration-300 ease-in-out underline"
          >
            Back to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
