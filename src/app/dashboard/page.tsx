import React from "react";
import AdminOverview from "@/components/adminOverview";
import AdminTable from "@/components/adminTable";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome to the dashboard</p>

      <AdminOverview />
      <div className="w-full">
        <AdminTable />
      </div>
    </div>
  );
}
