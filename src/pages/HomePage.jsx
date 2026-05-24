import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import logo from '../assets/logo.svg'
import heroImg from '../assets/photo1.png'
import imageBreak from '../assets/photo2.png'
import ScrollReveal from '../components/ScrollReveal.jsx'

function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#1E1E1E]">
      <div
        className="min-h-[360px] w-full bg-cover bg-center md:min-h-[500px] lg:min-h-[720px] scale-105 animate-zoom-in"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(30,30,30,0.9)), url(${heroImg})`,
        }}
      />
      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center">
        <div className="animate-fade-in-up flex flex-col items-center gap-4">
          <h1 className="m-0 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl" style={{ fontFamily: "'Gowun Batang', serif" }}>
            PHIỀN <span className="text-[#E8C547]">TV</span>
          </h1>
          <div className="h-[2px] w-20 bg-[#E8C547] rounded-full" />
          <p className="m-0 max-w-xl text-sm font-medium tracking-wide text-gray-200 uppercase md:text-base lg:text-lg" style={{ fontFamily: "'Rethink Sans', sans-serif" }}>
            Nội dung đủ tốt phải đủ "phiền" để không thể lướt qua
          </p>
          <Link
            to="/booking"
            className="mt-6 inline-flex h-[52px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#E8C547_0%,#D4A837_100%)] px-8 text-sm font-bold uppercase tracking-wider text-[#0A0A0A] shadow-[0_4px_20px_rgba(232,197,71,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_24px_rgba(232,197,71,0.5)]"
            style={{ fontFamily: "'Rethink Sans', sans-serif" }}
          >
            Đặt lịch sản xuất
          </Link>
        </div>
      </div>
    </div>
  )
}

function WhatWeDoSection() {
  return (
    <section className="flex w-full flex-col items-center gap-8 bg-[#1E1E1E] px-4 py-10 md:gap-10 md:px-8 md:py-12 lg:px-0">
      <ScrollReveal className="flex w-full justify-center">
        <span
          className="block w-full max-w-[984px] text-center text-[40px] leading-[100%] tracking-[-0.03em] text-white md:text-[56px] lg:text-[70px] lg:text-left"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Giới Thiệu
        </span>
      </ScrollReveal>

      <ScrollReveal delay={150} className="w-full max-w-[1280px] px-0 md:px-10 lg:px-[148px]">
        <p
          className="m-0 text-lg leading-[140%] tracking-[-0.03em] text-white md:text-[24px] lg:text-[32px] lg:leading-[140%]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Phiền TV là production house chuyên sản xuất nội dung số và xây dựng kênh trên các nền tảng mạng xã hội, đặc biệt là TikTok. Chúng tôi đồng hành cùng cá nhân, cửa hàng online và các thương hiệu nhỏ từ bước khởi đầu: lên ý tưởng, định hướng nội dung, sản xuất video ngắn đến phát triển kênh và tối ưu tăng trưởng dài hạn. Tên gọi "Phiền" không mang nghĩa tiêu cực. Chúng tôi tin rằng một nội dung đủ tốt phải đủ "phiền" để người xem không thể lướt qua, phải khiến họ dừng lại, ghi nhớ và hành động. Vì vậy, Phiền TV không chỉ tạo ra những video đẹp mắt hay bắt trend. Chúng tôi tập trung vào nội dung chiến lược, phục vụ mục tiêu bán hàng, xây dựng thương hiệu và phát triển bền vững.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={300} className="flex w-full flex-col items-center px-0 md:px-4 lg:px-9">
        <img 
          src={imageBreak} 
          alt="" 
          className="block w-full max-w-[1208px] rounded-[20px] border border-[#2A2A2A] shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.01] hover:border-[#E8C547]/30" 
        />
      </ScrollReveal>
    </section>
  )
}

function LatestNewsSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[#1E1E1E] px-4 py-10 md:gap-14 md:px-8 md:py-16 lg:gap-[85px] lg:px-12">
      <ScrollReveal className="w-full text-center">
        <span
          className="block w-full max-w-[1184px] mx-auto text-[40px] leading-[100%] tracking-[-0.03em] text-white md:text-[56px] lg:text-[70px]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Giá trị cốt lõi
        </span>
      </ScrollReveal>

      <div className="flex w-full max-w-[1184px] flex-col gap-6 lg:flex-row lg:items-stretch">
        <ScrollReveal delay={150} className="flex-1 flex flex-col">
          <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-5 rounded-[20px] border border-[#2D2D2D] bg-[#141414] px-6 py-8 md:px-10 lg:min-h-[386px] lg:px-16 lg:py-[50px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8C547]/40 hover:shadow-[0_12px_32px_rgba(232,197,71,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8C547]/10 border border-[#E8C547]/20 text-[#E8C547]">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span
              className="block w-full text-center text-[28px] font-bold leading-[110%] tracking-[-0.03em] text-white md:text-[32px]"
              style={{ fontFamily: "'Rethink Sans', sans-serif" }}
            >
              Mission
            </span>
            <p
              className="m-0 w-full text-center text-base leading-[150%] tracking-[-0.03em] text-[#9CA3AF] md:text-lg lg:text-[20px]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              Giúp cá nhân và thương hiệu nhỏ biến content thành một hệ thống bán hàng có chiến lược, nơi mỗi video không chỉ để xem, mà để tạo ra chuyển đổi và doanh thu. Phiền TV tồn tại để đồng hành dài hạn: định hướng, triển khai và tối ưu nội dung theo lộ trình rõ ràng, giúp khách hàng không còn làm content trong cảm tính hay may rủi.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="flex-1 flex flex-col">
          <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-5 rounded-[20px] border border-[#2D2D2D] bg-[#141414] px-6 py-8 md:px-10 lg:min-h-[386px] lg:px-16 lg:py-[50px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8C547]/40 hover:shadow-[0_12px_32px_rgba(232,197,71,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <span
              className="block w-full text-center text-[28px] font-bold leading-[110%] tracking-[-0.03em] text-white md:text-[32px]"
              style={{ fontFamily: "'Rethink Sans', sans-serif" }}
            >
              Vision
            </span>
            <p
              className="m-0 w-full text-center text-base leading-[150%] tracking-[-0.03em] text-[#9CA3AF] md:text-lg lg:text-[20px]"
              style={{ fontFamily: "'Rethink Sans', sans-serif" }}
            >
              Trở thành production house social-first hàng đầu cho SMEs tại Việt Nam — nơi nội dung được xây dựng bằng tư duy chiến lược, đo lường bằng kết quả và phát triển bền vững theo thời gian. Phiền TV hướng đến việc thiết lập một tiêu chuẩn mới cho content bán hàng: không viral ngắn hạn, mà tạo ra hệ thống tăng trưởng dài hạn.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex w-full flex-col gap-10 bg-[#545454] px-4 py-8 md:px-8 lg:px-5 lg:py-[30px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-[50px]">
        <img src={logo} alt="Phiền TV" className="h-auto w-[220px] object-contain md:w-[260px] lg:w-[297px]" />

        <div className="flex w-full max-w-[489px] flex-col items-center justify-center gap-3 text-center lg:text-left">
          {[
            'hello@phientv.com',
            'Hà Nội, Việt Nam',
            '(+84) 123 456 789',
          ].map((line) => (
            <p
              key={line}
              className="m-0 w-full text-[20px] leading-[130%] tracking-[-0.03em] text-[#FCFAF6] md:text-[24px] lg:text-[30px] lg:leading-[120%]"
              style={{ fontFamily: "'Gowun Batang', serif" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1240px] justify-center lg:justify-start">
        <span
          className="text-center text-sm leading-[110%] tracking-[-0.03em] text-[#E4E4E4] md:text-base lg:text-left"
          style={{ fontFamily: "'Rethink Sans', sans-serif" }}
        >
          Phiền TV © 2025 All Rights Reserved
        </span>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center bg-[#1E1E1E]">
      <Navbar />
      <Hero />
      <WhatWeDoSection />
      <LatestNewsSection />
      <Footer />
    </div>
  )
}
