// columns.jsx
import { Play, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import moment from 'moment';

export const columns = (handlePlay, selectedFile) => [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const file = row.original;
      const isSelected = selectedFile?.fileId === file.fileId;
      const fileUrl = `https://api-drive-demo-production.up.railway.app/api/cloud/preview/${file.fileId}`;

      const extension = file.extension?.toLowerCase(); // Aseguramos minúsculas
      const isAudio = ['mp3', 'wav'].includes(extension);
      const isVideo = ['mp4', 'webm'].includes(extension);

      return (
        <div className='space-y-2'>
          <button onClick={() => handlePlay(file)} className='hover:underline'>
            {file.name}
          </button>

          {isSelected && (
            <div>
              {isVideo ? (
                <div className='w-full mt-4 rounded-2xl shadow-lg ring-1 ring-gray-300 dark:ring-gray-600 transition-all duration-300 hover:ring-primary focus:outline-none'>
                  <video
                    controls
                    autoPlay
                    src={fileUrl}
                    className='w-full rounded-2xl'
                    onEnded={() => handlePlay(null)}
                  />
                </div>
              ) : isAudio ? (
                <audio
                  controls
                  autoPlay
                  src={fileUrl}
                  className='w-full'
                  onEnded={() => handlePlay(null)}
                />
              ) : (
                <div className='text-sm text-muted-foreground'>
                  Archivo no compatible para vista previa
                </div>
              )}
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: 'folderName',
    header: 'Género',
    cell: ({ row }) => (
      <div className='text-muted-foreground'>{row.original.genre}</div>
    ),
  },
  {
    accessorKey: 'dateModifiedFile',
    header: 'Fecha',
    cell: ({ row }) => (
      <div className='text-muted-foreground'>
        {moment(row.original.dateModifiedFile).format('DD/MMM/YYYY HH:mm')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const file = row.original;

      const handleDownload = (file) => {
        // Suponiendo que el archivo tiene una propiedad `fileUrl` que contiene la URL del archivo para descargar
        const fileUrl = file.fileUrl; // Reemplaza con la propiedad correcta de tu objeto `file`

        // Crear un enlace de descarga y hacer clic en él
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = file.name; // Aquí puedes cambiar el nombre de archivo si lo necesitas
        link.click();
      };

      return (
        <div className='flex space-x-2'>
          {/* Botón para reproducir */}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handlePlay(file)}
            title='Reproducir'
          >
            <Play className='w-5 h-5 text-primary' />
          </Button>

          {/* Botón para descargar */}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleDownload(file)}
            title='Descargar'
          >
            <Download className='w-5 h-5 text-primary' />
          </Button>
        </div>
      );
    },
  },
];
