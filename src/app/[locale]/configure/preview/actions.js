"use server";

import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOption } from "../../api/auth/[...nextauth]/route";

export default async function handleCheckout({ configId }) {
  const data = await getServerSession(authOption);

  const configuration = await db.imageConfiguration.findUnique({
    where: {
      id: configId,
    },
  });
  console.log(configuration);

  if (!data) {
    throw new Error("You need to log inn");
  }

  // await db.order.create({
  //   data: {
  //     configurationId: configuration.id,
  //     userId: data.id,
  //     totalPrice: configuration.totalPrice
  //   },
  // });
}
