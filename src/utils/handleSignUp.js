const usernameRegex = /[^a-z]/;

export const handleSignUp =  (event, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, authRegister, toast, navigate) => {
  try {
    event.preventDefault();
    const startingLetters = username.slice(0, 3);
    if (username.length < 3 || usernameRegex.test(startingLetters)) {
      toast.warn("Username must start with at least 3 letters. (Eg. 'joe', 'joe123')");
      setUsername("")
      return;
    }

    // if (!passwordRegex.test(password)) {
    //   toast.error("Invalid password! Please enter a valid password.");
    //   return;
    // }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match! Please re-enter your password.");
      setPassword("")
      setConfirmPassword("")
      return;
    }

  authRegister({ username, password, navigate });
  } catch (err) {
    console.error(err);
  }
};
