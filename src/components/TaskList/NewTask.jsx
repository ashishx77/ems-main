const formatDate = (date) => new Date(date).toLocaleDateString();

const NewTask = ({ data, onAccept }) => {
  return (
    <div className="min-h-[270px] w-[300px] flex-shrink-0 snap-start rounded-xl bg-[#2563eb] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/30 sm:w-[320px]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-white/20 px-3 py-1 text-xs font-semibold">
          {data.category}
        </span>

        <span className="text-sm text-gray-200">
          {formatDate(data.dueDate)}
        </span>
      </div>

      <h2 className="mt-6 text-2xl font-bold">{data.title}</h2>

      <p className="mt-3 min-h-20 text-sm leading-6 text-gray-100">
        {data.description}
      </p>

      <button
        onClick={onAccept}
        className="mt-8 w-full rounded-lg bg-emerald-500 py-3 font-semibold transition-all duration-200 hover:bg-emerald-600 active:scale-95"
      >
        Accept Task
      </button>
    </div>
  );
};

export default NewTask;
