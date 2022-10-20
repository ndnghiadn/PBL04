import React, { useEffect, useState } from "react";


const useWindowFocus = ({ warning, setWarning }) => {
  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setWarning(warning += 1);
  };
  useEffect(() => {
    window.addEventListener("blur", onBlur);
    // Clean up
    return () => {
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return <></>;
};

export default useWindowFocus;
