import { useState } from "react";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { Trash, X } from "@phosphor-icons/react";

export default function History() {
  const { setShowHistory, history, setHistory } = useSettingsContext();
  const [alert, setAlert] = useState(false);

  const downloadHistoryCSV = () => {
    if (!history?.length) return;

    const headers = "Date,Start Time,End Time\n";
    const csvContent = history.reduce((acc, entry) => {
      return `${acc}${entry.date},${new Date(entry.startTime).toLocaleTimeString()},${new Date(entry.endTime).toLocaleTimeString()}\n`;
    }, headers);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `history-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function formatDuration(duration: number) {
    const totalSeconds = Math.floor(duration / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const renderHistory = () => {
    if (!history?.length) return null;

    function DeleteEntryButton({ index }: { index: number }) {
      const [alert, setAlert] = useState(false);

      return (
        <div className="absolute inset-0 flex gap-1 justify-end py-1">
          {!alert && (
            <button
              type="button"
              className="flex items-center gap-1 text-slate-400 hover:text-red-500 p-2"
              onClick={() => setAlert(true)}
            >
              <Trash weight="bold" />
            </button>
          )}

          {alert && (
            <>
              <button
                type="button"
                className="flex items-center gap-1 text-red-500 hover:text-red-700 p-1"
                onClick={() => {
                  const newHistory = [...history];
                  newHistory.splice(index, 1);
                  setHistory(newHistory);
                  setAlert(false);
                }}
              >
                <Trash weight="bold" /> Delete
              </button>

              <button
                type="button"
                className="flex items-center gap-1 text-slate-500 hover:text-slate-700 p-1"
                onClick={() => setAlert(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      );
    }

    return (
      <tbody className="divide-y divide-gray-200">
        {history.map((entry, index) => (
          <tr key={entry.startTime}>
            <td>{new Date(entry.date).toLocaleDateString("de-DE", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" })}</td>
            <td className="py-2">{new Date(entry.startTime).toLocaleTimeString("de-DE", { timeStyle: "medium" })}</td>
            <td className="py-2">{new Date(entry.endTime).toLocaleTimeString("de-DE", { timeStyle: "medium" })}</td>
            <td className="py-2">{formatDuration(entry.endTime - entry.startTime)}</td>
            <td className="relative">
              <DeleteEntryButton index={index} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="w-full">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">History</h2>

        <button
          type="button"
          className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center aspect-square transition-colors font-semibold"
          onClick={() => setShowHistory(false)}
        >
          <X weight="bold" color="currentColor" size={16} />
        </button>
      </header>

      <main className="flex flex-col gap-4 my-8 max-h-96 overflow-scroll">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-slate-100">
            <tr>
              <th scope="col" className="py-2 text-left font-medium border-b">Date</th>
              <th scope="col" className="py-2 text-left font-medium border-b">Starting at</th>
              <th scope="col" className="py-2 text-left font-medium border-b">Ending at</th>
              <th scope="col" className="py-2 text-left font-medium border-b">Total time</th>
              <th scope="col" className="py-2 text-left font-medium border-b" />
            </tr>
          </thead>
          {renderHistory()}
        </table>
      </main>

      <footer className="grid gap-2">
        <button
          type="button"
          onClick={downloadHistoryCSV}
          className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
        >
          Download as CSV
        </button>

        <button
          type="button"
          className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
          onClick={() => {
            if (alert) {
              setHistory([]);
              setShowHistory(false);
            } else {
              setAlert(true);
            }
          }}
        >
          {alert ? "Click again to delete" : "Clear History"}
        </button>
      </footer>
    </div>
  );
}