/* eslint-disable react/jsx-no-useless-fragment */

import React from "react";
import { Button } from "@mantine/core";
import Link from "next/link";
import PropTypes from "prop-types";

// import { cn } from "@/lib/utils";
import { cn } from "../lib/utils";

export default function ButtonComponent({
  cls = "",
  link = "/",
  onClick = () => {},
  children,
  color = "primary",
  transparent = false,
  nested = false,
}) {
  return (
    <Button
      component={link ? Link : Button}
      href={link}
      color={color}
      className={cn(
        "transition-colors",
        cls,
        transparent
          ? "bg-transparent hover:bg-transparent hover:text-foreground/100"
          : ""
      )}
      onClick={onClick}
    >
      {nested ? (
        <div dangerouslySetInnerHTML={{ __html: nested }} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}

ButtonComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  cls: PropTypes.string,

  link: PropTypes.string,

  onClick: PropTypes.func,
  color: PropTypes.string,
  transparent: PropTypes.bool,

  nested: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  cls: "",

  link: "",

  onClick: () => {},
  color: "",
  transparent: false,

  nested: false,
};
