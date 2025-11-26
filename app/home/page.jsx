import Hero from "../../components/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-poppins font-bold text-[#1003E8] mb-4">
          Home
        </h1>
        <p className="text-[#463261] font-inter text-base md:text-lg">
          Welcome to the Home page. This route now exports a valid React
          component so Next.js can prerender it during the build.
        </p>
      </section>
    </div>
  );
}
