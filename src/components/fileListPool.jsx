import { useEffect, useRef, useState } from 'react';
import axios from '../api/axios'; // Asume que tienes un archivo axios.js configurado
import { PaginationComponent } from '@/components/pagination-component'; // Importar el componente de paginación
import { DataTable } from '@/components/data-table';
import { columns as generateColumns } from '../components/columns';
import { useGenre } from '@/context/GenreContext';
import { Search, X } from 'lucide-react'; // O cualquier icono que uses

export function FileListPool() {
  const hasRun = useRef(false);
  const { selectedGenre, setSelectedGenre } = useGenre();
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Función para hacer la solicitud de archivos (todos o búsqueda)
  const fetchFiles = async (page, search = '', genre) => {
    setLoading(true);
    try {
      let response;

      if (search) {
        setSelectedGenre('ALL');
        // Si hay término de búsqueda, hacer solicitud a /files/search
        response = await axios.get('/files/searchFiles', {
          params: {
            page: page,
            limit: 50,
            query: search, // Pasar el término de búsqueda
          },
        });
      } else {
        // Si no hay búsqueda, obtener los archivos con paginación
        response = await axios.get('/files', {
          params: {
            page: page,
            limit: 50,
            genre: genre, // Pasar el género seleccionado
          },
        });
      }

      setFiles(response.data.files);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los archivos cuando se cambie la página o el término de búsqueda
  useEffect(() => {
    if (!hasRun.current) {
      setSelectedGenre('ALL');
      hasRun.current = true;
    }

    fetchFiles(currentPage, searchTerm, selectedGenre); // Pasar el término de búsqueda si existe
  }, [currentPage, searchTerm, selectedGenre]);

  // Manejador de cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  const handlePlay = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className='p-4 flex flex-col items-center mx-auto w-full'>
      {/* Campo de búsqueda */}
      <div className='relative w-full mb-4'>
        <Search
          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
          size={18}
        />
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Buscar por nombre, artista, remix, género...'
          className='pl-10 pr-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary'
        />

        {/* Botón para limpiar búsqueda */}
        {searchTerm && (
          <button
            type='button'
            onClick={() => setSearchTerm('')}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground'
          >
            <X size={18} />
          </button>
        )}
      </div>

      {searchTerm.trim() ? (
        <h2 className='text-xl font-bold mb-4'>
          Resultados de búsqueda:{' '}
          <span className='text-muted-foreground'>
            &quot;{searchTerm}&quot;
          </span>
        </h2>
      ) : (
        <h2 className='text-xl font-bold mb-4'>{selectedGenre}</h2>
      )}
      <DataTable
        columns={generateColumns(handlePlay, selectedFile)}
        data={files}
        loading={loading}
      />

      {/* Paginación */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
