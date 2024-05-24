import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

const useInfinityScroll = () => {
  const [pageSize, setPageSize] = useState(5); // perPage
  const mainRef = useRef(null); // scroller ref

  // initializing main scroller
  const observe = useCallback(() => {
    const observer = new IntersectionObserver((items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          // console.log(pageSize);
          // calls a function called load more
          setPageSize((previousPageSize) => previousPageSize + 10);
        }
      });
    });

    // watching the main reference object
    observer.observe(mainRef.current);
  }, [mainRef, pageSize]);

  useEffect(() => {
    observe();
    //console.log(mainRef.current);
    //console.log("effect");
  }, []);

  const Provider = ({ children }) => (
    <>
      <div
        style={{
          overflowX: "scroll",
          height: "400px",
          width: "100%",
        }}
      >
        {children}

        <div
          style={{ padding: "", backgroundColor: "red" }}
          ref={mainRef}
        ></div>
      </div>
    </>
  );

  return {
    Provider,
  };
};

export default useInfinityScroll;
