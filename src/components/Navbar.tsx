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
    const { user, setUser} = useContext(UserContext as React.Context<UserContextType>)
console.log('user',user)

useEffect(() => {
  // Define an async function inside useEffect
  const fetchUserId = async () => {
    if (session?.user) {
      const userId = await retrieveUserId(session.user.email || '');
      // Define a user object that matches the expected type  
      const userData = {
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        id: userId ?? '', // Await the user ID before setting it
        password: null, // Password is not included in session, so we set it as null
        createdAt: new Date(), // Set the creation date based on your requirements
        updatedAt: new Date(), // Set the update date based on your requirements
      };
      setUser(userData);
    }
  };

  fetchUserId(); // Call the async function inside useEffect
}, [session]);


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
        {session && user && (
          <li>
            <Link 
              className={`link ${pathname === '/dashboard' ? 'active' : ''}`}
              href='/dashboard'>
              <p>Dashboard</p>
            </Link>
          </li>
        )}

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