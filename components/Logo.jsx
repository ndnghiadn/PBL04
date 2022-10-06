import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ width = 500, height = 200 }) => {
  return (
    <Link href="/">
      <Image
        style={{ cursor: "pointer" }}
        src="/images/Logo.png"
        width={width}
        height={height}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
