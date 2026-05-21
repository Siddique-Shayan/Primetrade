const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* OUTER RING */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>

          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin shadow-[0_0_25px_rgba(59,130,246,0.7)]"></div>

          {/* INNER DOT */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* TEXT */}
        <h2 className="mt-8 text-2xl font-bold text-white tracking-wide">
          Primetrade
        </h2>

        <p className="text-slate-400 mt-2 animate-pulse">
          Loading your workspace...
        </p>
      </div>
    </div>
  );
};

export default Loading;