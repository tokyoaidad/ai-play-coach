import Link from "next/link";
import { ALL_ACTIVITIES } from "@/lib/activities";
import type { Activity } from "@/lib/types";
import { FavoriteButton } from "@/components/FavoriteButton";
import { TagChip } from "@/components/TagChip";

interface ActivityDetailPageProps {
  params: {
    id: string;
  };
}

function formatLocation(location: Activity["location"]): string {
  if (location === "indoor") return "室内";
  if (location === "outdoor") return "户外";
  return "室内/户外都可";
}

export default function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const activity = ALL_ACTIVITIES.find(
    (item) => item.id === params.id,
  );

  if (!activity) {
    return (
      <div className="space-y-3" data-testid="not-found">
        <p className="text-sm text-slate-700">
          没有找到这个玩法，也许它还在路上。
        </p>
        <Link
          href="/activities"
          data-testid="back-to-activities"
          className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-orange-600"
        >
          返回活动库
        </Link>
      </div>
    );
  }

  return (
    <article
      className="space-y-4"
      data-testid="activity-detail"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href="/activities"
            data-testid="back-to-activities"
            className="mb-2 inline-flex items-center text-xs text-orange-700 underline-offset-2 hover:underline"
          >
            ← 返回活动库
          </Link>
          <h1
            className="text-lg font-semibold text-slate-900"
            data-testid="detail-title"
          >
            {activity.title}
          </h1>
          <div
            className="mt-2 flex flex-wrap gap-1.5"
            data-testid="detail-meta-chips"
          >
            <TagChip>{`${activity.minutes} 分钟`}</TagChip>
            <TagChip>{formatLocation(activity.location)}</TagChip>
            {activity.age_range && (
              <TagChip>{`${activity.age_range} 岁`}</TagChip>
            )}
            {activity.themes.map((theme) => (
              <TagChip key={theme}>{theme}</TagChip>
            ))}
          </div>
        </div>
        <FavoriteButton
          activityId={activity.id}
          testId="detail-favorite-btn"
          className="shrink-0"
        />
      </div>

      <section data-testid="detail-ai-concepts">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">
          这次在玩什么样的「AI 直觉」？
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {activity.ai_concepts.map((concept) => (
            <li key={concept}>{concept}</li>
          ))}
        </ul>
      </section>

      <section data-testid="detail-materials">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">
          需要准备
        </h2>
        {activity.materials.length ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            {activity.materials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-700">
            不需要额外材料，只需要你和孩子。
          </p>
        )}
      </section>

      <section data-testid="detail-steps">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">
          怎么玩（步骤建议）
        </h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {activity.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section data-testid="detail-adult-script">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">
          家长可以直接照读的小句子
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {activity.adult_script.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      {activity.variations && (
        <section data-testid="detail-variations">
          <h2 className="mb-1 text-sm font-semibold text-slate-900">
            可以这样变一变
          </h2>
          <div className="space-y-1.5 text-sm text-slate-700">
            {activity.variations.easier && (
              <div>
                <p className="font-medium text-slate-800">更简单一点：</p>
                <ul className="list-disc space-y-1 pl-5">
                  {activity.variations.easier.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {activity.variations.harder && (
              <div>
                <p className="font-medium text-slate-800">更有挑战：</p>
                <ul className="list-disc space-y-1 pl-5">
                  {activity.variations.harder.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {activity.variations.outdoor && (
              <div>
                <p className="font-medium text-slate-800">户外版本：</p>
                <ul className="list-disc space-y-1 pl-5">
                  {activity.variations.outdoor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section data-testid="detail-safety">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">
          安全小提醒
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {activity.safety.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

