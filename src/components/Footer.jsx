import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ButtonComponent from "./ButtonComponent";

export default function Footer() {
  return (
    <div className="border-t border-gray-200 bg-white py-7 smmx:py-4">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center smmx:flex-col-reverse smmx:space-y-reverse smmx:space-y-3">
          <span className="text-muted-foreground text-sm">
            &#169; 2024 All rights reserved
          </span>
          <div className="flex space-x-4">
            <ButtonComponent
              link="/en"
              transparent
              cls="text-sm font-medium text-muted-foreground hover:text-gray-600 px-2"
            >
              Terms
            </ButtonComponent>
            <ButtonComponent
              link="/en"
              transparent
              cls="text-sm font-medium text-muted-foreground hover:text-gray-600 px-2"
            >
              Privacy Policy
            </ButtonComponent>
            <ButtonComponent
              link="/en"
              transparent
              cls="text-sm font-medium text-muted-foreground hover:text-gray-600 px-2"
            >
              Cookie Policy
            </ButtonComponent>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
