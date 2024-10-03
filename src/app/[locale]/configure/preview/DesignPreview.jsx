"use client";

import React, { useState } from "react";
import { matchingModelsValue } from "../../../../config/products.js";
import Image from "next/image";

export default function DesignPreview(props) {
  const {
    croppedImageUrl,
    width,
    height,
    configId,
    color,
    model,
    material,
    finish,
    totalPrice,
  } = props.configuration;

  // console.log(model, matchingModelsValue[]);

  return (
    <>
      <div className="my-24">
        <div>
          <h2>You are only 1 step away !</h2>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <h2 className="font-recursive text-4xl font-bold">
              Your {matchingModelsValue[model]} Case
            </h2>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </>
  );
}
