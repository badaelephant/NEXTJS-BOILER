import { useState } from "react";
import axios from "axios";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const submitRegister = async (e) => {
    e.preventDefault();
    let user = { email, password, role };
    let result = await axios.post("/api/users/register", user).data;
    if (result.success) alert("you are registered!!");
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <form
        className="w-[30%] py-5 bg-red-200 flex flex-col  justify-center rounded-xl items-center"
        onSubmit={submitRegister}
      >
        <div className="w-full text-center underline">Register Form</div>
        <div className="w-[90%] mt-2">
          <div>email</div>
          <input
            placeholder="john@xxx.com..."
            className="w-full rounded-lg px-5 py-1 "
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="w-[90%] mt-2">
          <div>pwd</div>
          <input
            placeholder="xxxxx"
            className="w-full rounded-lg px-5 py-1"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="w-[90%] mt-2">
          <div>role</div>
          <input
            placeholder="xxxxx"
            className="w-full rounded-lg px-5 py-1"
            value={role}
            onChange={(e) => setRole(e.currentTarget.value)}
          />
        </div>
        <div className="w-[90%] mt-2">
          <button
            type="submit"
            className="mt-2 w-full  py-1 rounded-lg bg-blue-200 hover:opacity-70 active:bg-blue-400"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
