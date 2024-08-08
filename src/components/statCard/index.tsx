import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatCardProps {
  name: string;
  statLogo: React.ReactNode;
  price: string;
  value: string;
}

export default function StatCard({
  name,
  statLogo,
  price,
  value,
}: StatCardProps) {
  return (
    <Card className="p-6 w-full" data-testid={`stat-card-${name}`}>
      <CardHeader className="flex flex-row justify-between items-end p-0 mb-4">
        <p className="text-gray-600" data-testid={`stat-card-${name}-name`}>
          {name}
        </p>
        {statLogo}
      </CardHeader>
      <CardTitle>
        <p
          className="text-xl font-normal"
          data-testid={`stat-card-${name}-price`}
        >
          {price}
        </p>
      </CardTitle>
      <CardContent className="flex flex-row p-0 gap-1">
        <p className="text-green-600" data-testid={`stat-card-${name}-value`}>
          {value}
        </p>
        <p className="text-gray-600">Since last month</p>
      </CardContent>
    </Card>
  );
}
