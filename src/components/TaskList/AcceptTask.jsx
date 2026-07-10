const formatDate = (date) => new Date(date).toLocaleDateString();

const AcceptTask = ({ data, onComplete, onFail }) => {
  return (
    <div className="min-h-[270px] w-[300px] flex-shrink-0 snap-start rounded-xl bg-[#f97316] p-5 shadow-lg sm:w-[320px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="rounded bg-white/20 px-3 py-1 text-sm font-semibold">
          {data.category}
        </h3>
        <h4 className="text-sm">{formatDate(data.dueDate)}</h4>
      </div>

      <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
      <p className="mt-2 min-h-20 text-sm leading-6">{data.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={onComplete}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold transition hover:bg-emerald-700"
        >
          Complete
        </button>
        <button
          onClick={onFail}
          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold transition hover:bg-red-700"
        >
          Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
