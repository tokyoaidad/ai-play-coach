"use client";

import Link from "next/link";
import type { Activity } from "@/lib/types";
import { TagChip } from "./TagChip";
import { FavoriteButton } from "./FavoriteButton";

interface ActivityCardProps {
  activity: Activity;
}

function formatLocation(location: Activity["location"]): string {
  if (location === "indoor") return "室内";
  if (location === "outdoor") return "户外";
  return "室内/户外都可";
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const primaryTheme = activity.themes[0];
  const todayLearn =
    activity.ai_concepts && activity.ai_concepts.length > 0
      ? activity.ai_concepts[0]
      : "今天一起玩中学一点 AI 小知识。";

  return (
    <article
      className="flex h-full flex-col rounded-2xl bg-[#FFFBF7] p-4 shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-0.5 hover:shadow-md"
      data-testid={`activity-card-${activity.id}`}
    >
      <Link href={`/activities/${activity.id}`} className="flex-1">
        <h3 className="mb-2 text-base font-semibold text-slate-900">
          {activity.title}
        </h3>
        <div className="mb-2 flex flex-wrap gap-1.5 text-xs">
          <TagChip>{`${activity.minutes} 分钟`}</TagChip>
          <TagChip>{formatLocation(activity.location)}</TagChip>
          {primaryTheme && <TagChip>{primaryTheme}</TagChip>}
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-slate-600">
          今天学什么：{todayLearn}
        </p>
      </Link>
      <div className="mt-3 flex justify-end">
        <FavoriteButton activityId={activity.id} />
      </div>
    </article>
  );
}

