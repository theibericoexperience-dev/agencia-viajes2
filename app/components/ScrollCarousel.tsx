"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './scroll-carousel.module.css';

const IMAGES = [
  '/images/hero-extras/IMG_3582.JPG',
  '/images/hero-extras/IMG_3578.JPG',
  '/images/hero-extras/IMG_3604.JPG',
  '/images/hero-extras/IMG_3578.JPG',
  '/images/hero-extras/IMG_3582.JPG'
];

export default function ScrollCarousel(){
  const ref = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // intercept scroll once user scrolls down to trigger the carousel view
    let triggered = false;
    function onWheel(e: WheelEvent) {
      if (window.scrollY > 50 && !triggered && e.deltaY > 0) {
        triggered = true;
        // small nudge so user stays scrolled when carousel appears
        window.scrollTo({ top: window.scrollY + 1 });
        el.classList.add(styles.show);
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true });

    let speed = 0.8;
    function step() {
      if (!el) return;
      const inner = el.querySelector(`.${styles.inner}`) as HTMLElement | null || el.querySelector('.inner') as HTMLElement | null;
      if (!inner) { animRef.current = requestAnimationFrame(step); return; }
      const computed = inner.style.transform || 'translateX(0px)';
      const match = computed.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
      const cur = match ? parseFloat(match[1]) : 0;
      const left = cur - speed;
      inner.style.transform = `translateX(${left}px)`;
      // loop: if scrolled too far left, reset
      if (Math.abs(left) > inner.scrollWidth / 2) {
        inner.style.transform = 'translateX(0px)';
      }
      animRef.current = requestAnimationFrame(step);
    }
    animRef.current = requestAnimationFrame(step);

    // hover interactions (slow + scale)
    el.addEventListener('mouseenter', () => { speed = 0.25; el.classList.add(styles.hover); });
    el.addEventListener('mouseleave', () => { speed = 0.8; el.classList.remove(styles.hover); });

    return () => { window.removeEventListener('wheel', onWheel); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div ref={ref} className={`${styles.root} hidden md:block`} aria-hidden>
      <div className={styles.inner} style={{display:'flex', gap:'12px', transform: 'translateX(0px)'}}>
        {IMAGES.map((src, i) => (
          <div key={i} className={styles.item} style={{width: 220, height: 140, flex: '0 0 auto', overflow:'hidden', borderRadius:8}}>
            <Image src={src} alt={`carousel-${i}`} fill className='object-cover' sizes='220px' draggable={false} />
          </div>
        ))}
        {/* duplicate set for seamless loop */}
        {IMAGES.map((src, i) => (
          <div key={`d-${i}`} className={styles.item} style={{width: 220, height: 140, flex: '0 0 auto', overflow:'hidden', borderRadius:8}}>
            <Image src={src} alt={`carousel-dup-${i}`} fill className='object-cover' sizes='220px' draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
