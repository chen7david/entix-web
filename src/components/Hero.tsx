/**
 * Example Hero component for the Entix landing page.
 * Displays a title and some text, styled with Tailwind CSS.
 */
export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 md:text-6xl">Welcome to Entix!</h1>
        <p className="text-xl mb-8 md:text-2xl max-w-2xl mx-auto">
          Your fun and engaging learning adventure starts here. Explore a world of knowledge!
        </p>
        <button
          type="button"
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform duration-150 hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
