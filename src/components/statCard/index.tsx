import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

interface StatCardProps {
  name: string;
  statLogo: string;
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
    <Card className="p-6 w-full">
      <CardHeader className="flex flex-row justify-between p-0 mb-4">
        <p className="text-gray-600">{name}</p>
        <Image src={statLogo} alt="Sales" width={20} height={20} />
      </CardHeader>
      <CardTitle>
        <p className="text-xl font-normal">{price} </p>
      </CardTitle>
      <CardContent className="flex flex-row p-0 gap-1 ">
        <p className="text-green-600">{value} </p>
        <p className="text-gray-600"> Since last month</p>
      </CardContent>
    </Card>
  );
}
