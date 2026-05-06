"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, as: Tag = "div", className = "" }: { children: React.ReactNode; as?: any; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const Comp: any = Tag;
  return (
    <Comp ref={ref} className={`reveal${shown ? " in" : ""} ${className}`.trim()}>
      {children}
    </Comp>
  );
}
