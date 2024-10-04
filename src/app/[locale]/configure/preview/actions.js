"use server";

import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOption } from "../../api/auth/[...nextauth]/route";

export default async function handleCheckout({ configId }) {
  const data = await getServerSession(authOption);

  console.log(data);
  const configuration = await db.imageConfiguration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) {
  }
}
