export const handleSearchUsers = (users, search, setSearchedUsers) => {
  try {
    const sortedUsers = users?.filter((user) =>
      user.username?.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => a.username.localeCompare(b.username));

    setSearchedUsers(sortedUsers);
  } catch (err) {
    console.error(err);
  }
};