import { UserProfile } from '@/components/UserProfile';

export const dynamic = 'force-dynamic';

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <UserProfile username={params.username} />
    </div>
  );
}

// 删除或注释掉 generateStaticParams 函数
