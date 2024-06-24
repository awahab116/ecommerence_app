import React from "react";
import StatCard from "../statCard";

export default function AdminOverview() {
  return (
    <div className="flex flex-row gap-2">
      <StatCard
        name="STATS"
        statLogo="product.svg"
        price="$ 1,000"
        value="+30$"
      />
      <StatCard name="Orders" statLogo="product.svg" price="234" value="+42" />
      <StatCard name="Products" statLogo="product.svg" price="57" value="+5" />
      <StatCard name="Users" statLogo="product.svg" price="3" value="+1" />
    </div>
  );
}
