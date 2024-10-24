'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {
    const { data: session, status } = useSession()
    const pathname = usePathname()

  return (
    <nav className='header flex gap-2 justify-between'>
      <h1 className='logo'>
      {session ? (
        <p>Welcome, {session.user?.name || 'User'}!</p>
        )  
        : (<a href='#'>NextAuth</a>)
        }
        
      </h1>
      <ul className={`main-nav flex gap-2 ${(!session && (status === "loading") ) ? 'loading' : 'loaded'}`}>
        <li>
          <Link 
            className={`link ${pathname === '/' ? 'active' : ''}`}
            href='/'>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link 
            className={`link ${pathname === '/dashboard' ? 'active' : ''}`}
            href='/dashboard'>
            <p>Dashboard</p>
          </Link>
        </li>

        {(status !== "authenticated")  && !session && (
          <li>
            <Link href='/api/auth/signin'>
              <p
                onClick={e => {
                  e.preventDefault()
                  signIn('github')
                }}>
                Sign In
              </p>
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link href='/api/auth/signout'>
              <p
                onClick={e => {
                  e.preventDefault()
                  signOut()
                }}>
                Sign Out
              </p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar