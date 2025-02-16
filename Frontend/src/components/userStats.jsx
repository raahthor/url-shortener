import { Card, CardTitle } from "./ui/card";

export default function UserStats({ stats }) {
  
  return (
    <div className="w-80 md:w-[600px]">
      <Card className="mb-4 flex flex-col items-center justify-evenly px-2 py-4">
        <CardTitle className="mb-3 text-xl">All your links & clicks</CardTitle>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-500 px-2 py-1 text-left">
                Original
              </th>
              <th className="border border-gray-500 px-2 py-1 text-left">
                Short
              </th>
              <th className="border border-gray-500 px-2 py-1 text-left">
                Clicks
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="max-w-[100px] truncate border border-gray-500 px-2 py-1">
                    <a href={item.originalUrl} target="_blank">{item.originalUrl}</a>
                  </td>

                  <td className="max-w-[100px] truncate border border-gray-500 px-2 py-1">
                    <a href={item.shortUrl} target="_blank">{item.shortUrl}</a>
                  </td>
                  <td className="max-w-[50px] truncate border border-gray-500 px-2 py-1">
                    {item.clicks}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
