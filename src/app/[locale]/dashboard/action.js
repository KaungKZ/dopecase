"use server";

import React from "react";
import { db } from "@/db";

export default async function changeOrderStatus({ status, orderId }) {
  console.log(status);
  await db.order.update({
    where: {
      id: orderId,
    },

    data: { status },
  });
}
