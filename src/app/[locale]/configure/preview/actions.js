"use server";

import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/authOption";
import { stripeconfig } from "../../../../lib/stripeconfig";

export default async function handleCheckout({ configId }) {
  const data = await getServerSession(authOption);

  const configuration = await db.imageConfiguration.findUnique({
    where: {
      id: configId,
    },
  });
  // console.log(configuration, data);

  if (!data) {
    throw new Error("You need to be logged in");
  }

  let order = undefined;

  const existing_order = await db.order.findFirst({
    where: {
      userId: data.user.id,
      configurationId: configuration.id,
    },
  });

  if (existing_order) {
    order = existing_order;
  } else {
    order = await db.order.create({
      data: {
        configurationId: configuration.id,
        userId: data.user.id,
        totalPrice: configuration.totalPrice,
      },
    });
  }

  // console.log(
  //   "okokok",
  //   Math.round(configuration.totalPrice.toFixed(2) * 100),
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}thank-you?orderID=${order.id}`
  // );

  const product = await stripeconfig.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: Math.round(configuration.totalPrice.toFixed(2) * 100),
    },
  });

  const stripeSession = await stripeconfig.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}thank-you?orderID=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["SG", "MM"],
    },
    metadata: {
      userId: data.user.id,
      orderId: order.id,
    },
    line_items: [
      {
        price: product.default_price,
        quantity: 1,
      },
    ],
  });

  return { url: stripeSession.url };

  // await db.order.create({
  //   data: {
  //     configurationId: configuration.id,
  //     userId: data.id,
  //     totalPrice: configuration.totalPrice
  //   },
  // });
}
