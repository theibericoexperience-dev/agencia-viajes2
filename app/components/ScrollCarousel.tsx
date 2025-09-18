"use client";
import React, { useEffect, useRef, useState } from 'react';
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
  const innerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef<number>(0);
  const speedRef = useRef<number>(0.8);
  const [visible, setVisible] = useState(false);
  const touching = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // desktop: intercept first downward wheel to show carousel and lock scroll
    let triggered = false;
    function onWheel(e: WheelEvent) {
      // require non-passive to be able to preventDefault when needed
      if (window.scrollY > 50 && !triggered && e.deltaY > 0 && window.innerWidth > 768) {
        e.preventDefault();
        triggered = true;
        setVisible(true);
        document.body.style.overflow = 'hidden';
        return;
      }
      // when visible and user scrolls down again, dismiss and restore scroll
      if (visible && e.deltaY > 0 && window.innerWidth > 768) {
        e.preventDefault();
        setVisible(false);
        document.body.style.overflow = '';
      }
    }
    window.addEventListener('wheel', onWheel as EventListener, { passive: false });

    // animation loop: continuous marquee
    function step(){
      const speed = speedRef.current;
      if (!inner) { animRef.current = requestAnimationFrame(step); return; }
      if (!touching.current) {
        posRef.current = posRef.current - speed;
      }
      inner.style.transform = `translateX(${posRef.current}px)`;
      // reset loop when scrolled half content
      if (Math.abs(posRef.current) > inner.scrollWidth / 2) posRef.current = 0;
      animRef.current = requestAnimationFrame(step);
    }
    animRef.current = requestAnimationFrame(step);

    // hover / pointer interactions
  el.addEventListener('pointerenter', () => { speedRef.current = 0.25; if (el) el.classList.add(styles.hover); });
  el.addEventListener('pointerleave', () => { speedRef.current = 0.8; if (el) el.classList.remove(styles.hover); });

    // touch handlers for mobile swipe control (option B)
    let lastX = 0;
    function onTouchStart(e: TouchEvent){
      touching.current = true;
      lastX = e.touches[0].clientX;
      el.classList.add(styles.hover);
      speedRef.current = 0.25;
    }
    function onTouchMove(e: TouchEvent){
      const x = e.touches[0].clientX;
      const dx = x - lastX;
      lastX = x;
      posRef.current = posRef.current + dx; // move with finger
      // clamp not necessary; loop handles reset
    }
    function onTouchEnd(){
      touching.current = false;
      el.classList.remove(styles.hover);
      speedRef.current = 0.8;
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('wheel', onWheel as EventListener);
      el.removeEventListener('pointerenter', () => {});
      el.removeEventListener('pointerleave', () => {});
      el.removeEventListener('touchstart', onTouchStart as EventListener);
      el.removeEventListener('touchmove', onTouchMove as EventListener);
      el.removeEventListener('touchend', onTouchEnd as EventListener);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <div ref={ref} className={`${styles.root} ${visible ? styles.show : ''}`} aria-hidden>
      <div ref={innerRef} className={styles.inner} style={{display:'flex', gap:'12px', transform: 'translateX(0px)'}}>
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
