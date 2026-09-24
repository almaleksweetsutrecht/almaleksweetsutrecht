import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

type LuxuryImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  depth?: number;
  eager?: boolean;
};

type LuxuryStyle = CSSProperties & {
  "--tilt-x": string;
  "--tilt-y": string;
  "--parallax-y": string;
  "--halo-x": string;
  "--halo-y": string;
};

export function LuxuryImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  depth = 0.08,
  eager = false,
}: LuxuryImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const updateParallax = () => {
      animationRef.current = null;
      const bounds = frame.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = bounds.top + bounds.height / 2;
      const offset = Math.max(-22, Math.min(22, (viewportCenter - elementCenter) * depth));
      frame.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (animationRef.current === null) {
        animationRef.current = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    };
  }, [depth]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const frame = frameRef.current;
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    frame.style.setProperty("--tilt-x", `${((0.5 - y) * 8).toFixed(2)}deg`);
    frame.style.setProperty("--tilt-y", `${((x - 0.5) * 10).toFixed(2)}deg`);
    frame.style.setProperty("--halo-x", `${(x * 100).toFixed(1)}%`);
    frame.style.setProperty("--halo-y", `${(y * 100).toFixed(1)}%`);
  };

  const resetPointer = () => {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.setProperty("--tilt-x", "0deg");
    frame.style.setProperty("--tilt-y", "0deg");
    frame.style.setProperty("--halo-x", "50%");
    frame.style.setProperty("--halo-y", "50%");
  };

  const initialStyle: LuxuryStyle = {
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
    "--parallax-y": "0px",
    "--halo-x": "50%",
    "--halo-y": "50%",
  };

  return (
    <div
      ref={frameRef}
      className={`luxury-frame ${className}`}
      style={initialStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="luxury-float-layer">
        <div className="luxury-image-shell">
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className={`luxury-image ${imageClassName}`}
          />
          <span className="luxury-image-glass" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}