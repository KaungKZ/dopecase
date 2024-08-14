import React from "react";
import PropTypes from "prop-types";

import { cn } from "../lib/utils";

export default function MaxWidthWrapper({ children, cls = "" }) {
  return (
    <div className={cn("max-w-[1280px] mx-auto px-20 smmx:px-4", cls)}>
      {children}
    </div>
  );
}

MaxWidthWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  cls: PropTypes.string,
};

MaxWidthWrapper.defaultProps = {
  cls: "",
};
