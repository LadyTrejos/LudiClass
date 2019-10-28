import React, { Component } from "react";
import Link from "next/link";

export default class NavBar extends Component {
  state = {
    listItems: [
      {
        href: "/"
      }
    ]
  };
  render() {
    const { listItems } = this.state;
    return <nav></nav>;
  }
}
