"use client";

import React, { useState, useReducer, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Progress,
  Select,
} from "@mantine/core";
import { cn, formatPrice } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import changeOrderStatus from "../app/[locale]/dashboard/action";
import { productStatusConvert, currency } from "../lib/config/products";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

// const defaultData = [
//   {
//     firstName: "tanner",
//     lastName: "linsley",
//     age: 24,
//     visits: 100,
//     status: "In Relationship",
//     progress: 50,
//   },
// ];

export default function DesignDashboard({ orders, lastWeekSum, lastMonthSum }) {
  // const [lastweekProgress, setLastweekProgress] = useState(0);
  const [data, setData] = useState(() => [...orders]);
  // const rerender = useReducer(() => ({}), {})[1];
  const router = useRouter();

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  // const currentStatus =

  // console.log(orders);
  // console.log(orders[0]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      // console.log("success");
      // setData([...orders]);
      // rerender();
      router.refresh();
    },
  });

  useEffect(() => {
    setData([...orders]);
  }, [orders]);

  const optionsFilter = ({ options, search, limit }) => {
    // console.log(options, search, limit);
    // let result = options.filter(
    //   (o1) => !orders.some((o2) => o1.value === o2.status)
    // );

    // console.log(result);
    // options.forEach((o) => {
    // if (orders.find((o) => o.status).status === o.value) {
    //   console.log(o);
    // }
    // });

    // const filtered = (options).filter((option) =>
    //   option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    // );
    // const splittedSearch = search.toLowerCase().trim().split(' ');
    return options;
  };

  const columnHelper = createColumnHelper();

  // console.log(orders);

  const columns = useMemo(
    () => [
      columnHelper.accessor("user", {
        header: () => "Customer",
        cell: (info) => {
          return (
            <>
              <span className="block font-recursive font-semibold text-zinc-700">
                {info.row.original.user.name}
              </span>
              <span
                className={cn("block font-recursive text-sm text-gray-500", {
                  "text-zinc-700 font-semibold": !info.row.original.user.name,
                })}
              >
                {info.row.original.user.email}
              </span>
            </>
          );
        },

        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => {
          let allProductStatus = [
            {
              value: "Awaiting Shipment",
            },
            {
              value: "Fulfilled",
            },
            {
              value: "Shipped",
            },
          ];
          if (info.row.original.status === "awaiting_shipment") {
            allProductStatus[0].disabled = true;
          }
          if (info.row.original.status === "shipped") {
            allProductStatus[2].disabled = true;
          }
          if (info.row.original.status === "fulfilled") {
            allProductStatus[1].disabled = true;
          }

          return (
            <div>
              <Select
                id="model"
                withCheckIcon={false}
                className="disabled-defaultvalue-select"
                defaultValue={productStatusConvert[info.getValue()]}
                value={productStatusConvert[info.getValue()]}
                onChange={(_value) => {
                  mutate({
                    status: _value.toLowerCase().replace(/\s/gi, "_"),
                    orderId: info.row.original.id,
                  });
                }}
                filter={optionsFilter}
                data={allProductStatus}
                // {...formik.getFieldProps("model")}
              />
            </div>
          );
        },

        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("createdAt", {
        header: () => "Purchase Date",
        cell: (info) => (
          <span className="font-recursive text-sm">
            {dayjs(info.getValue()).format("MMMM D, YYYY h:mm A")}
          </span>
        ),

        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("totalPrice", {
        header: "Amount",
        cell: (info) => (
          <span className="font-recursive font-medium text-base">
            {currency}
            {info.getValue()}
          </span>
        ),
        footer: (info) => info.column.id,
      }),
    ],
    []
  );

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

  // console.log(orders);

  return (
    <>
      <div className="flex space-x-5">
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
          className="flex-1"
        >
          {/* <Card.Section></Card.Section> */}
          <Group className="flex flex-col items-start gap-2">
            <span className="font-recursive text-sm text-zinc-600">
              Last week
            </span>
            {/* <Badge color="pink">On Sale</Badge> */}
            <span className="font-recursive font-semibold text-3xl text-primary">
              {formatPrice(lastWeekSum._sum.totalPrice ?? 0)}
            </span>
            <span className="font-recursive text-sm text-zinc-600 font-medium">
              of {formatPrice(WEEKLY_GOAL)} goal
            </span>
            <Progress
              value={((lastWeekSum._sum.totalPrice ?? 0) * 100) / WEEKLY_GOAL}
              className="w-full h-2 mt-3 bg-gray-300"
              color="#00a34a"
              // transitionDuration={200}
            />
          </Group>
          {/* <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button> */}
        </Card>
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
          className="flex-1"
        >
          {/* <Card.Section></Card.Section> */}
          <Group className="flex flex-col items-start gap-2">
            <span className="font-recursive text-sm text-zinc-600">
              Last month
            </span>
            {/* <Badge color="pink">On Sale</Badge> */}
            <span className="font-recursive font-semibold text-3xl text-primary">
              {formatPrice(lastMonthSum._sum.totalPrice ?? 0)}
            </span>
            <span className="font-recursive text-sm text-zinc-600 font-medium">
              of {formatPrice(MONTHLY_GOAL)} goal
            </span>
            <Progress
              value={((lastMonthSum._sum.totalPrice ?? 0) * 100) / MONTHLY_GOAL}
              className="w-full h-2 mt-3 bg-gray-300"
              color="#00a34a"
              // transitionDuration={200}
            />
          </Group>
          {/* <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button> */}
        </Card>
      </div>
      <div className="w-full mt-10">
        <h2 className="text-2xl mb-10 font-bold text-zinc-700">
          Incoming Orders
        </h2>
        <table className=" w-full text-left">
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
                <td colSpan={12}>No record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
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
    </>
  );
}
