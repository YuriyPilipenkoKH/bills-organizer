'use client'
import { retrieveUserId } from '@/actions/retrieve-UserId'
import UserContext, { UserContextType } from '@/context/UserContext'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect } from 'react'

function Navbar() {
    const { data: session, status } = useSession()
    const pathname = usePathname()
    const { user,setUser} = useContext(UserContext as React.Context<UserContextType>)

    useEffect(() => {
      // Make sure the session user data fits the expected context type
      if (session?.user) {
        // Create a user object that matches the expected type  
        const userData = {
          name: session.user.name ?? null,
          email: session.user.email ?? null,
          // id:  retrieveUserId() ?? '', // Add your logic to get the user ID (possibly from your database)
          password: null, // Password is not included in session, so we set it as null
          createdAt: new Date(), // Set the creation date based on your requirements
          updatedAt: new Date(), // Set the update date based on your requirements
        }
        setUser(userData)
      }
    }, [session, user])


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