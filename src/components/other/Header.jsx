import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Header = ({ changeUser, data }) => {
  const { logout } = useContext(AuthContext);

  const logOutUser = () => {
    logout();
    changeUser?.(null);
  };

  return (
    <header className="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900 px-5 py-5 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-400">
          Welcome back
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          {data ? data.name : "Admin"}
        </h1>
      </div>

      <button
        onClick={logOutUser}
        className="w-full rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-95 sm:w-auto"
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
