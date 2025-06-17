'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

interface CartItem {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Tour Bali 5N4Đ",
      location: "Bali, Indonesia",
      duration: "5 ngày 4 đêm",
      price: "12.990.000",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Tour Đà Nẵng - Hội An",
      location: "Đà Nẵng, Việt Nam",
      duration: "4 ngày 3 đêm",
      price: "4.990.000",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop"
    }
  ]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\./g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };
  
  useGSAP(() => {
    // Cart items animation
    gsap.from('.cart-item', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    // Summary animation
    gsap.from('.summary-card', {
      opacity: 0,
      y: 50,
      delay: 0.3,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Giỏ hàng của bạn
          </h1>
          <p className="text-xl text-gray-300">
            Xem và chỉnh sửa các tour bạn đã chọn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="cart-item bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.location}</p>
                        <p className="text-gray-300">{item.duration}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(parseInt(item.price.replace(/\./g, '')) * item.quantity)}đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {cartItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-300 mb-4">Giỏ hàng của bạn đang trống</p>
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors"
                >
                  Khám phá tour
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="summary-card bg-white/10 backdrop-blur-md rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">Tổng đơn hàng</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Tạm tính</span>
                  <span>{formatPrice(calculateSubtotal())}đ</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Phí dịch vụ</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Thuế VAT</span>
                  <span>Miễn phí</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="text-xl font-bold text-white">Tổng cộng</span>
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(calculateSubtotal())}đ
                  </span>
                </div>
              </div>

              <button
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                Thanh toán
                <ArrowRight size={20} />
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Bạn có thể thanh toán bằng thẻ tín dụng hoặc chuyển khoản ngân hàng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}