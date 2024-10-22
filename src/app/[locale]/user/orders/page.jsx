import React from "react";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/authOption";
import DesignUserOrders from "./DesignUserOrders";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function Page() {
  const data = await getServerSession(authOption);

  const orders = await db.order.findMany({
    where: {
      userId: data.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  console.log(orders);
  return (
    <section>
      <MaxWidthWrapper>
        <div className="my-10">
          <DesignUserOrders orders={orders} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
