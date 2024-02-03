--https://dbdiagram.io/d/fullstack_k4_huybui-65a00f3dac844320aebacfed

-- TẠO TABLE
-- Table: public.PHONG
CREATE TABLE IF NOT EXISTS public."PHONG"
(
    "MaPhong" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "LoaiPhong" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "SoKhachToiDa" integer NOT NULL,
    "GiaPhong" double precision,
    "MoTa" text COLLATE pg_catalog."default",
    CONSTRAINT "PHONG_primary" PRIMARY KEY ("MaPhong")
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."PHONG"
    OWNER to postgres;
	
-- Table: public.KHACH_HANG
CREATE TABLE IF NOT EXISTS public."KHACH_HANG"
(
    "MaKH" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "TenKH" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "DiaChi" character varying COLLATE pg_catalog."default" NOT NULL,
    "SoDT" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "KHACH_HANG_primary" PRIMARY KEY ("MaKH")
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."KHACH_HANG"
    OWNER to postgres;
	
-- Table: public.DICH_VU_DI_KEM
CREATE TABLE IF NOT EXISTS public."DICH_VU_DI_KEM"
(
    "MaDV" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "TenDV" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "DonViTinh" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "DonGia" integer NOT NULL,
    CONSTRAINT "DICH_VU_DI_KEM_primary" PRIMARY KEY ("MaDV")
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."DICH_VU_DI_KEM"
    OWNER to postgres;
	
-- Table: public.DAT_PHONG
CREATE TABLE IF NOT EXISTS public."DAT_PHONG"
(
    "MaDatPhong" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "MaPhong" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "MaKH" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "NgayDat" date NOT NULL,
    "GioBatDau" time with time zone NOT NULL,
    "GioKetThuc" time with time zone NOT NULL,
    "TienDatCoc" integer,
    "GhiChu" text COLLATE pg_catalog."default",
    "TrangThaiDat" character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT "DAT_PHONG_primary" PRIMARY KEY ("MaDatPhong"),
    CONSTRAINT "DAT_PHONG_MaKH" FOREIGN KEY ("MaKH")
        REFERENCES public."KHACH_HANG" ("MaKH") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "DAT_PHONG_MaPhong_foreign" FOREIGN KEY ("MaPhong")
        REFERENCES public."PHONG" ("MaPhong") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."DAT_PHONG"
    OWNER to postgres;
	
-- Table: public.CHI_TIET_SU_DUNG_DV
CREATE TABLE IF NOT EXISTS public."CHI_TIET_SU_DUNG_DV"
(
    "MaDatPhong" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "MaDV" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "SoLuong" double precision NOT NULL,
    CONSTRAINT "CHI_TIET_DV_02_foreign" FOREIGN KEY ("MaDV")
        REFERENCES public."DICH_VU_DI_KEM" ("MaDV") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "CHI_TIET_DV_foreign" FOREIGN KEY ("MaDatPhong")
        REFERENCES public."DAT_PHONG" ("MaDatPhong") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."CHI_TIET_SU_DUNG_DV"
    OWNER to postgres;

-- THÊM DỮ LIỆU
-- Thêm dữ liệu table.PHONG
INSERT INTO "PHONG"("MaPhong", "LoaiPhong", "SoKhachToiDa", "GiaPhong")
VALUES ('P0001', 'Loai 1', 20, 60000),
	   ('P0002', 'Loai 1', 25, 80000),
	   ('P0003', 'Loai 2', 15, 50000),
	   ('P0004', 'Loai 3', 20, 50000);
	   
-- Thêm dữ liệu table.KHACH_HANG
INSERT INTO "KHACH_HANG"("MaKH", "TenKH", "DiaChi", "SoDT")
VALUES ('KH0001', 'Nguyen Van A', 'Hoa xuan', 1111111111),
	   ('KH0002', 'Nguyen Van B', 'Hoa hai', 1111111112),
	   ('KH0003', 'Phan Van A', 'Cam le', 1111111113),
	   ('KH0004', 'Phan Van B', 'Hoa xuan', 1111111114);
	   
-- Thêm dữ liệu table.DICH_VU_DI_KEM
INSERT INTO "DICH_VU_DI_KEM"("MaDV", "TenDV", "DonViTinh", "DonGia")
VALUES ('DV001', 'Beer', 'lon', 10000),
	   ('DV002', 'Nuoc ngot', 'lon', 8000),
	   ('DV003', 'Trai cay', 'dia', 35000),
	   ('DV004', 'Khan uot', 'cai', 2000);
	   
-- Thêm dữ liệu table.DAT_PHONG
INSERT INTO "DAT_PHONG"("MaDatPhong", "MaPhong", "MaKH", "NgayDat", "GioBatDau", "GioKetThuc", "TienDatCoc", "TrangThaiDat")
VALUES ('DP0001', 'P0001', 'KH0002', '2018-03-26', '11:00', '13:30', 100000, 'Da dat'),
	   ('DP0002', 'P0001', 'KH0003', '2018-03-27', '17:15', '19:15', 50000, 'Da huy'),
	   ('DP0003', 'P0002', 'KH0002', '2018-03-26', '20:30', '22:15', 100000, 'Da dat'),
	   ('DP0004', 'P0003', 'KH0001', '2018-04-01', '19:30', '21:15', 200000, 'Da dat');

-- Thêm dữ liệu table.CHI_TIET_SU_DUNG_DV
INSERT INTO "CHI_TIET_SU_DUNG_DV"("MaDatPhong", "MaDV", "SoLuong")
VALUES ('DP0001', 'DV001', 20),
	   ('DP0001', 'DV003', 3),
	   ('DP0001', 'DV002', 10),
	   ('DP0002', 'DV002', 10),
	   ('DP0002', 'DV003', 1),
	   ('DP0003', 'DV003', 2),
	   ('DP0003', 'DV004', 10);
	   
-- BAI TẬP
-- Câu 1: Hiển thị MaDatPhong*, MaPhong*, LoaiPhong*, GiaPhong*, TenKH*, NgayDat*, TongTienHat, TongTienSuDungDichVu, 
-- TongTienThanhToan tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. Những đơn đặt phòng nào không sử dụng 
-- dịch vụ đi kèm thì cũng liệt kê thông tin của đơn đặt phòng đó ra
-- + TongTienHat = GiaPhong * (GioKetThuc – GioBatDau) 
-- + TongTienSuDungDichVu = SoLuong * DonGia 
-- + TongTienThanhToan = TongTienHat + sum (TongTienSuDungDichVu)
-- SUBTIME
SELECT "DAT_PHONG"."MaDatPhong", "DAT_PHONG"."MaPhong",
	   "PHONG"."LoaiPhong", "PHONG"."GiaPhong",
	   "KHACH_HANG"."TenKH", "DAT_PHONG"."NgayDat",
	   ("PHONG"."GiaPhong" * (EXTRACT(EPOCH FROM ("DAT_PHONG"."GioKetThuc" - "DAT_PHONG"."GioBatDau")) / 3600)) AS "TongTienHat",
	   SUM("CHI_TIET_SU_DUNG_DV"."SoLuong" * "DICH_VU_DI_KEM"."DonGia") AS "TongTienSuDungDichVu",
	   (("PHONG"."GiaPhong" * (EXTRACT(EPOCH FROM ("DAT_PHONG"."GioKetThuc" - "DAT_PHONG"."GioBatDau")) / 3600)) + 
		SUM("CHI_TIET_SU_DUNG_DV"."SoLuong" * "DICH_VU_DI_KEM"."DonGia")) AS "TongTienThanhToan"
FROM "DAT_PHONG"
INNER JOIN "PHONG"
ON "PHONG"."MaPhong" = "DAT_PHONG"."MaPhong"
INNER JOIN "KHACH_HANG"
ON "KHACH_HANG"."MaKH" = "DAT_PHONG"."MaKH"
INNER JOIN "CHI_TIET_SU_DUNG_DV"
ON "CHI_TIET_SU_DUNG_DV"."MaDatPhong" = "DAT_PHONG"."MaDatPhong"
INNER JOIN "DICH_VU_DI_KEM"
ON "DICH_VU_DI_KEM"."MaDV" = "CHI_TIET_SU_DUNG_DV"."MaDV"
GROUP BY "DAT_PHONG"."MaDatPhong", "DAT_PHONG"."MaPhong", 
	     "PHONG"."LoaiPhong", "PHONG"."GiaPhong", 
		 "KHACH_HANG"."TenKH", "DAT_PHONG"."NgayDat";

-- Câu 2: Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”
SELECT "KHACH_HANG".* FROM "KHACH_HANG" 
INNER JOIN "DAT_PHONG" 
ON "DAT_PHONG"."MaKH" = "KHACH_HANG"."MaKH"
WHERE LOWER("KHACH_HANG"."DiaChi") = LOWER('Hoa xuan')

-- Câu 3: Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat của những phòng 
-- được khách hàng đặt có số lần đặt lớn hơn 2 lần và trạng thái đặt là “Da dat”
SELECT "DAT_PHONG"."MaPhong", "PHONG"."LoaiPhong", 
	   "PHONG"."SoKhachToiDa", "PHONG"."GiaPhong",
	   COUNT("DAT_PHONG"."MaPhong") AS "SoLanDat"
FROM "DAT_PHONG"
INNER JOIN "PHONG"
ON "PHONG"."MaPhong" = "DAT_PHONG"."MaPhong"
WHERE LOWER("DAT_PHONG"."TrangThaiDat") = LOWER('Da dat')
GROUP BY "DAT_PHONG"."MaPhong", "PHONG"."LoaiPhong", "PHONG"."SoKhachToiDa", "PHONG"."GiaPhong"
HAVING COUNT("DAT_PHONG"."MaPhong") > 2
