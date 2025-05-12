import { Button } from '@/components/ui/button';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import FileListVideo from './components/FileListVideo';
import FileListAudio from './components/FileListAudio';
import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import data from './data.json';
import { ThemeProvider } from './components/theme-provider';

function App() {
  // useEffect(() => {
  //   document.documentElement.classList.add('dark');
  // }, []);
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <SidebarProvider>
        <AppSidebar variant='inset' />
        <SidebarInset>
          <SiteHeader />
          <div className='flex flex-1 flex-col'>
            <div className='@container/main flex flex-1 flex-col gap-2'>
              <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                <div className='px-4 lg:px-6'></div>
                <FileListVideo />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
