import * as React from 'react';
import logo from '../assets/thebestmix_logo.png'; // ajusta la ruta si estás en otra carpeta
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconVinyl,
} from '@tabler/icons-react';

import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../api/axios'; // Asegúrate de que la ruta sea correcta
import { useRef } from 'react';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: IconListDetails,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: IconChartBar,
    },
    {
      title: 'Projects',
      url: '#',
      icon: IconFolder,
    },
    {
      title: 'Team',
      url: '#',
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase,
    },
    {
      name: 'Reports',
      url: '#',
      icon: IconReport,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const [navMain, setNavMain] = useState([]);
  const called = useRef(false);
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/files/getGenres'); // ajusta a tu ruta real

        const genres = response.data.generos || response.data; // según cómo lo envíes

        const genreItems = genres.map((genre) => ({
          title: genre.name,
          icon: IconVinyl,
        }));

        setNavMain((prev) => [...prev, ...genreItems]);
      } catch (error) {
        console.error('Error cargando géneros:', error);
      }
    };

    fetchGenres();
  }, []); // Solo se ejecuta una vez al montar el componente
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='p-4 flex justify-center items-center'>
              <a href='/'>
                <img src={logo} alt='Logo' className='h-12 w-auto' />
              </a>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {console.log('navMain', navMain)}
        <NavMain items={navMain} />
        {/* <NavDocuments items={navMain} /> */}
        {/* <NavSecondary items={data.navSecondary} className='mt-auto' /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
