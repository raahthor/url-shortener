import Blobs from "../bg-blobs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function SignUpPage() {
  const navigate = useNavigate();

  const [newUser, updateNewUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    updateNewUser((prevVal) => ({ ...prevVal, [name]: value }));
  }
  async function handleCreateUser(event) {
    event.preventDefault();
    const response = await axios.post(`${baseURL}/api/createUser`, {
      name: newUser.name,
      username: newUser.username,
      password: newUser.password,
    });
    if (response.data.success === true) {
      alert(response.data.message);
      navigate("/home");
    } else {
      alert(response.data.message);
    }
    
  }
  return (
    <div className="flex h-full flex-col items-center">
      <Blobs />
      <div className="mb-8 h-24 px-5 pt-5">
        <CardTitle className="text-2xl">
          Hey👋, fill out the details below to get started.
        </CardTitle>
      </div>

      {/* Sign Up form */}

      <div className="mb-4 flex w-80 flex-col gap-6 md:w-[600px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Create an account to get full access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Enter Your Name</Label>
                  <Input
                    value={newUser.name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Create a unique Username</Label>
                  <Input
                    value={newUser.username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Create Password</Label>
                  <Input
                    value={newUser.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <Button
                  disabled={
                    !newUser.name || !newUser.username || !newUser.password
                  }
                  onClick={handleCreateUser}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
