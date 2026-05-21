import { Link } from "react-router-dom";

const WrongRoute = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 */}
        <h1 className="text-[140px] md:text-[180px] font-extrabold text-blue-500 leading-none drop-shadow-[0_0_35px_rgba(59,130,246,0.5)]">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-400 mt-5 max-w-xl mx-auto text-lg leading-relaxed">
          The page you are trying to access
          does not exist or may have been
          moved.
        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-white text-lg font-semibold transition duration-300 shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default WrongRoute;