import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  }, [router]);
  return (
    <div className="d-flex flex-column vh-100 vw-100 align-items-center justify-content-center">
      <Image
        src="/logo-synapsis.png"
        width={100}
        height={100}
        alt="Logo Synapsis"
      />
      <h1 className="font-weight-bold mt-5">Synapsis Frontend Developer Test</h1>
    </div>
  );
}
