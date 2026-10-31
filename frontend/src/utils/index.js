export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};

export const getStatus = (deadline, status, completedOn) => {
  const now = new Date();

  const deadlineDay = deadline.slice(0, 10);

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  if (status === "DONE") {
    if (!completedOn) return "Failed";

    const completionDate = new Date(completedOn);

    const completionDay = [
      completionDate.getFullYear(),
      String(completionDate.getMonth() + 1).padStart(2, "0"),
      String(completionDate.getDate()).padStart(2, "0"),
    ].join("-");

    return completionDay <= deadlineDay ? "Achieved" : "Failed";
  }

  return today > deadlineDay ? "Failed" : "In Progress";
};