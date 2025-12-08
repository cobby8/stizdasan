"use client";

import Link from "next/link";
import { Users, MapPin, Star, ArrowRight, Megaphone, LayoutTemplate, CalendarDays } from "lucide-react";
import featuresData from "../../data/features.json";
import coachesData from "../../data/coaches.json";
import locationsData from "../../data/locations.json";
import noticesData from "../../data/notices.json";

export default function AdminDashboard() {
    const coachCount = coachesData.leadership.length + coachesData.coaches.length;
    const branchCount = Object.keys(locationsData).length;
    const featuresCount = featuresData.length;
    const noticesCount = noticesData.length;

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-black italic text-zinc-900 mb-2">관리자 대시보드</h1>
                <p className="text-zinc-500">웹사이트 컨텐츠를 관리하세요.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Hero Management */}
                <Link href="/admin/hero" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 h-full hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <LayoutTemplate size={60} />
                        </div>
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <LayoutTemplate size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">메인 화면 관리</h3>
                        <p className="text-zinc-500 text-sm font-medium mb-6">메인 타이틀, 서브텍스트, 슬로건 이미지 수정</p>
                        <div className="flex items-center text-sm font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                            관리하기 <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Notices Management */}
                <Link href="/admin/notices" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 h-full hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Megaphone size={60} />
                        </div>
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <Megaphone size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">공지사항 관리</h3>
                        <p className="text-zinc-500 text-sm font-medium mb-6">
                            총 {noticesCount}개의 공지사항 등록됨
                        </p>
                        <div className="flex items-center text-sm font-bold text-red-600 group-hover:translate-x-1 transition-transform">
                            관리하기 <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Curriculum Management */}
                <Link href="/admin/curriculum" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 h-full hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CalendarDays size={60} />
                        </div>
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <CalendarDays size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">시간표 관리</h3>
                        <p className="text-zinc-500 text-sm font-medium mb-6">
                            구글 시트 연동 시간표 설정
                        </p>
                        <div className="flex items-center text-sm font-bold text-green-600 group-hover:translate-x-1 transition-transform">
                            관리하기 <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </Link>


                {/* Coaches Management */}
                <Link href="/admin/coaches" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 h-full hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users size={60} />
                        </div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">코치진 관리</h3>
                        <p className="text-zinc-500 text-sm font-medium mb-6">
                            총 {coachCount}명의 코치 프로필 관리
                        </p>
                        <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                            관리하기 <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Features Management */}
                <Link href="/admin/features" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 h-full hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Star size={60} />
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <Star size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">특징 섹션 관리</h3>
                        <p className="text-zinc-500 text-sm font-medium mb-6">
                            Why STIZ? 섹션 {featuresCount}개 항목 수정
                        </p>
                        <div className="flex items-center text-sm font-bold text-yellow-600 group-hover:translate-x-1 transition-transform">
                            관리하기 <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Locations Management */}
                <Link href="/admin/locations" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 h-full hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <MapPin size={60} />
                        </div>
                        <div className="w-12 h-12 bg-steez-orange/10 text-steez-orange rounded-2xl flex items-center justify-center mb-6 group-hover:bg-steez-orange group-hover:text-white transition-colors">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">지점 위치 관리</h3>
                        <p className="text-zinc-500 text-sm font-medium mb-6">
                            {branchCount}개 지점 정보 및 지도 설정
                        </p>
                        <div className="flex items-center text-sm font-bold text-steez-orange group-hover:translate-x-1 transition-transform">
                            관리하기 <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
