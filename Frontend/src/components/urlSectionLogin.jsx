import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function copyToClipboard(event) {
  event.preventDefault();
  const copyText = document.getElementById("copyText");
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard
    .writeText(copyText.value)
    .then(() => alert("Copied to clipboard!"))
    .catch((err) => console.error("Failed to copy:", err));
}

export default function UrlSectionLogin({
  className,
  userName,
  addUrl,
  ...props
}) {
  const [urlInput, updateUrlInput] = useState("");
  const [shortUrl, updateShortUrl] = useState("");

  async function handleUserGenerate(event) {
    event.preventDefault();
    if (urlInput === "" || urlInput === " ") {
      alert("Enter a URL !");
      updateShortUrl("");
      return;
    }
    const response = await axios.post(`${baseURL}/api/generateURL`, {
      longUrl: urlInput,
      username: userName,
    });
    if (response.data.success === true) {
      updateShortUrl(response.data.shortUrl);
      addUrl((prevArr) => [
        ...prevArr,
        {
          id: Math.floor(Math.random() * 1000),
          originalUrl: urlInput,
          shortUrl: response.data.shortUrl,
          clicks: "N/A",
        },
      ]);
    } else {
      updateShortUrl("");
      updateUrlInput("");
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
          <CardDescription>
            Enter long URL below and hit Generate button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Long URL</Label>
                <Input
                  value={urlInput}
                  onChange={(e) => updateUrlInput(e.target.value)}
                  placeholder="url . . ."
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Short URL</Label>
                </div>
                <div className="flex">
                  <div className="inline w-56 md:w-[500px]">
                    <Input
                      id="copyText"
                      value={shortUrl}
                      placeholder="Short URL will be here"
                      disabled
                    />
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex w-12 items-center justify-center rounded-r-md bg-blue-600 shadow-md hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="white"
                      className="bi bi-copy"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <Button
                onClick={handleUserGenerate}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Generate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
