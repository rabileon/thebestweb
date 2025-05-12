import React, { useEffect, useState } from 'react';
import { columns as generateColumns } from '../components/columns';
import { DataTable } from '@/components/data-table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const FileListVideo = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api-drive-demo-production.up.railway.app/api/files?page=${page}&limit=50&extension=mp4`
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
    setSelectedFile(file);
  };

  const getPageItems = () => {
    const maxPagesToShow = 5; // Max number of pages to show before and after the current page
    let pages = [];

    // Display pages before and after the current page
    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= maxPagesToShow ||
        i >= totalPages - maxPagesToShow ||
        (i >= currentPage - Math.floor(maxPagesToShow / 2) &&
          i <= currentPage + Math.floor(maxPagesToShow / 2))
      ) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className='p-4 flex flex-col items-center mx-auto w-full'>
      {/* <h2 className='text-xl font-bold mb-4'>Contenido</h2> */}

      <DataTable
        columns={generateColumns(handlePlay)}
        data={files}
        loading={loading}
      />

      {/* Reproductor de video */}
      {selectedFile && (
        <div className='mt-6 w-full'>
          <h3 className='text-lg font-semibold mb-2'>
            Reproduciendo: {selectedFile.name}
          </h3>
          <video controls autoPlay className='w-full rounded-lg shadow'>
            <source
              src={`https://api-drive-demo-production.up.railway.app/api/cloud/preview/${selectedFile.fileId}`}
              type='video/mp4'
            />
            Tu navegador no soporta el video.
          </video>
        </div>
      )}

      <Pagination>
        <PaginationContent className='mt-4 flex justify-center items-center gap-2'>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {/* Páginas anteriores y actuales */}
          {getPageItems().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Puntos suspensivos si hay más de 5 páginas */}
          {totalPages > 10 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default FileListVideo;
