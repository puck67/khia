import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import logo from '../assets/logo.svg'
import heroImg from '../assets/photo1.png'
import imageBreak from '../assets/photo2.png'

function Hero() {
  return (
    <div className="flex w-full flex-col items-start bg-[#1E1E1E]">
      <div
        className="min-h-[280px] w-full bg-cover bg-center md:min-h-[420px] lg:min-h-[640px]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.2), rgba(0,0,0,.2)), url(${heroImg})`,
        }}
      />
    </div>
  )
}

function WhatWeDoSection() {
  return (
    <section className="flex w-full flex-col items-center gap-8 bg-[#1E1E1E] px-4 py-10 md:gap-10 md:px-8 md:py-12 lg:px-0">
      <div className="flex w-full justify-center">
        <span
          className="block w-full max-w-[984px] text-center text-[40px] leading-[100%] tracking-[-0.03em] text-white md:text-[56px] lg:text-[70px] lg:text-left"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Giới Thiệu
        </span>
      </div>

      <div className="w-full max-w-[1280px] px-0 md:px-10 lg:px-[148px]">
        <p
          className="m-0 text-lg leading-[140%] tracking-[-0.03em] text-white md:text-[24px] lg:text-[32px] lg:leading-[100%]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          Phiền TV là production house chuyên sản xuất nội dung số và xây dựng kênh trên các nền tảng mạng xã hội, đặc biệt là TikTok. Chúng tôi đồng hành cùng cá nhân, cửa hàng online và các thương hiệu nhỏ từ bước khởi đầu: lên ý tưởng, định hướng nội dung, sản xuất video ngắn đến phát triển kênh và tối ưu tăng trưởng dài hạn. Tên gọi "Phiền" không mang nghĩa tiêu cực. Chúng tôi tin rằng một nội dung đủ tốt phải đủ "phiền" để người xem không thể lướt qua, phải khiến họ dừng lại, ghi nhớ và hành động. Vì vậy, Phiền TV không chỉ tạo ra những video đẹp mắt hay bắt trend. Chúng tôi tập trung vào nội dung chiến lược, phục vụ mục tiêu bán hàng, xây dựng thương hiệu và phát triển bền vững.
        </p>
      </div>

      <div className="flex w-full flex-col items-center px-0 md:px-4 lg:px-9">
        <img src={imageBreak} alt="" className="block w-full max-w-[1208px] rounded-[10px]" />
      </div>
    </section>
  )
}

function LatestNewsSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[#1E1E1E] px-4 py-10 md:gap-14 md:px-8 md:py-16 lg:gap-[85px] lg:px-12">
      <span
        className="block w-full max-w-[1184px] text-center text-[40px] leading-[100%] tracking-[-0.03em] text-white md:text-[56px] lg:text-[70px]"
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        Giá trị cốt lõi
      </span>

      <div className="flex w-full max-w-[1184px] flex-col gap-5 lg:flex-row lg:items-stretch">
        <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-5 rounded-[10px] border border-white px-6 py-8 md:px-10 lg:min-h-[386px] lg:px-20 lg:py-[50px]">
          <span
            className="block w-full text-center text-[28px] leading-[110%] tracking-[-0.03em] text-white md:text-[32px]"
            style={{ fontFamily: "'Rethink Sans', sans-serif" }}
          >
            Mission
          </span>
          <p
            className="m-0 w-full text-center text-base leading-[140%] tracking-[-0.03em] text-white md:text-lg lg:text-[20px] lg:leading-[120%]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            Giúp cá nhân và thương hiệu nhỏ biến content thành một hệ thống bán hàng có chiến lược, nơi mỗi video không chỉ để xem, mà để tạo ra chuyển đổi và doanh thu. Phiền TV tồn tại để đồng hành dài hạn: định hướng, triển khai và tối ưu nội dung theo lộ trình rõ ràng, giúp khách hàng không còn làm content trong cảm tính hay may rủi.
          </p>
        </div>

        <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-5 rounded-[10px] border border-white px-6 py-8 md:px-10 lg:min-h-[386px] lg:px-20 lg:py-[50px]">
          <span
            className="block w-full text-center text-[28px] leading-[110%] tracking-[-0.03em] text-white md:text-[32px]"
            style={{ fontFamily: "'Rethink Sans', sans-serif" }}
          >
            Vision
          </span>
          <p
            className="m-0 w-full text-center text-base leading-[140%] tracking-[-0.03em] text-white md:text-lg lg:text-[20px] lg:leading-[110%]"
            style={{ fontFamily: "'Rethink Sans', sans-serif" }}
          >
            Trở thành production house social-first hàng đầu cho SMEs tại Việt Nam — nơi nội dung được xây dựng bằng tư duy chiến lược, đo lường bằng kết quả và phát triển bền vững theo thời gian. Phiền TV hướng đến việc thiết lập một tiêu chuẩn mới cho content bán hàng: không viral ngắn hạn, mà tạo ra hệ thống tăng trưởng dài hạn.
          </p>
        </div>
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
