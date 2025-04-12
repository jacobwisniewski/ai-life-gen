import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 p-8">
      <main className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-5xl font-bold text-center">
          Discover Your True Purpose
        </h1>
        <p className="text-xl text-center max-w-2xl">
          Uncover what you truly want to do in life using proven methods like Warren Buffett's top 5 things and the Eisenhower Matrix.
        </p>
        <Link
          href="/onboarding"
          className="mt-4 inline-block rounded-full bg-blue-600 px-8 py-4 text-white text-xl font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
