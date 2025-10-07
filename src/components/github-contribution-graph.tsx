import React, { useEffect, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 for different contribution levels
}

interface GitHubContributionGraphProps {
  className?: string;
}

interface GitHubApiResponse {
  totalContributions: number;
  weeks: ContributionDay[][];
}

export default function GitHubContributionGraph({
  className = ""
}: GitHubContributionGraphProps) {
  const [contributions, setContributions] = useState<number>(0);
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const username = "EClinick";

        // Fetch from GitHub's public contribution API (using the SVG endpoint)
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);

        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();

        // Transform the data to match our component format
        // Get total contributions by getting data.total.lastYear
        const totalContributions = data.total.lastYear;
        const transformedWeeks: ContributionDay[][] = [];
        const contributions = data.contributions;

        // Group contributions by week
        let currentWeek: ContributionDay[] = [];
        contributions.forEach((contribution: any, index: number) => {
          const date = new Date(contribution.date);
          const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

          const count = contribution.count;
          const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;

          currentWeek.push({
            date: contribution.date,
            count,
            level
          });

          // When we hit Saturday or it's the last item, push the week
          if (dayOfWeek === 6 || index === contributions.length - 1) {
            if (currentWeek.length > 0) {
              transformedWeeks.push([...currentWeek]);
              currentWeek = [];
            }
          }
        });

        setContributions(totalContributions);
        setWeeks(transformedWeeks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  // Generate month labels based on actual contribution dates
  const getMonthLabels = () => {
    if (weeks.length === 0) return [];

    const labels: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const date = new Date(week[0].date);
        const month = date.getMonth();

        if (month !== lastMonth) {
          labels.push({
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            weekIndex
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();
  const days = ['Mon', 'Wed', 'Fri'];

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 0: return 'bg-zinc-900';
      case 1: return 'bg-green-900/40';
      case 2: return 'bg-green-700/60';
      case 3: return 'bg-green-600/80';
      case 4: return 'bg-green-500';
      default: return 'bg-zinc-900';
    }
  };

  if (loading) {
    return (
      <div className={`rounded-2xl p-6 shadow-2xl border border-gray-800 relative backdrop-blur-sm ${className}`}>
        <div className="flex items-center justify-center h-[200px]">
          <div className="text-gray-400">Loading contributions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-2xl p-6 shadow-2xl border border-gray-800 relative backdrop-blur-sm ${className}`}>
        <div className="flex items-center justify-center h-[200px]">
          <div className="text-gray-400">Unable to load GitHub contributions</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 shadow-2xl border border-gray-800 relative backdrop-blur-sm ${className}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-light text-white">
            <span className="font-semibold">{contributions.toLocaleString()}</span> contributions in the last year
          </h3>
        </div>

        <div className="relative overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Month labels */}
            <div className="mb-2 pl-8 relative h-4">
              {monthLabels.map(({ month, weekIndex }) => (
                <div
                  key={`${month}-${weekIndex}`}
                  className="text-xs text-gray-400 absolute"
                  style={{ left: `${weekIndex * 16}px` }}
                >
                  {month}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col justify-between pr-2 text-xs text-gray-400 h-[105px]">
                {days.map((day) => (
                  <div key={day} className="h-[13px] flex items-center">{day}</div>
                ))}
              </div>

              {/* Contribution grid */}
              <div className="flex gap-[3px]">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-[13px] h-[13px] rounded-sm ${getLevelColor(day.level)} hover:ring-1 hover:ring-white/50 transition-all cursor-pointer`}
                        title={`${day.count} contributions on ${day.date}`}
                        onClick={() => {
                          const formattedDate = day.date;
                          window.open(`https://github.com/EClinick?tab=overview&from=${formattedDate}&to=${formattedDate}`, '_blank');
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-[13px] h-[13px] rounded-sm ${getLevelColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}