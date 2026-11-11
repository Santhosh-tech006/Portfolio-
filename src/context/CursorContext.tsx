import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';

interface CursorContextType {
  setCursor: (label: string, image?: string) => void;
  clearCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursorLabel = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursorLabel must be used within a CursorProvider');
  }
  return context;
};

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isNearEdge, setIsNearEdge] = useState(false);

  // Raw mouse coordinates as motion values (no component re-renders on move!)
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Slower spring for ambient cyan/blue radial spotlight
  const ambientSpringConfig = { stiffness: 90, damping: 20, mass: 0.8 };
  const ambientX = useSpring(mouseX, ambientSpringConfig);
  const ambientY = useSpring(mouseY, ambientSpringConfig);

  // Faster spring for small floating label & preview
  const labelSpringConfig = { stiffness: 220, damping: 22, mass: 0.4 };
  const labelX = useSpring(mouseX, labelSpringConfig);
  const labelY = useSpring(mouseY, labelSpringConfig);

  const ambientTransform = useTransform(
    [ambientX, ambientY],
    ([x, y]) => `translate3d(${Number(x) - 180}px, ${Number(y) - 180}px, 0)`
  );

  const labelTransform = useTransform(
    [labelX, labelY],
    ([x, y]) => {
      // Offset slightly to the bottom-right or flipped when near right/bottom edge
      const offsetX = isNearEdge ? -150 : 16;
      const offsetY = 18;
      return `translate3d(${Number(x) + offsetX}px, ${Number(y) + offsetY}px, 0)`;
    }
  );

  const setCursor = useCallback((label: string, image?: string) => {
    setActiveLabel(label);
    if (image) setActiveImage(image);
  }, []);

  const clearCursor = useCallback(() => {
    setActiveLabel(null);
    setActiveImage(null);
  }, []);

  useEffect(() => {
    // Only enable if device supports hover and fine pointer (desktop mouse/trackpad)
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsSupported(hoverQuery.matches);
    setReducedMotion(motionQuery.matches);

    const onHoverChange = (e: MediaQueryListEvent) => setIsSupported(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    hoverQuery.addEventListener('change', onHoverChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      hoverQuery.removeEventListener('change', onHoverChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  const isVisibleRef = useRef(false);
  const isNearEdgeRef = useRef(false);

  useEffect(() => {
    if (!isSupported || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Edge clamping detection
      const nearRight = e.clientX > window.innerWidth - 220;
      if (isNearEdgeRef.current !== nearRight) {
        isNearEdgeRef.current = nearRight;
        setIsNearEdge(nearRight);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      clearCursor();
    };

    // Attribute-based API: data-cursor and data-cursor-image
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const label = cursorTarget.getAttribute('data-cursor');
        const img = cursorTarget.getAttribute('data-cursor-image');
        if (label) {
          setActiveLabel(label);
          setActiveImage(img || null);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !cursorTarget.contains(related)) {
          clearCursor();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isSupported, reducedMotion, clearCursor, mouseX, mouseY]);

  return (
    <CursorContext.Provider value={{ setCursor, clearCursor }}>
      {children}

      {/* Interactive Cursor Layers - Only rendered for desktop pointer devices */}
      {isSupported && !reducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
          
          {/* Layer A: Ambient Soft Cyan/Blue Radial Spotlight */}
          <motion.div
            className="w-[360px] h-[360px] rounded-full opacity-60 transition-opacity duration-300"
            style={{
              transform: ambientTransform,
              background:
                'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, rgba(59, 130, 246, 0.06) 45%, transparent 70%)',
              filter: 'blur(35px)',
              opacity: isVisible ? 1 : 0,
            }}
          />

          {/* Layer B: Contextual Floating Label & Project Preview */}
          <motion.div
            style={{
              transform: labelTransform,
              opacity: isVisible ? 1 : 0,
            }}
            className="absolute top-0 left-0 flex flex-col items-start gap-2"
          >
            <AnimatePresence mode="wait">
              {activeLabel && (
                <motion.div
                  key={activeLabel}
                  initial={{ opacity: 0, scale: 0.85, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="px-3 py-1.5 rounded-lg bg-[#0A0A0A]/95 text-xs font-mono font-medium text-white border border-[#252525] shadow-xl shadow-black/80 backdrop-blur-md flex items-center gap-2 max-w-[200px] truncate"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                  <span className="truncate">{activeLabel}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Optional Floating Project Preview Image */}
            <AnimatePresence>
              {activeImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="w-40 h-24 rounded-lg overflow-hidden border border-[#252525] bg-[#111111] shadow-2xl shadow-black/90 p-0.5"
                >
                  <img
                    src={activeImage}
                    alt="Project Preview"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-md"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      )}
    </CursorContext.Provider>
  );
};
