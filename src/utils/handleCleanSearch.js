export const handleCleanSearch = (setSearch) => {
  try {
    setSearch("");
  } catch (err) {
    console.error(err);
  }
};