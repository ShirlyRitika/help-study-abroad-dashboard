export const fakeLoginAPI = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

      if (
        (username === "admin" && password === "12345") ||
        (savedUser &&
          username === savedUser.username &&
          password === savedUser.password)
      ) {
        resolve({ success: true, username });
      } else {
        reject({ success: false, message: "Invalid credentials" });
      }
    }, 1200);
  });
};
