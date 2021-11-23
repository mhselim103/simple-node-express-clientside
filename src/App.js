import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email };
    // send data to server
    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      });
    nameRef.current.value = "";
    emailRef.current.value = "";
  };
  return (
    <div className="App">
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.id} {user.name} {user.email}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          ref={nameRef}
          placeholder="your name"
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          placeholder="your email"
        />{" "}
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
