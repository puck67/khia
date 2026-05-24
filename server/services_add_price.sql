-- Add price_vnd to existing service_categories table
-- Run in Supabase SQL Editor

ALTER TABLE service_categories ADD COLUMN IF NOT EXISTS price_vnd BIGINT;

-- Prices for GÓI CHỤP
UPDATE service_categories sc
SET price_vnd = CASE sc.name
  WHEN 'Cá nhân' THEN 1500000
  WHEN 'Couple'  THEN 2500000
END
FROM service_packages sp
WHERE sc.package_id = sp.id AND sp.slug = 'chup-anh';

-- Prices for GÓI VIDEO
UPDATE service_categories sc
SET price_vnd = CASE sc.name
  WHEN 'Short film - MV - TVC'          THEN 15000000
  WHEN 'Phim & Quảng cáo Doanh nghiệp' THEN 20000000
  WHEN 'Short Clip Social Media'        THEN 5000000
  WHEN 'Xây Dựng & Phát Triển Kênh'    THEN 8000000
  WHEN 'Tư Vấn Chuyên Môn'             THEN 3000000
  WHEN 'Livestream Bán Hàng & Sự Kiện' THEN 6000000
END
FROM service_packages sp
WHERE sc.package_id = sp.id AND sp.slug = 'quay-video';
