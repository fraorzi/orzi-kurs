"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useIsPresent,
  usePresenceData,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  ROUTE_EASE,
  routeDirection,
  type RouteDirection,
} from "@/app/lib/route-motion";
import styles from "./shell.module.css";

const ROUTE_VARIANTS: Variants = {
  enter: (direction: RouteDirection) => ({
    opacity: 0.94,
    scale: 0.998,
    x: direction * 20,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.24, ease: ROUTE_EASE },
    x: 0,
  },
  exit: (direction: RouteDirection) => ({
    opacity: 0.72,
    scale: 1.001,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
    x: direction * -10,
  }),
};

const REDUCED_ROUTE_VARIANTS: Variants = {
  enter: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 1, transition: { duration: 0 } },
};

function RouteFrame({
  children,
  direction,
  reducedMotion,
}: {
  children: React.ReactNode;
  direction: RouteDirection;
  reducedMotion: boolean;
}) {
  const isPresent = useIsPresent();
  const presenceDirection = usePresenceData() as RouteDirection | undefined;

  return (
    <motion.div
      className={styles.routeFrame}
      custom={presenceDirection ?? direction}
      data-presence={isPresent ? "present" : "exiting"}
      initial="enter"
      animate="visible"
      exit="exit"
      variants={reducedMotion ? REDUCED_ROUTE_VARIANTS : ROUTE_VARIANTS}
      aria-hidden={isPresent ? undefined : true}
      inert={isPresent ? undefined : true}
    >
      {children}
    </motion.div>
  );
}

export default function RouteTransition({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const reducedMotion = useReducedMotion();
  const focusPathname = useRef(pathname);
  const [route, setRoute] = useState({ direction: 0 as RouteDirection, pathname });
  if (route.pathname !== pathname) {
    setRoute({
      direction: routeDirection(route.pathname, pathname),
      pathname,
    });
  }

  useEffect(() => {
    if (focusPathname.current === pathname) return;
    focusPathname.current = pathname;
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="course-route">
        <div className={styles.routeStage}>
          <AnimatePresence initial={false} mode="sync" custom={route.direction}>
            <RouteFrame
              key={pathname}
              direction={route.direction}
              reducedMotion={Boolean(reducedMotion)}
            >
              {children}
            </RouteFrame>
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
