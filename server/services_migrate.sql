-- Services tables migration
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS service_packages (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(50)  NOT NULL UNIQUE,
  title       VARCHAR(100) NOT NULL,
  description TEXT         NOT NULL,
  icon_type   VARCHAR(20)  NOT NULL,
  sort_order  INT          NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_categories (
  id          SERIAL PRIMARY KEY,
  package_id  INT          NOT NULL REFERENCES service_packages(id) ON DELETE CASCADE,
  name        VARCHAR(150) NOT NULL,
  description TEXT         NOT NULL,
  sort_order  INT          NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_category_tags (
  id          SERIAL PRIMARY KEY,
  category_id INT          NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  tag         VARCHAR(150) NOT NULL,
  sort_order  INT          NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS service_categories_package_idx ON service_categories (package_id);
CREATE INDEX IF NOT EXISTS service_category_tags_category_idx ON service_category_tags (category_id);

-- =====================
-- SEED DATA
-- =====================

INSERT INTO service_packages (slug, title, description, icon_type, sort_order) VALUES
(
  'chup-anh',
  'GÓI CHỤP',
  'Phiền TV mang tư duy điện ảnh vào từng khung hình tĩnh, tạo nên bộ ảnh có chiều sâu, cảm xúc và đậm dấu ấn thương hiệu cá nhân.',
  'camera',
  1
),
(
  'quay-video',
  'GÓI VIDEO',
  'Short film - MV - TVC - Phim/Quảng cáo Doanh nghiệp. Từ ý tưởng đến hậu kỳ, mọi khâu đều được triển khai chuyên nghiệp và nhất quán.',
  'video',
  2
)
ON CONFLICT (slug) DO NOTHING;

-- Categories for GÓI CHỤP
WITH pkg AS (SELECT id FROM service_packages WHERE slug = 'chup-anh')
INSERT INTO service_categories (package_id, name, description, sort_order)
SELECT pkg.id, cat.name, cat.description, cat.sort_order FROM pkg, (VALUES
  (1, 'Cá nhân',
   'Phù hợp cho: Profile cá nhân, ảnh thương hiệu cá nhân, social media content. Tập trung thần thái, bố cục và màu sắc đúng cá tính riêng.'),
  (2, 'Couple',
   'Dành cho các cặp đôi muốn lưu giữ khoảnh khắc yêu thương theo cách chân thật, giàu cảm xúc và có chiều sâu hình ảnh.')
) AS cat(sort_order, name, description);

-- Categories for GÓI VIDEO
WITH pkg AS (SELECT id FROM service_packages WHERE slug = 'quay-video')
INSERT INTO service_categories (package_id, name, description, sort_order)
SELECT pkg.id, cat.name, cat.description, cat.sort_order FROM pkg, (VALUES
  (1, 'Short film - MV - TVC',
   'Sản xuất phim ngắn, âm nhạc và quảng cáo truyền hình với định hướng hình ảnh rõ ràng, câu chuyện chặt chẽ và cảm xúc mạnh.'),
  (2, 'Phim & Quảng cáo Doanh nghiệp',
   'Nâng tầm thương hiệu của bạn với các video doanh nghiệp chỉn chu, thuyết phục và tối ưu cho nhiều điểm chạm truyền thông.'),
  (3, 'Short Clip Social Media',
   'Nội dung ngắn được tối ưu cho các nền tảng mạng xã hội, giữ đúng nhịp xem nhanh nhưng vẫn đảm bảo nhận diện thương hiệu.'),
  (4, 'Xây Dựng & Phát Triển Kênh',
   'Từng bước xây dựng và phát triển kênh YouTube/TikTok với chiến lược nội dung, tối ưu hiển thị và tăng trưởng bền vững.'),
  (5, 'Tư Vấn Chuyên Môn',
   'Chia sẻ kiến thức và kinh nghiệm về chính sách kênh, nội dung, sản phẩm và cách vận hành để hạn chế sai lầm khi triển khai.'),
  (6, 'Livestream Bán Hàng & Sự Kiện',
   'Thiết kế format livestream bán hàng và sự kiện với flow rõ ràng, hình ảnh bắt mắt và khả năng chuyển đổi cao.')
) AS cat(sort_order, name, description);

-- Tags for Cá nhân (chup-anh)
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'chup-anh' AND sc.name = 'Cá nhân'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Tư vấn concept & mood hình ảnh'),
  (2, 'Hướng dẫn tạo dáng tự nhiên'),
  (3, 'Chỉnh màu điện ảnh'),
  (4, 'Chỉnh màu trẻ trung'),
  (5, 'Chỉnh màu sang trọng'),
  (6, 'Bàn giao hình chất lượng cao'),
  (7, 'Tối ưu cho mạng xã hội')
) AS t(sort_order, tag);

-- Tags for Couple (chup-anh)
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'chup-anh' AND sc.name = 'Couple'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Bắt trọn tương tác thật'),
  (2, 'Cảm xúc tự nhiên'),
  (3, 'Tạo không gian thoải mái'),
  (4, 'Tone màu ấm áp'),
  (5, 'Tone màu lãng mạn'),
  (6, 'Tone màu hiện đại')
) AS t(sort_order, tag);

-- Tags for Short film - MV - TVC (quay-video)
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'quay-video' AND sc.name = 'Short film - MV - TVC'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Kịch bản sáng tạo'),
  (2, 'Quay phim chuyên nghiệp'),
  (3, 'Dựng phim & FX'),
  (4, 'Âm thanh & nhạc nền'),
  (5, 'Color grading')
) AS t(sort_order, tag);

-- Tags for Phim & Quảng cáo Doanh nghiệp
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'quay-video' AND sc.name = 'Phim & Quảng cáo Doanh nghiệp'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Corporate Film'),
  (2, 'Brand Video'),
  (3, 'Product Video'),
  (4, 'Event Coverage'),
  (5, 'Drone shots')
) AS t(sort_order, tag);

-- Tags for Short Clip Social Media
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'quay-video' AND sc.name = 'Short Clip Social Media'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Content idea'),
  (2, 'Scriptwriting'),
  (3, 'Trend following'),
  (4, 'Fast turnaround'),
  (5, 'Multi-platform format')
) AS t(sort_order, tag);

-- Tags for Xây Dựng & Phát Triển Kênh
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'quay-video' AND sc.name = 'Xây Dựng & Phát Triển Kênh'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Tư vấn chiến lược kênh'),
  (2, 'Content planning'),
  (3, 'SEO & thumbnail'),
  (4, 'Analytics & growth'),
  (5, 'Monetization')
) AS t(sort_order, tag);

-- Tags for Tư Vấn Chuyên Môn
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'quay-video' AND sc.name = 'Tư Vấn Chuyên Môn'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Policy kênh'),
  (2, 'Ý tưởng nội dung'),
  (3, 'Product usage'),
  (4, 'Best practices'),
  (5, 'Q&A 1-on-1')
) AS t(sort_order, tag);

-- Tags for Livestream Bán Hàng & Sự Kiện
WITH cat AS (
  SELECT sc.id FROM service_categories sc
  JOIN service_packages sp ON sp.id = sc.package_id
  WHERE sp.slug = 'quay-video' AND sc.name = 'Livestream Bán Hàng & Sự Kiện'
)
INSERT INTO service_category_tags (category_id, tag, sort_order)
SELECT cat.id, t.tag, t.sort_order FROM cat, (VALUES
  (1, 'Run of show'),
  (2, 'Set design'),
  (3, 'Live moderation'),
  (4, 'Sales script'),
  (5, 'Highlight clips')
) AS t(sort_order, tag);
