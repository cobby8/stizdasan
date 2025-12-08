import { getServerSession } from "next-auth";
import Link from "next/link";
import AdminProviders from "../../components/AdminProviders";
import { LayoutDashboard, Users, MapPin, Star, Megaphone } from "lucide-react";
import AdminLogoutBtn from "@/components/AdminLogoutBtn";
import { authOptions } from "@/utils/authOptions";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <AdminProviders>
            <div className="min-h-screen bg-zinc-100 flex">
                {session && (
                    <aside className="w-64 bg-zinc-900 text-white flex flex-col fixed h-full z-50">
                        <div className="p-6 border-b border-zinc-800">
                            <h1 className="text-2xl font-black italic text-steez-orange">STIZ ADMIN</h1>
                            <p className="text-xs text-zinc-500 mt-1">Management Console</p>
                        </div>
                        <nav className="flex-1 p-4 space-y-2">
                            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors bg-white/5">
                                <LayoutDashboard size={20} />
                                <span className="font-bold">대시보드</span>
                            </Link>
                            <Link href="/admin/design" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors text-steez-orange">
                                <span className="font-bold">🎨 비주얼 에디터</span>
                            </Link>
                            <Link href="/admin/hero" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                                <span className="font-bold">메인 관리</span>
                            </Link>
                            <Link href="/admin/coaches" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                                <Users size={20} />
                                <span className="font-bold">코치진 관리</span>
                            </Link>
                            <Link href="/admin/notices" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                                <Megaphone size={20} />
                                <span className="font-bold">공지사항</span>
                            </Link>
                            <Link href="/admin/features" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                                <Star size={20} />
                                <span className="font-bold">특징(Why Stiz)</span>
                            </Link>
                            <Link href="/admin/curriculum" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                                <span className="font-bold">시간표(시트연동)</span>
                            </Link>
                            <Link href="/admin/locations" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                                <MapPin size={20} />
                                <span className="font-bold">지점 관리</span>
                            </Link>
                        </nav>
                        <div className="p-4 border-t border-zinc-800">
                            <AdminLogoutBtn />
                        </div>
                    </aside>
                )}

                <main className={`flex-1 p-8 ${session ? "ml-64" : ""}`}>
                    {children}
                </main>
            </div>
        </AdminProviders>
    );
}
