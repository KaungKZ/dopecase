"use client";

import React, { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { cn, formatPrice } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  productStatusConvert,
  currency,
} from "../../../../lib/config/products";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function DesignUserOrders({ orders }) {
  const [data, _setData] = useState(() => [...orders]);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: () => "Order ID",
      cell: (info) => (
        <span className="text-primary font-semibold">{info.getValue()}</span>
      ),

      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => {
        return (
          <span className="text-sm">
            {productStatusConvert[info.getValue()]}
          </span>
        );
      },

      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("createdAt", {
      header: () => "Purchase Date",
      cell: (info) => (
        <span className="text-sm">
          {dayjs(info.getValue()).format("MMMM D, YYYY h:mm A")}
        </span>
      ),

      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("configuration", {
      header: () => "Details",
      cell: (info) => {
        console.log(info.row.original);
        return (
          <ul className="list-none">
            <li className="text-sm">
              - {info.row.original.configuration.color}
            </li>
            <li className="text-sm">
              - {info.row.original.configuration.finish}
            </li>
            <li className="text-sm">
              - {info.row.original.configuration.material}
            </li>
            <li className="text-sm">
              - {info.row.original.configuration.model}
            </li>
          </ul>
        );
      },

      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("totalPrice", {
      header: "Amount",
      cell: (info) => (
        <span className="text-sm font-medium">
          {currency}
          {info.getValue()}
        </span>
      ),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  return (
    <div>
      <div className="w-full mt-10">
        <h2 className="text-2xl mb-10 font-bold text-zinc-700">Your Orders</h2>
        <div className="overflow-x-auto">
          <table className=" w-full text-left whitespace-nowrap">
            <thead className="bg-[#39ad5d]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="font-semibold font-opensans text-sm text-white px-3.5 py-2"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`
                ${i % 2 === 0 ? "" : "bg-gray-100"}
                `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3.5 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="text-center h-32">
                  <td colSpan={12} className="font-recursive">
                    You haven't made any orders yet !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex items-center justify-end mt-8 gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {">"}
          </button>

          <span className="flex items-center gap-1 text-sm">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 text-sm">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent text-sm"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
