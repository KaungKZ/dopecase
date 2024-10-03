"use server";

import React from "react";
import { db } from "@/db";

export default async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
  totalPrice,
}) {
  await db.imageConfiguration.update({
    where: {
      id: configId,
    },

    data: { color, finish, material, model, totalPrice },
  });
}
