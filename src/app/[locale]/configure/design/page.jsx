import React from "react";

export default function page(props) {
  const { id } = props.searchParams;

  //   console.log(props);
  return <div>{id}</div>;
}
