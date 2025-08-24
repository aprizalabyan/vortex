// import { cookies } from 'next/headers';
// import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// export const setCookie = async (name: string, value: string, options?: Partial<ResponseCookie>) => {
//   (await cookies()).set(name, value, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     path: '/',
//     ...options
//   });
// };

// export const getCookie = async (name: string) => {
//   return (await cookies()).get(name);
// };

// export const deleteCookie = async (name: string) => {
//   (await cookies()).delete(name);
// };

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  return null
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}