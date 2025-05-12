import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const FileListVideo = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo seleccionado

  const fetchFiles = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api-drive-demo-production.up.railway.app/api/files?page=${page}&limit=100&extension=mp4`
      );
      const data = await response.json();
      setFiles(data.files);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePlay = (file) => {
    setSelectedFile(file); // Cuando seleccionas un archivo, lo estableces como el archivo seleccionado
  };

  return (
    <div className='p-4 flex flex-col items-center mx-auto max-w-4xl'>
      <h2 className='text-xl font-bold mb-4'>Contenido</h2>

      {/* Archivos */}
      <ul className='w-full divide-y divide-gray-200 dark:divide-gray-700'>
        {files.map((file) => (
          <li key={file.id} className='py-2'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-bold'>{file.name}</p>
                <p className='font-normal text-sm text-gray-500 pt-2'>
                  {file.folderName}
                </p>
              </div>

              <button
                onClick={() => handlePlay(file)} // Al hacer clic, selecciona el archivo
                className='p-2 rounded-full hover:bg-muted transition'
                title='Reproducir'
              >
                <Play className='w-5 h-5 text-primary' />
              </button>
            </div>

            {/* Reproductor solo se muestra si este es el archivo seleccionado */}
            {selectedFile &&
              selectedFile.id === file.id &&
              (console.log('file id ', file.id),
              (
                <div className='mt-4 w-full'>
                  <video controls autoPlay>
                    <source
                      src={`https://api-drive-demo-production.up.railway.app/api/cloud/preview/${file.fileId}`}
                      type='audio/mp3'
                    />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              ))}
          </li>
        ))}
      </ul>

      {/* Paginación con múltiples líneas */}
      <div className='mt-4 w-full'>
        <div className='flex flex-wrap justify-center gap-2'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 bg-muted text-muted-foreground rounded disabled:opacity-50'
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 bg-muted text-muted-foreground rounded disabled:opacity-50'
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileListVideo;
