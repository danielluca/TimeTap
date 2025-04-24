import { useState } from "react";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { Trash, X } from "@phosphor-icons/react";
import classNames from "classnames";
import { generateDummyHistory } from "../utility/dummyData"

export default function History() {
  const { setShowHistory, history, setHistory, } = useSettingsContext();
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
        <div className={classNames("absolute inset-0 flex gap-1 justify-end py-1", { "bg-slate-100/80": alert })}>
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
      <div role="table" aria-label="History entries" className="divide-y divide-slate-200">
        <div role="row" className="sr-only">
          <span role="columnheader">Date</span>
          <span role="columnheader">Starting at</span>
          <span role="columnheader">Ending at</span>
          <span role="columnheader">Total time</span>
          <span role="columnheader">Actions</span>
        </div>

        {history.map((entry, index) => (
          <div key={`${entry.date}-${index}`} role="row" className="relative grid py-2 grid-cols-5 gap-8">
            <div role="gridcell" className="w-max">
              {new Date(entry.date).toLocaleDateString("de-DE", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" })}
            </div>
            <div role="gridcell" className="w-max">
              {new Date(entry.startTime).toLocaleTimeString("de-DE", { timeStyle: "medium" })}
            </div>
            <div role="gridcell" className="">
              {new Date(entry.endTime).toLocaleTimeString("de-DE", { timeStyle: "medium" })}
            </div>
            <div role="gridcell" className="w-max">
              {formatDuration(entry.endTime - entry.startTime)}
            </div>
            <div role="gridcell">
              <DeleteEntryButton index={index} />
            </div>
          </div>
        ))}
      </div>
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
        <div role="table" aria-label="History entries" className="divide-y divide-slate-200">
          <div role="row" className="grid grid-cols-5 gap-8 font-semibold py-1">
            <span role="columnheader">Date</span>
            <span role="columnheader">Starting at</span>
            <span role="columnheader">Ending at</span>
            <span role="columnheader">Total time</span>
          </div>
          {renderHistory()}
        </div>
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

        {import.meta.env.DEV && (
          <button
            type="button"
            onClick={() => setHistory(generateDummyHistory(30))}
            className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
          >
            Load Dummy Data
          </button>
        )}
      </footer>
    </div>
  );
}