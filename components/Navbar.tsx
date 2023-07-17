import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="max-w-2xl mx-auto py-2 lg:max-w-7xl lg:px-8 bg-slate-100 flex justify-center flex-row items-center ">
        <Link href="/">
            <h1 className="text-2xl md:text-4xl font-bold place-content-center">FollowersPlus</h1>
        </Link>
    </nav>
  )
}
