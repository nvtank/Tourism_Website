'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Clock, Users, Star, Heart, Filter, Search } from 'lucide-react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

// 3D Globe Component
function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        color="#0ea5e9"
        roughness={0.7}
        metalness={0.2}
        transparent
        opacity={0.8}
        envMapIntensity={0.5}
      />
      {/* Add country highlights */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshBasicMaterial 
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </mesh>
  );
}

interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
  category: 'domestic' | 'international';
}

export default function Tours() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'domestic' | 'international'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const globeContainerRef = useRef<HTMLDivElement>(null);
  
  const tours: Tour[] = [
    {
      id: 1,
      title: "Tour Bali 5N4Đ",
      location: "Bali, Indonesia",
      duration: "5 ngày 4 đêm",
      price: "12.990.000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
      category: "international"
    },
    {
      id: 2,
      title: "Tour Đà Nẵng - Hội An",
      location: "Đà Nẵng, Việt Nam",
      duration: "4 ngày 3 đêm",
      price: "4.990.000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
      category: "domestic"
    },
    {
      id: 3,
      title: "Tour Tokyo - Kyoto",
      location: "Tokyo, Nhật Bản",
      duration: "6 ngày 5 đêm",
      price: "25.990.000",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      category: "international"
    }
  ];
  
  useGSAP(() => {
    // Animate tour cards on scroll
    gsap.utils.toArray('.tour-card').forEach((card: any) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
    
    // Globe animation
    if (globeContainerRef.current) {
      gsap.from(globeContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: 'power3.out'
      });
    }
  });

  const filteredTours = tours.filter(tour => {
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section with 3D Globe */}
      <div className="pt-16 pb-8 px-4 relative h-[60vh]">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Globe />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="city" />
          </Canvas>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Khám Phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Tour Du Lịch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl"
          >
            Tìm kiếm và đặt tour du lịch tuyệt vời với giá tốt nhất
          </motion.p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm tour..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedCategory('domestic')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedCategory === 'domestic'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Trong nước
            </button>
            <button
              onClick={() => setSelectedCategory('international')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedCategory === 'international'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Quốc tế
            </button>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <motion.div
              key={tour.id}
              className="tour-card bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <Heart className="text-white" size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-cyan-400" size={16} />
                    <span className="text-gray-300">{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-white">{tour.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{tour.title}</h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="text-cyan-400" size={16} />
                    <span className="text-gray-300">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="text-cyan-400" size={16} />
                    <span className="text-gray-300">2-10 người</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">{tour.price}</span>
                    <span className="text-gray-300">đ</span>
                  </div>
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors">
                    Chi tiết
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}