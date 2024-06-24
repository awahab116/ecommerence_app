import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderTable from "@/components/orderTable";
import ProductTable from "@/components/productTable";

export default function AdminTable() {
  return (
    <div className="bg-white rounded-lg mt-4 p-2">
      <Tabs defaultValue="orders" className="flex flex-col justify-center">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <OrderTable />
        </TabsContent>
        <TabsContent value="products">
          <ProductTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
