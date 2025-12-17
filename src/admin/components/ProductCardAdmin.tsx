import { useState } from 'react';
import { Image as ImageIcon, Check } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { updateProductImage, SiteImage } from '../utils/supabase-admin';
import { useAuth } from '../auth/AuthContext';

interface ProductCardAdminProps {
  product: SiteImage;
  onUpdate: () => void;
}

export default function ProductCardAdmin({ product, onUpdate }: ProductCardAdminProps) {
  const [showUploader, setShowUploader] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleUpload = async (file: File) => {
    if (!user?.email) throw new Error('Usuário não autenticado');

    await updateProductImage(product.id, file, user.email);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    onUpdate();
  };

  return (
    <>
      <div className="group relative bg-neutral-900 border border-amber-600/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.image_title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          {success && (
            <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg animate-fade-in">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-white font-semibold mb-1 text-sm line-clamp-1">
            {product.image_title}
          </h3>
          <p className="text-gray-400 text-xs mb-3">Ordem: {product.display_order}</p>

          <button
            onClick={() => setShowUploader(true)}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
          >
            <ImageIcon className="h-4 w-4" />
            Trocar Imagem
          </button>
        </div>
      </div>

      {showUploader && (
        <ImageUploader
          currentImageUrl={product.image_url}
          onUpload={handleUpload}
          onClose={() => setShowUploader(false)}
        />
      )}
    </>
  );
}
