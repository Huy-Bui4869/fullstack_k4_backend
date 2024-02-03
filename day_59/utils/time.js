const getDates = (oldDate) => {
  const year = oldDate.getFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();
  const hours = oldDate.getHours();
  const minutes = oldDate.getMinutes();

  return `${hours}:${minutes}, ${date}/${month}/${year}`;
};

module.exports = {
  getDates,
};
