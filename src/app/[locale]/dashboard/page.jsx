import React from "react";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/authOption";
import DesignDashboard from "../../../components/DesignDashboard";

export default async function page() {
  const user = getServerSession(authOption);

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      totalPrice: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      totalPrice: true,
    },
  });

  return (
    <section>
      <MaxWidthWrapper>
        <div className="my-10">
          <DesignDashboard
            orders={orders}
            lastWeekSum={lastWeekSum}
            lastMonthSum={lastMonthSum}
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
