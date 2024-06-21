export const useCustomLogin = () => {
  const customLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const user = await response.json();
      console.log("User is ", user);
      return user;
    } catch (error) {
      console.error("Failed to login:", error);
      return null;
    }
  };

  return customLogin;
};
