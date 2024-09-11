const Input = () => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="w-full bg-transparent placeholder:text-slate-400 dark:text-slate-200 text-slate-800 text-sm border-b border-b-slate-200 pl-2 py-1 transition duration-500 ease focus:outline-none focus:border-b-slate-400 hover:border-b-slate-300 shadow-sm focus:shadow"
    />
  );
};

export { Input };
