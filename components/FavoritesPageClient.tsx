"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ALL_ACTIVITIES } from "@/lib/activities";
import { useFavorites } from "@/lib/favorites";
import { ActivityCard } from "./ActivityCard";

export function FavoritesPageClient() {
  const { favorites, clearFavorites } = useFavorites();

  const favoriteActivities = useMemo(
    () => ALL_ACTIVITIES.filter((activity) =>
      favorites.includes(activity.id),
    ),
    [favorites],
  );

  const hasFavorites = favoriteActivities.length > 0;

  return (
    <div
      className="space-y-4"
      data-testid="favorites-page"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold text-slate-900">
          我的收藏
        </h1>
        {hasFavorites && (
          <button
            type="button"
            onClick={clearFavorites}
            data-testid="clear-favorites"
            aria-label="清空所有已收藏玩法"
            className="text-xs font-medium text-orange-700 underline-offset-2 hover:underline"
          >
            清空收藏
          </button>
        )}
      </div>

      {!hasFavorites ? (
        <div
          className="rounded-2xl bg-[#FFF9F3] p-4 text-sm text-slate-700 shadow-sm ring-1 ring-orange-100"
          data-testid="favorites-empty"
        >
          <p className="mb-2">还没有收藏玩法，可以先去逛逛活动库。</p>
          <Link
            href="/activities"
            className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-orange-600"
          >
            去活动库看看
          </Link>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
          data-testid="favorites-grid"
        >
          {favoriteActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}

