const TaskListNumbers = ({ data }) => {
  const cards = [
    {
      label: "New Tasks",
      value: data.taskCounts.newTask,
      className: "bg-[#2563eb]",
    },
    {
      label: "Completed",
      value: data.taskCounts.completed,
      className: "bg-[#16a34a]",
    },
    {
      label: "Active Tasks",
      value: data.taskCounts.active,
      className: "bg-[#f59e0b]",
    },
    {
      label: "Failed Tasks",
      value: data.taskCounts.failed,
      className: "bg-[#dc2626]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className={`${card.className} rounded-xl p-5 shadow-lg transition-all duration-200 hover:-translate-y-1`}
        >
          <h2 className="text-4xl font-bold text-white">{card.value}</h2>
          <h3 className="mt-2 text-base font-medium text-white/90">
            {card.label}
          </h3>
        </article>
      ))}
    </div>
  );
};

export default TaskListNumbers;
