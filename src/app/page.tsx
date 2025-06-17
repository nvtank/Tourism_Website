'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Calendar, Users, Star, ArrowRight, Phone, Mail, Facebook, Instagram, Twitter, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

const TravelHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const threeRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ scene: THREE.Scene; renderer: THREE.WebGLRenderer; camera: THREE.PerspectiveCamera } | null>(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js background animation
  useEffect(() => {
    if (!threeRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    threeRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = { scene, renderer, camera };

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current && renderer.domElement) {
        threeRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      price: "từ $899",
      rating: 4.8,
      description: "Thiên đường nhiệt đới với bãi biển tuyệt đẹp"
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      price: "từ $1299",
      rating: 4.9,
      description: "Thành phố hiện đại kết hợp truyền thống"
    },
    {
      id: 3,
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
      price: "từ $1599",
      rating: 4.7,
      description: "Thành phố tình yêu và nghệ thuật"
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Hải",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Chuyến đi tuyệt vời nhất từ trước đến nay! Dịch vụ chuyên nghiệp và chu đáo."
    },
    {
      name: "Trần Thu Hà",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Đội ngũ hướng dẫn viên rất nhiệt tình. Tôi sẽ quay lại lần nữa!"
    },
    {
      name: "Lê Văn Nam",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Giá cả hợp lý, chất lượng dịch vụ tuyệt vời. Highly recommended!"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Three.js Background */}
      <div ref={threeRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />
      

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 text-center">
        <div 
          className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-30"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop)',
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        
        <div className="relative z-20 max-w-4xl mx-auto">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl animate-fade-in">
            Khám Phá
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Thế Giới
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl animate-slide-up">
            Trải nghiệm những chuyến phiêu lưu tuyệt vời cùng chúng tôi
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row">
            <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform rounded-full group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 hover:shadow-2xl">
              Khám phá ngay
              <ArrowRight className="inline ml-2 transition-transform group-hover:translate-x-1" size={20} />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 rounded-full group border-white/30 hover:border-white hover:bg-white/10">
              <Play size={20} className="transition-transform group-hover:scale-110" />
              Xem video
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl p-6 mx-auto bg-white/10 backdrop-blur-md rounded-2xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10">
                <MapPin className="text-cyan-400" size={20} />
                <input type="text" placeholder="Điểm đến" className="flex-1 text-white placeholder-gray-300 bg-transparent outline-none" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10">
                <Calendar className="text-cyan-400" size={20} />
                <input type="date" className="flex-1 text-white bg-transparent outline-none" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10">
                <Users className="text-cyan-400" size={20} />
                <select className="flex-1 text-white bg-transparent outline-none">
                  <option value="">Số người</option>
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3+">3+ người</option>
                </select>
              </div>
              <button className="px-6 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Điểm Đến Nổi Bật
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Khám phá những địa điểm tuyệt vời nhất trên thế giới với các gói tour đặc biệt
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest, index) => (
              <div 
                key={dest.id}
                className="relative overflow-hidden transition-all duration-500 group bg-white/10 backdrop-blur-md rounded-2xl hover:transform hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute px-3 py-1 text-sm font-semibold text-gray-800 rounded-full top-4 right-4 bg-white/90">
                    {dest.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm text-white">{dest.rating}</span>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-300">{dest.description}</p>
                  <button className="w-full py-3 font-semibold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative px-4 py-20 bg-black/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Tại Sao Chọn Chúng Tôi?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🏆", title: "Chất lượng hàng đầu", desc: "Dịch vụ 5 sao với đội ngũ chuyên nghiệp" },
              { icon: "💰", title: "Giá cả hợp lý", desc: "Cam kết giá tốt nhất thị trường" },
              { icon: "🌍", title: "Đa dạng điểm đến", desc: "Hơn 100 quốc gia và vùng lãnh thổ" },
              { icon: "📞", title: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng hỗ trợ bạn mọi lúc" }
            ].map((item, index) => (
              <div key={index} className="text-center transition-all duration-300 group hover:transform hover:scale-105">
                <div className="mb-4 text-6xl group-hover:animate-bounce">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Khách Hàng Nói Gì
            </h2>
          </div>

          <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={prevTestimonial}
                className="p-2 text-white transition-colors rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 text-white transition-colors rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="text-center">
              <img 
                src={testimonials[currentTestimonial].avatar} 
                alt={testimonials[currentTestimonial].name}
                className="object-cover w-20 h-20 mx-auto mb-4 rounded-full"
              />
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="mb-4 text-lg italic text-gray-200">
                "{testimonials[currentTestimonial].comment}"
              </p>
              <h4 className="text-xl font-bold text-white">
                {testimonials[currentTestimonial].name}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative px-4 py-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Đăng Ký Nhận Tin
          </h2>
          <p className="mb-8 text-xl text-gray-200">
            Nhận những ưu đãi và tin tức du lịch mới nhất
          </p>
          
          <div className="flex flex-col max-w-md gap-4 mx-auto sm:flex-row">
            <input 
              type="email" 
              placeholder="Email của bạn"
              className="flex-1 px-6 py-4 text-white placeholder-gray-300 transition-colors border rounded-full outline-none bg-white/10 backdrop-blur-md border-white/20 focus:border-cyan-400"
            />
            <button className="px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105">
              Đăng ký
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 py-16 bg-black/40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-4">
            <div>
              <div className="mb-4 text-2xl font-bold text-white">
                Travel<span className="text-cyan-400">Hub</span>
              </div>
              <p className="mb-4 text-gray-300">
                Đồng hành cùng bạn khám phá thế giới với những trải nghiệm tuyệt vời nhất.
              </p>
              <div className="flex gap-4">
                <Facebook className="text-white transition-colors cursor-pointer hover:text-cyan-400" size={24} />
                <Instagram className="text-white transition-colors cursor-pointer hover:text-cyan-400" size={24} />
                <Twitter className="text-white transition-colors cursor-pointer hover:text-cyan-400" size={24} />
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-xl font-bold text-white">Dịch vụ</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="transition-colors hover:text-cyan-400">Tour trong nước</a></li>
                <li><a href="#" className="transition-colors hover:text-cyan-400">Tour quốc tế</a></li>
                <li><a href="#" className="transition-colors hover:text-cyan-400">Đặt khách sạn</a></li>
                <li><a href="#" className="transition-colors hover:text-cyan-400">Thuê xe</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-xl font-bold text-white">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="transition-colors hover:text-cyan-400">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="transition-colors hover:text-cyan-400">Chính sách bảo mật</a></li>
                <li><a href="#" className="transition-colors hover:text-cyan-400">Điều khoản sử dụng</a></li>
                <li><a href="#" className="transition-colors hover:text-cyan-400">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-xl font-bold text-white">Liên hệ</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>info@travelhub.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 text-center text-gray-300 border-t border-white/10">
            <p>&copy; 2025 TravelHub. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default TravelHomepage;