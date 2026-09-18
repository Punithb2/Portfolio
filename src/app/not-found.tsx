import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid/[0.07] blur-[120px]" />
      <p className="section-label relative mb-6">Error 404</p>
      <h1 className="relative text-[clamp(5rem,20vw,16rem)] font-semibold leading-none tracking-[-0.06em]">
        Lost<span className="font-serif font-normal italic text-accent">.</span>
      </h1>
      <p className="relative mt-6 max-w-md text-mute">
        This page doesn&apos;t exist — but the work, the projects and the contact details all live one click away.
      </p>
      <Link
        href="/"
        className="relative mt-10 rounded-full bg-acid px-7 py-3 font-medium text-on-acid transition-transform hover:scale-105"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
