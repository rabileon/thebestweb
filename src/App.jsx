import { Button } from '@/components/ui/button';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import FileListVideo from './components/FileListVideo';
import FileListAudio from './components/FileListAudio';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return (
    <>
      <Navbar />
      <FileListVideo />
    </>
  );
}

export default App;
