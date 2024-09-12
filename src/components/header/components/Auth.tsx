const Auth = () => {
  return (
    <div className="flex gap-6">
        <button className="min-w-16 p-2 pb-1 border-b-2 border-transparent hover:border-black hover:dark:border-white hover:opacity-70 active:opacity-50 duration-500">Sign Up</button>
        <button className="min-w-16 p-2 pb-1 border-b-2 border-transparent hover:border-black hover:dark:border-white hover:opacity-70 active:opacity-50 duration-500">Log In</button>
    </div>
  );
}

export { Auth };