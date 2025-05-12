import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className='bg-white shadow-md px-6 py-4 dark:bg-gray-900'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div className='text-xl font-bold text-gray-800 dark:text-white'>
          The Best Mix App
        </div>

        {/* Menú desktop */}
        <nav className='hidden md:flex gap-6'>
          <a
            href='/'
            className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          >
            Inicio
          </a>
          <a
            href='/archivos'
            className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          >
            Videos
          </a>
          <a
            href='/configuracion'
            className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          >
            Audio
          </a>
        </nav>

        {/* Usuario + botón hamburguesa */}
        <div className='flex items-center gap-3'>
          <span className='hidden sm:inline text-gray-700 dark:text-gray-300'>
            Hola, Rabi
          </span>
          <Avatar>
            <AvatarImage src='' alt='avatar' />
            <AvatarFallback>RL</AvatarFallback>
          </Avatar>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={toggleMenu}
          >
            {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
        </div>
      </div>

      {/* Menú móvil colapsable */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='flex flex-col md:hidden mt-3 gap-2'
        >
          <a
            href='/'
            className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          >
            Inicio
          </a>
          <a
            href='/archivos'
            className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          >
            Archivos
          </a>
          <a
            href='/configuracion'
            className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          >
            Videos
          </a>
        </motion.nav>
      )}
    </header>
  );
}
