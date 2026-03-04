"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFavorites } from "@/lib/favorites";

interface FavoriteButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> {
  activityId: string;
  testId?: string;
}

export function FavoriteButton({
  activityId,
  testId,
  className,
  ...rest
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(activityId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(activityId)}
      aria-label={active ? "取消收藏该玩法" : "收藏该玩法"}
      data-testid={testId ?? `favorite-btn-${activityId}`}
      className={`inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-2.5 py-1 text-xs font-medium text-orange-600 shadow-sm transition hover:bg-orange-50 hover:text-orange-700 aria-pressed:bg-orange-100 ${
        active ? "bg-orange-100 text-orange-700" : ""
      } ${className ?? ""}`}
      aria-pressed={active}
      {...rest}
    >
      <span aria-hidden="true" className="mr-1">
        {active ? "♥" : "♡"}
      </span>
      <span>{active ? "已收藏" : "收藏"}</span>
    </button>
  );
}

