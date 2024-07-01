"use client";
import React, { useState, useEffect } from "react";
import {
  useGetProductQuery,
  useSearchProductQuery,
} from "@/provider/redux/query";
import {
  Table,
  TableHead,
  TableHeader,
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";
import Image from "next/image";
import ProductDropdownMenu from "@/components/dropDownMenu";
import Paginator from "@/components/paginator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsiveDialog";
import AddProductForm from "../productAddForm";
import { ProductInfo } from "@/interfaces/product.interface";

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([] as ProductInfo[]);

  const { data, error, isLoading, refetch } = useGetProductQuery({
    page,
    limit,
  });
  const { data: searchData, refetch: refetchSearch } = useSearchProductQuery({
    search,
    page,
    limit,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        await refetchSearch();
      } else {
        await refetch();
      }
    };
    fetchData();
  }, [search, page, refetch, refetchSearch]);

  useEffect(() => {
    console.log(" data search", data, searchData, limit, search);
    const productsData = search ? searchData : data;
    if (productsData) {
      setTotalPages(Math.ceil(productsData.totalProducts / limit));
    }
  }, [data, searchData, limit, search]);

  useEffect(() => {
    console.log("SettotalPages", totalPages, page);
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages]);

  useEffect(() => {
    if (search) {
      setProducts(searchData?.products || []);
    } else {
      setProducts(data?.products || []);
    }
  }, [data, searchData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error in getting products</p>;

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isHeightFull={false}
        title="Add Product"
      >
        <AddProductForm setIsOpen={setIsOpen} refetchProducts={refetch} />
      </ResponsiveDialog>
      <div className="flex items-center justify-between">
        <Input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/4 p-2 border border-gray-300 rounded-lg"
        />
        <Button
          className="w-[100px] bg-gray-500 text-white rounded-lg p-2"
          onClick={() => setIsOpen(true)}
        >
          Add Product
        </Button>
      </div>
      <Table className="w-full">
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={60}
                      height={30}
                    />
                    <p>{product.title}</p>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <ProductDropdownMenu
                    product={product}
                    refetchProducts={search ? refetchSearch : refetch}
                  />
                </TableCell>
              </TableRow>
            ))}
          <TableRow className="bg-transparent hover:bg-transparent w-full ">
            <TableCell colSpan={5} className="text-right">
              <Paginator
                currentPage={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
