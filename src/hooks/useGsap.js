"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function useGsap(animation, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(animation);
    return () => ctx.revert();
  }, deps);
}
