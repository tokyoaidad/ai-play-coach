"use client";

import type { ActivityFilters } from "@/lib/activities";
import {
  LOCATION_OPTIONS,
  MINUTE_OPTIONS,
  THEME_OPTIONS,
  DEFAULT_FILTERS,
} from "@/lib/activities";

interface FiltersBarProps {
  value: ActivityFilters;
  onChange: (next: ActivityFilters) => void;
  compact?: boolean;
}

export function FiltersBar({
  value,
  onChange,
  compact = false,
}: FiltersBarProps) {
  const handleToggleMinutes = (minutes: number) => {
    const exists = value.minutes.includes(minutes);
    const nextMinutes = exists
      ? value.minutes.filter((m) => m !== minutes)
      : [...value.minutes, minutes];
    onChange({ ...value, minutes: nextMinutes });
  };

  const handleToggleLocation = (location: (typeof LOCATION_OPTIONS)[number]) => {
    const exists = value.locations.includes(location);
    const nextLocations = exists
      ? value.locations.filter((loc) => loc !== location)
      : [...value.locations, location];
    onChange({ ...value, locations: nextLocations });
  };

  const handleToggleTheme = (theme: (typeof THEME_OPTIONS)[number]) => {
    const exists = value.themes.includes(theme);
    const nextThemes = exists
      ? value.themes.filter((t) => t !== theme)
      : [...value.themes, theme];
    onChange({ ...value, themes: nextThemes });
  };

  const handleClear = () => {
    onChange({ ...DEFAULT_FILTERS, query: "" });
  };

  return (
    <section
      className="rounded-2xl bg-[#FFF9F3] p-3 shadow-sm ring-1 ring-orange-100"
      data-testid={compact ? "quick-filters" : "filters-bar"}
    >
      {!compact && (
        <div className="mb-3">
          <label
            htmlFor="search-input"
            className="mb-1 block text-xs font-medium text-slate-600"
          >
            搜索玩法
          </label>
          <input
            id="search-input"
            data-testid="search-input"
            type="search"
            value={value.query}
            onChange={(e) =>
              onChange({ ...value, query: e.target.value })
            }
            placeholder="按标题、步骤、材料等搜索…"
            className="w-full rounded-xl border border-orange-100 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 text-xs">
        <FilterRow
          label="时长"
          testId="filter-minutes"
          chips={MINUTE_OPTIONS.map((m) => ({
            key: m.toString(),
            label: `${m} 分钟`,
            selected: value.minutes.includes(m),
            onClick: () => handleToggleMinutes(m),
          }))}
        />
        <FilterRow
          label="场景"
          testId="filter-locations"
          chips={LOCATION_OPTIONS.map((loc) => ({
            key: loc,
            label:
              loc === "indoor"
                ? "室内"
                : loc === "outdoor"
                  ? "户外"
                  : "都可以",
            selected: value.locations.includes(loc),
            onClick: () => handleToggleLocation(loc),
          }))}
        />
        <FilterRow
          label="主题（AI 直觉）"
          testId="filter-themes"
          chips={THEME_OPTIONS.map((theme) => ({
            key: theme,
            label: theme,
            selected: value.themes.includes(theme),
            onClick: () => handleToggleTheme(theme),
          }))}
        />
      </div>

      {!compact && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleClear}
            data-testid="clear-filters"
            aria-label="清空筛选条件"
            className="text-xs font-medium text-orange-700 underline-offset-2 hover:underline"
          >
            清空筛选
          </button>
        </div>
      )}
    </section>
  );
}

interface FilterRowProps {
  label: string;
  testId: string;
  chips: Array<{
    key: string;
    label: string;
    selected: boolean;
    onClick: () => void;
  }>;
}

function FilterRow({ label, testId, chips }: FilterRowProps) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium text-slate-600">
        {label}
      </p>
      <div
        className="-mx-1 flex gap-1 overflow-x-auto pb-1"
        data-testid={testId}
      >
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={chip.onClick}
            className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] transition ${
              chip.selected
                ? "border-orange-400 bg-orange-100 text-orange-800"
                : "border-orange-100 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}

