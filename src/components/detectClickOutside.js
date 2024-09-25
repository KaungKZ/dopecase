import React, { useEffect } from "react";

export default function detectClickOutside(ref, state = true, setState = null) {
  useEffect(() => {
    function handleClickOutside(event) {
      console.log("click");
      if (ref.current && !ref.current.contains(event.target)) {
        // setState((prev) => !prev);
        setState(true);
      } else {
        setState(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [ref, state]);
}
