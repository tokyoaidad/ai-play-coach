"use client";

import { useMemo, useState } from "react";
import {
  ALL_ACTIVITIES,
  DEFAULT_FILTERS,
  filterActivities,
  type ActivityFilters,
} from "@/lib/activities";
import { ActivityCard } from "./ActivityCard";
import { FiltersBar } from "./FiltersBar";

export function ActivitiesPageClient() {
  const [filters, setFilters] = useState<ActivityFilters>(DEFAULT_FILTERS);

  const filtered = useMemo(
    () => filterActivities(ALL_ACTIVITIES, filters),
    [filters],
  );

  return (
    <div className="space-y-4">
      <div className="sticky top-14 z-10 -mx-4 bg-[#FFF8F1]/95 pb-2 pt-1 backdrop-blur">
        <div className="px-4">
          <FiltersBar value={filters} onChange={setFilters} />
        </div>
      </div>

      <p
        className="text-xs text-slate-600"
        data-testid="results-count"
      >
        共 {filtered.length} 个玩法
      </p>

      <div
        className="grid grid-cols-1 gap-3 md:grid-cols-2"
        data-testid="activities-grid"
      >
        {filtered.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

