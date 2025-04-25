import { type ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export default function Tabs({ tabs, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={twMerge("w-full mt-8", className)}>
      <div className="flex rounded-md overflow-clip bg-slate-200/30 border border-slate-200">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={tab.label}
            className={twMerge(
              "flex w-full items-center justify-center p-2 hover:bg-slate-200/50 transition hover:text-slate-900",
              activeTab === index
                ? "bg-slate-200"
                : "text-slate-400"
            )}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
}