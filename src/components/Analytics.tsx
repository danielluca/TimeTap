import { useSettingsContext } from "../hooks/useSettingsContext";
import { X } from "@phosphor-icons/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isWithinInterval,
} from "date-fns";

const COLORS = ["#0088FE", "#00C49F"];

export default function Analytics() {
  const { setShowAnalytics, history } = useSettingsContext();

  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);

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
    history.reduce((total, entry) => {
      return total + (entry.endTime - entry.startTime);
    }, 0) / (history.length * 1000 * 60 * 60);

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
        name: format(day, "EEE"),
        hours: Number(dayTotal.toFixed(2)),
      };
    }
  );

  // Calculate work-break ratio data
  const workBreakData = [
    {
      name: "Work",
      value: weeklyTotal,
    },
    {
      name: "Break",
      value: history
        .filter((entry) =>
          isWithinInterval(new Date(entry.date), {
            start: weekStart,
            end: weekEnd,
          })
        )
        .reduce((total, entry) => {
          return (
            total +
            (entry.endTime - entry.startTime) / (1000 * 60 * 60) -
            weeklyTotal
          );
        }, 0),
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Analytics</h2>
          <p className="text-slate-500">
            View your work patterns and productivity metrics
          </p>
        </div>

        <button
          type="button"
          className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center aspect-square transition-colors font-semibold"
          onClick={() => setShowAnalytics(false)}
        >
          <X weight="bold" color="currentColor" size={16} />
        </button>
      </header>

      <main className="flex flex-col gap-8 my-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-100 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">Weekly Total</h3>
            <p className="text-3xl font-bold">{weeklyTotal.toFixed(1)}h</p>
          </div>
          <div className="bg-slate-100 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">Avg. Session Duration</h3>
            <p className="text-3xl font-bold">
              {averageSessionDuration.toFixed(1)}h
            </p>
          </div>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-semibold mb-4">Daily Hours</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="rgb(51 65 85)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl">
          <h3 className="font-semibold mb-4">Work-Break Ratio</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workBreakData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workBreakData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}