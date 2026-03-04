"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ALL_ACTIVITIES,
  DEFAULT_FILTERS,
  filterActivities,
  type ActivityFilters,
} from "@/lib/activities";
import { ActivityCard } from "./ActivityCard";
import { FiltersBar } from "./FiltersBar";

export function HomePageClient() {
  const [filters, setFilters] = useState<ActivityFilters>(DEFAULT_FILTERS);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const filtered = useMemo(
    () => filterActivities(ALL_ACTIVITIES, filters),
    [filters],
  );

  const recommended = useMemo(() => {
    const count = Math.min(3, filtered.length);
    if (!count) {
      return [];
    }

    // 初次渲染使用稳定顺序，避免 SSR / 客户端不一致导致 hydration 报错。
    if (shuffleSeed === 0) {
      return filtered.slice(0, count);
    }

    // 仅在点击“换一批”后在客户端打乱顺序。
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }, [filtered, shuffleSeed]);

  const handleShuffle = () => {
    setShuffleSeed((prev) => prev + 1);
  };

  const quickFiltered = filtered;

  return (
    <div className="flex flex-col gap-5">
      <section
        data-testid="hero"
        className="rounded-3xl bg-gradient-to-br from-orange-50 via-[#FFF8F1] to-rose-50 p-5 shadow-sm ring-1 ring-orange-100"
      >
        <h1 className="mb-2 text-xl font-semibold text-slate-900">
          AI Play Coach
        </h1>
        <p className="text-sm text-slate-700">
          面向 3–5 岁孩子家长的亲子「玩法卡片」，不用屏幕和编程，在日常游戏里轻轻松松聊 AI
          直觉。
        </p>
      </section>

      <section
        className="space-y-3"
        data-testid="today-recommendations"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            今日推荐玩法
          </h2>
          <button
            type="button"
            onClick={handleShuffle}
            aria-label="重新随机推荐玩法"
            data-testid="shuffle-recommendations"
            className="text-xs font-medium text-orange-700 underline-offset-2 hover:underline"
          >
            换一批
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {recommended.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            快速找玩法
          </h2>
          <Link
            href="/activities"
            data-testid="go-to-activities"
            className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-orange-600"
          >
            去全部玩法
          </Link>
        </div>
        <FiltersBar
          value={filters}
          onChange={setFilters}
          compact
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {quickFiltered.slice(0, 4).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
    </div>
  );
}

