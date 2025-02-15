import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
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

const baseURL = import.meta.env.VITE_BACKEND_URL;

export function LoginForm({ className, onLogin, setData, ...props }) {
  const [userInput, updateUserInput] = useState("");
  const [passInput, updatePassInput] = useState("");

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (userInput === "" || passInput === "") {
      alert("Please Input Username and Password");
      return;
    }

    const response = await axios.post(`${baseURL}/api/login`, {
      username: userInput,
      password: passInput,
    });

    if (response.data.success === true) {
      setData({
        username: response.data.username,
        name: response.data.name,
        userStats: response.data.userStats,
      });
      onLogin(true);
      navigate("/loggedIn");
    } else {
      alert(response.data.message);
    }
  }

  return (
    <div
      className={cn("mb-4 flex w-80 flex-col gap-6 md:w-[600px]", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login to track all of your URLs at once.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label >Username</Label>
                <Input
                  onChange={(e) => updateUserInput(e.target.value)}
                  value={userInput}
                  placeholder="username"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label >Password</Label>
                </div>
                <Input
                  onChange={(e) => updatePassInput(e.target.value)}
                  value={passInput}
                  type="password"
                  placeholder="password"
                />
              </div>
              <Button
                disabled={!userInput || !passInput}
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signUp" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
