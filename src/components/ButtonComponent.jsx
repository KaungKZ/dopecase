/* eslint-disable react/jsx-no-useless-fragment */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mantine/core";
import Link from "next/link";
// import PropTypes from "prop-types";

// import { cn } from "@/lib/utils";
import { cn } from "../lib/utils";

export default function ButtonComponent({
  cls = "",
  link = "",
  onClick = () => {},
  children,
  color = "primary",
  transparent = false,
  nested = false,
  type = "button",
  isLoading,
  isDisabled,
}) {
  const [btnWidth, setBtnWidth] = useState();
  const buttonRef = useRef(null);

  useEffect(() => {
    // if (isLoading) {
    setBtnWidth(buttonRef.current.clientWidth);
    // }
  }, []);

  // console.log("rendered");

  return (
    <Button
      component={link ? Link : Button}
      href={link}
      ref={buttonRef}
      color={color}
      disabled={isDisabled}
      type={type}
      style={{
        minWidth: isLoading ? `${btnWidth}px` : "unset",
      }}
      className={cn(
        "transition-colors",
        // `${isLoading ? `min-w-[${btnWidth}px]` : ""} `,
        cls,
        {
          "pointer-events-none": isLoading,
        },
        {
          "bg-transparent hover:bg-transparent hover:text-foreground/100":
            transparent,
        },
        {
          "": isDisabled,
        }
      )}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <span className="ml-1.5 flex items-center gap-1 w-full">
            <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block" />
            <span className="animate-flashing delay-100 w-1 h-1 bg-white rounded-full inline-block" />
            <span className="animate-flashing delay-200 w-1 h-1 bg-white rounded-full inline-block" />
          </span>
        </>
      ) : nested ? (
        <div dangerouslySetInnerHTML={{ __html: nested }} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}

// ButtonComponent.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   cls: PropTypes.string,

//   link: PropTypes.string,

//   onClick: PropTypes.func,
//   color: PropTypes.string,
//   transparent: PropTypes.bool,
//   type: PropTypes.string,

//   nested: PropTypes.bool,
// };

// ButtonComponent.defaultProps = {
//   cls: "",

//   link: "",

//   onClick: () => {},
//   color: "primary",
//   transparent: false,
//   type: "button",

//   nested: false,
// };
