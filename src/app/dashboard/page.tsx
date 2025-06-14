
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await signOut(auth);
      Swal.fire('Logged out!', '', 'success');
      router.push('/login');
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome, {user?.displayName || user?.email || 'User'} 👋
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Add dashboard content cards or widgets here */}
          <div className="bg-blue-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-700">Your Stats</h2>
            <p className="text-gray-700 mt-2">Coming soon...</p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-green-700">Recent Activity</h2>
            <p className="text-gray-700 mt-2">Nothing yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
