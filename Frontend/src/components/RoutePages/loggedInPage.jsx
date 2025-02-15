import { useState } from "react";
import Blobs from "../bg-blobs";
import { CardTitle } from "../ui/card";
import UrlSectionLogin from "../urlSectionLogin";
import UserStats from "../userStats";

export default function LoggedInPage({ onLogout, data }) {
  const [urlArr, setUrlArr] = useState(data.userStats);
  return (
    <div className="flex h-auto flex-col items-center">
      <Blobs />
      <div className="mb-8 flex h-[50px] w-full justify-center pt-5">
        <CardTitle className="px-10 text-xl md:text-2xl">
          Hey👋, {data.name}
        </CardTitle>
        <button
          onClick={() => onLogout(false)}
          className="absolute right-2 rounded-md bg-blue-600 p-2 text-sm font-semibold text-white hover:bg-blue-700 md:right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </button>
      </div>
      <UrlSectionLogin userName={data.username} addUrl={setUrlArr} />
      <UserStats stats={urlArr} />
    </div>
  );
}
