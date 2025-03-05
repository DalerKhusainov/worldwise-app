import { useState, useEffect, FormEvent } from "react";
import { Navigate } from "react-router";
import styles from "./Login.module.css";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../contexts/FakeAuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("loged");
      <Navigate replace to="/app" />;
    }
  }, [isAuthenticated]);

  // console.log(isAuthenticated);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    login(email, password);
    console.log("Submit");
  }

  return (
    <main className={styles.login}>
      <Navbar />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}
