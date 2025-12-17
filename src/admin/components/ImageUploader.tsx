import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';

interface ImageUploaderProps {
  currentImageUrl: string;
  onUpload: (file: File) => Promise<void>;
  onClose: () => void;
}

export default function ImageUploader({ currentImageUrl, onUpload, onClose }: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter menos de 5MB');
      return;
    }

    setSelectedFile(file);
    setError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError('');

    try {
      await onUpload(selectedFile);
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer upload';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-800 border border-amber-600/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-800 border-b border-amber-600/20 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-amber-400">Trocar Imagem</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Imagem Atual</h3>
            <img
              src={currentImageUrl}
              alt="Imagem atual"
              className="w-full h-48 object-cover rounded-lg border border-amber-600/20"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Nova Imagem</h3>

            {!previewUrl ? (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-amber-600/30 hover:border-amber-500 rounded-lg transition-colors group"
                  >
                    <ImageIcon className="h-12 w-12 text-amber-500 group-hover:text-amber-400 transition-colors" />
                    <div className="text-center">
                      <p className="text-white font-medium">Selecionar da Galeria</p>
                      <p className="text-sm text-gray-400 mt-1">JPG, PNG até 5MB</p>
                    </div>
                  </button>

                  <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-amber-600/30 hover:border-amber-500 rounded-lg transition-colors cursor-pointer group">
                    <Camera className="h-12 w-12 text-amber-500 group-hover:text-amber-400 transition-colors" />
                    <div className="text-center">
                      <p className="text-white font-medium">Tirar Foto</p>
                      <p className="text-sm text-gray-400 mt-1">Usar câmera</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border border-amber-600/20"
                />
                <button
                  onClick={() => {
                    setPreviewUrl(null);
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Escolher outra imagem
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-gray-600 disabled:to-gray-500 text-black font-semibold rounded-lg transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Confirmar Upload
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
