import Image from "next/image";
import Link from "next/link";
import { ToggleMode } from "./ToggleMode";

const Navbar = () => {
  return (
    <nav className='border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          href='https://www.blockhouse.app/'
          className='flex items-center space-x-3'
        >
          <Image src="/blockhouse.svg" className="bg-white"  alt='Logo' width={35} height={35} />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Blockhouse
          </span>
        </Link>
        <div className='flex'>
          <ToggleMode />

          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-menu'
              >
                <line x1='4' x2='20' y1='12' y2='12' />
                <line x1='4' x2='20' y1='6' y2='6' />
                <line x1='4' x2='20' y1='18' y2='18' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar