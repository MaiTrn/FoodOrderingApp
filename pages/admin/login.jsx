import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      router.push("/admin");
    } catch (e) {
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>

        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
