const formatDate = (date) => new Date(date).toLocaleDateString();

const FailedTask = ({ data }) => {
  return (
    <div className="min-h-[270px] w-[300px] flex-shrink-0 snap-start rounded-xl bg-[#dc2626] p-5 shadow-lg sm:w-[320px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="rounded bg-white/20 px-3 py-1 text-sm font-semibold">
          {data.category}
        </h3>
        <h4 className="text-sm">{formatDate(data.dueDate)}</h4>
      </div>

      <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
      <p className="mt-2 min-h-20 text-sm leading-6">{data.description}</p>

      <div className="mt-6">
        <span className="block w-full rounded-lg bg-white/20 py-2 text-center text-sm font-semibold">
          Failed
        </span>
      </div>
    </div>
  );
};

export default FailedTask;
