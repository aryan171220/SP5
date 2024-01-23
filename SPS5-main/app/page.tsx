import Image from 'next/image'
import Homepage  from './Homepage/page'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Homepage/>
    </main>
  )
}
