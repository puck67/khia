import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import logo from '../assets/logo.svg'
import photo3 from '../assets/photo3.png'
import photo4 from '../assets/photo4.png'
import photo5 from '../assets/photo5.png'
import photo6 from '../assets/photo6.png'
import photo7 from '../assets/photo7.png'
import photo8 from '../assets/photo8.png'
import photo9 from '../assets/photo9.png'
import photo10 from '../assets/photo10.png'
import photo11 from '../assets/photo11.png'

const FEATURED_PROJECT = {
  title: 'Dự án tiêu biểu',
  linkLabel: 'Xem dự án nổi bật',
  imageSrc: photo3,
}

const PROJECTS = [
  {
    title: 'Từng Là Của Nhau',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo4,
  },
  {
    title: 'Những Điều Nhỏ Nhoi',
    description:
      'Định hình câu chuyện thương hiệu từ khâu nội dung đến hình ảnh, đảm bảo mỗi phân cảnh đều phục vụ mục tiêu marketing và định vị sản phẩm.',
    imageSrc: photo5,
  },
  {
    title: 'Mẹ',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo6,
  },
  {
    title: 'Tết Sum Vầy',
    description:
      'Phụ trách tổ chức và điều phối sản xuất, đảm bảo tiến độ, ngân sách và chất lượng hình ảnh theo đúng định hướng sáng tạo đã đề ra.',
    imageSrc: photo7,
  },
  {
    title: 'Tết Yêu Thương',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo8,
  },
  {
    title: 'Hoàng Hôn Của Chúng Ta',
    description:
      'Đảm bảo quá trình ghi hình và hậu kỳ được triển khai chuyên nghiệp, đáp ứng tiêu chuẩn kỹ thuật và mục tiêu thương mại của dự án.',
    imageSrc: photo9,
    imageClassName: 'md:max-w-[332px] lg:max-w-[332px]',
  },
  {
    title: 'Mây',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo10,
    imageClassName: 'md:max-w-[278px] lg:max-w-[278px]',
  },
  {
    title: 'Vết Sẹo',
    description:
      'Phát triển concept sáng tạo dựa trên insight khách hàng, chuyển hóa thành kịch bản chi tiết và chỉ đạo sản xuất để tối ưu hiệu quả truyền thông.',
    imageSrc: photo11,
  },
]

function PortfolioImage({ src, alt, className = '', fullBleed = false }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block w-full object-cover ${fullBleed ? '' : 'rounded-[10px]'} ${className}`}
    />
  )
}

function HeaderSection() {
  return (
    <section className="flex w-full flex-col bg-[#1E1E1E]">
      <div className="flex w-full flex-col items-center gap-8 px-4 py-12 md:px-8 md:py-16 lg:px-5 lg:py-[80px] lg:pb-[65px]">
        <div className="flex w-full max-w-[1240px] flex-col items-center gap-6 text-center md:gap-[26px]">
          <span
            className="text-[40px] leading-[100%] tracking-[-0.03em] text-[#E4E4E4] md:text-[56px] lg:text-[70px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {FEATURED_PROJECT.title}
          </span>
          <a
            href="#"
            className="text-xl leading-[100%] tracking-[-0.03em] text-[#E4E4E4] underline md:text-[26px] lg:text-[32px]"
            style={{ fontFamily: "'Gowun Batang', serif" }}
          >
            {FEATURED_PROJECT.linkLabel}
          </a>
        </div>
      </div>

      <div className="w-full">
        <div className="mx-auto w-full max-w-[1280px]">
          <PortfolioImage
            src={FEATURED_PROJECT.imageSrc}
            alt={FEATURED_PROJECT.title}
            className="min-h-[280px] md:min-h-[460px] lg:min-h-[640px]"
            fullBleed
          />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ title, description, imageSrc, imageClassName = '' }) {
  return (
    <article className="flex w-full flex-col gap-8 rounded-[10px] border border-white px-4 py-4 md:px-8 md:py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-[50px] lg:py-[50px]">
      <div className="w-full flex-1">
        <PortfolioImage src={imageSrc} alt={title} className={imageClassName} />
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-6 md:px-4 lg:px-10 lg:gap-10">
        <h2
          className="m-0 text-[30px] leading-[120%] tracking-[-0.03em] text-white underline md:text-[36px] lg:text-[40px]"
          style={{ fontFamily: "'Gowun Batang', serif" }}
        >
          {title}
        </h2>
        <p
          className="m-0 text-base leading-[140%] tracking-[-0.03em] text-white md:text-lg lg:text-[20px] lg:leading-[110%]"
          style={{ fontFamily: "'Rethink Sans', sans-serif" }}
        >
          {description}
        </p>
      </div>
    </article>
  )
}

function ProjectsSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[#1E1E1E] px-4 py-10 md:gap-14 md:px-8 md:py-16 lg:gap-[85px] lg:px-12">
      <span
        className="block w-full max-w-[1184px] text-center text-[40px] leading-[100%] tracking-[-0.03em] text-white md:text-[56px] lg:text-[70px]"
        style={{ fontFamily: "'Gowun Batang', serif" }}
      >
        Những dự án khác
      </span>

      <div className="flex w-full max-w-[1184px] flex-col gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
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

export default function ProductPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col items-center bg-white">
      <Navbar />
      <HeaderSection />
      <ProjectsSection />
      <Footer />
    </div>
  )
}
