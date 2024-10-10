"use server";

import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/authOption";
import { db } from "@/db";

export default async function getPaymentStatus({ orderId }) {
  const data = await getServerSession(authOption);
  let err = {};

  if (!data || !data.user.email) {
    err.unauthorize = true;

    return err;
    // throw new Error("You need to be logged in");
  }

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: data.user.id,
    },
    include: {
      shippingAddress: true,
      billingAddress: true,
      configuration: true,
      user: true,
    },
  });

  if (!order) {
    err.notExist = true;

    //  (notExist = true);
    return err;
    // throw new Error("This order does not exist");
  }

  // console.log(order);

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
}
