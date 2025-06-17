import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-md py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Travel<span className="text-cyan-400">Hub</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Đồng hành cùng bạn khám phá thế giới với những trải nghiệm tuyệt vời nhất.
            </p>
            <div className="flex gap-4">
              <Facebook className="text-white hover:text-cyan-400 cursor-pointer transition-colors" size={24} />
              <Instagram className="text-white hover:text-cyan-400 cursor-pointer transition-colors" size={24} />
              <Twitter className="text-white hover:text-cyan-400 cursor-pointer transition-colors" size={24} />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/tours" className="hover:text-cyan-400 transition-colors">
                  Tour trong nước
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-cyan-400 transition-colors">
                  Tour quốc tế
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-cyan-400 transition-colors">
                  Điểm đến hot
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Tư vấn tour
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/support" className="hover:text-cyan-400 transition-colors">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Liên hệ</h3>
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
        
        <div className="border-t border-white/10 pt-8 text-center text-gray-300">
          <p>&copy; 2025 TravelHub. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}