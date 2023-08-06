export const handleLogin = async (event, username, password, setPassword, authLogin, trustDevice, navigate) => {
  try {
    event.preventDefault();

   await authLogin({ username, password, trustDevice, navigate });
   setPassword("")
  } catch (err) {
   setPassword("")
    console.error(err);
  }
};