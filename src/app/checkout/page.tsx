'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CreditCard, Bank, Lock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

interface OrderItem {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  quantity: number;
  image: string;
}

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mock order items (in real app, this would come from cart/state management)
  const orderItems: OrderItem[] = [
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
  ];

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\./g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };
  
  useGSAP(() => {
    // Form animation
    gsap.from('.checkout-form', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    // Summary animation
    gsap.from('.order-summary', {
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
            Thanh toán
          </h1>
          <p className="text-xl text-gray-300">
            Hoàn tất đơn hàng của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="checkout-form space-y-6">
              {/* Personal Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      placeholder="Nhập địa chỉ"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Phương thức thanh toán</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-white" size={24} />
                      <span className="text-white font-medium">Thẻ tín dụng</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-xl border-2 transition-colors ${
                      paymentMethod === 'bank'
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bank className="text-white" size={24} />
                      <span className="text-white font-medium">Chuyển khoản ngân hàng</span>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Số thẻ</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Ngày hết hạn</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Thông tin chuyển khoản</h3>
                    <div className="space-y-3 text-gray-300">
                      <p>Ngân hàng: Vietcombank</p>
                      <p>Số tài khoản: 1234567890</p>
                      <p>Chủ tài khoản: CÔNG TY TNHH TRAVELHUB</p>
                      <p>Nội dung: [Mã đơn hàng] - [Tên khách hàng]</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/cart"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  ← Quay lại giỏ hàng
                </Link>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors flex items-center gap-2"
                >
                  Hoàn tất đơn hàng
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="order-summary bg-white/10 backdrop-blur-md rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">Đơn hàng của bạn</h2>
              
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.duration}</p>
                      <p className="text-gray-300 text-sm">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {formatPrice(parseInt(item.price.replace(/\./g, '')) * item.quantity)}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-4">
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

              <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                <Lock size={16} />
                <p>Thông tin thanh toán của bạn được bảo mật</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 