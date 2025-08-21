export default function TrendingBadge({ trend }: { trend: number }) {
  const isPositive = trend >= 0;
  const sign = trend > 0 ? "+" : "";

  return (
    <div className="small-text-description w-full flex">
      Trending {isPositive ? "up" : "donw"} by {sign}{trend}% this month
    </div>
  );
}