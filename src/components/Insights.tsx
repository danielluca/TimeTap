import { SmileyBlank, Trash, X } from "@phosphor-icons/react";
import { useSettingsContext } from "../hooks/useSettingsContext";
import Tabs from "./Tabs";
import { useState } from "react";
import classNames from "classnames";
import { generateDummyHistory } from "../utility/dummyData";
import { eachDayOfInterval, endOfWeek, format, isWithinInterval, startOfWeek } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function Insights() {
  const { setShowInsights } = useSettingsContext();

  return (
    <div className="w-full">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Insights</h2>

        <button
          type="button"
          className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center aspect-square transition-colors font-semibold"
          onClick={() => setShowInsights(false)}
        >
          <X weight="bold" color="currentColor" size={16} />
        </button>
      </header>

      <Tabs tabs={[
        { label: "Analytics", content: <AnalyticsTab /> },
        { label: "History", content: <HistoryTab /> },
      ]}
      />
    </div>
  )
}

function HistoryTab() {
  const { setShowInsights, history, setHistory, } = useSettingsContext();
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
    if (!history?.length) return (
      <div className="p-8 text-slate-400 flex items-center justify-center gap-1 flex-col">
        <SmileyBlank weight="bold" />
        No history available
      </div>
    )

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
          <div key={`${entry.date}-${index}`} role="row" className="relative grid py-2.5 px-3 grid-cols-5 gap-8">
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
      <main className="flex flex-col gap-4 my-8 max-h-80 overflow-scroll border border-slate-200 rounded-lg">
        <div role="table" aria-label="History entries" className="divide-y divide-slate-200">
          <div role="row" className="grid grid-cols-5 gap-8 font-semibold py-1.5 sticky top-0 bg-slate-200 z-10 px-3 text-sm">
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
              setShowInsights(false);
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
            onClick={() => setHistory(generateDummyHistory())}
            className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center w-full transition-colors font-semibold"
          >
            Load Dummy Data
          </button>
        )}
      </footer>
    </div>
  );
}

function AnalyticsTab() {
  const { history } = useSettingsContext();

  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // 1 represents Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  // Calculate total hours worked this week
  const weeklyTotal = history
    .filter((entry) =>
      isWithinInterval(new Date(entry.date), { start: weekStart, end: weekEnd })
    )
    .reduce((total, entry) => {
      return total + (entry.endTime - entry.startTime) / (1000 * 60 * 60);
    }, 0);

  // Calculate average session duration
  const averageSessionDuration =
    history.length > 0
      ? history.reduce((total, entry) => {
        return total + (entry.endTime - entry.startTime);
      }, 0) / (history.length * 1000 * 60 * 60)
      : 0;

  // Prepare data for daily hours chart
  const dailyData = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(
    (day) => {
      const dayTotal = history
        .filter(
          (entry) =>
            format(new Date(entry.date), "yyyy-MM-dd") ===
            format(day, "yyyy-MM-dd")
        )
        .reduce((total, entry) => {
          return total + (entry.endTime - entry.startTime) / (1000 * 60 * 60);
        }, 0);

      return {
        name: format(day, "EEE"), // Day name (Mon, Tue, etc.)
        hours: Number(dayTotal.toFixed(2)),
      };
    }
  );

  return (
    <div className="w-full max-w-4xl">
      <main className="flex flex-col gap-8 mt-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="font-semibold mb-2">Weekly Total</label>
            <h3 className="text-3xl font-bold">{weeklyTotal.toFixed(1)} h</h3>
          </div>

          <div>
            <label className="font-semibold mb-2">Avg. Session Duration</label>
            <h3 className="text-3xl font-bold">
              {averageSessionDuration.toFixed(1)} h
            </h3>
          </div>
        </div >

        <div>
          <label className="font-semibold mb-4"> Daily Hours Worked</label>
          <div className="h-96 max-h-96">
            <ResponsiveContainer width="100%" height="100%" className="">
              <BarChart data={dailyData}>
                <XAxis dataKey="name" />
                <Tooltip
                  wrapperClassName="rounded-md shadow-lg"
                  labelClassName="var(--color-slate-700) font-semibold"
                  contentStyle={{
                    background: "var(--color-slate-100)",
                    color: "var(--color-slate-700)",
                    borderColor: "transparent",
                    padding: "0.5rem",
                    lineHeight: "1",
                    margin: "0"
                  }}
                  cursor={{ fill: "var(--color-slate-300)" }}
                />
                <Bar dataKey="hours" fill="var(--color-slate-700)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div >
      </main >
    </div >
  );
}