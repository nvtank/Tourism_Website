'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionDiv } from 'framer-motion';
import { FloatingBackground } from '@/components/ui/FloatingBackground';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Floating particles background
    gsap.fromTo(containerRef.current.querySelectorAll('.particle'), 
      { y: 0, x: 0 },
      {
        y: (i) => gsap.utils.random(-20, 20),
        x: (i) => gsap.utils.random(-20, 20),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }
    );

    // Form entrance animation
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Animation on submit
    if (formRef.current) {
      gsap.to(formRef.current, {
        y: -10,
        duration: 0.2,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    setTimeout(() => {
      setIsLoading(false);
      console.log('Login data:', formData);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Floating Background Elements */}
      <FloatingBackground />
      
      {/* Mouse Follower Effect */}
      <div className="mouse-follower fixed pointer-events-none w-6 h-6 rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/50 transform -translate-x-1/2 -translate-y-1/2 z-50"></div>
      <div className="mouse-dot fixed pointer-events-none w-2 h-2 rounded-full bg-cyan-400 transform -translate-x-1/2 -translate-y-1/2 z-50"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mt-6 text-3xl font-bold text-white">
            Đăng nhập tài khoản
          </h2>
          <p className="mt-2 text-gray-300">
            Nhập thông tin đăng nhập của bạn
          </p>
        </MotionDiv>

        <form 
          ref={formRef}
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
        >
          <div className="rounded-md bg-white/10 backdrop-blur-md p-8 space-y-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10">
            {/* Form fields remain the same as before */}
            {/* ... */}
          </div>
        </form>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-400">
            Chưa có tài khoản?{' '}
            <Link href="/signup" className="font-medium text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-4">
              Đăng ký ngay
            </Link>
          </p>
        </MotionDiv>
      </div>
    </div>
  );
}