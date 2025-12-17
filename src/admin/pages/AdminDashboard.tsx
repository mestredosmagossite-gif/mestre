import { useState, useEffect } from 'react';
import { LogOut, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { getProductImages, SiteImage } from '../utils/supabase-admin';
import ProductCardAdmin from '../components/ProductCardAdmin';

export default function AdminDashboard() {
  const [products, setProducts] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, signOut } = useAuth();

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProductImages();
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Erro ao sair:', err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <header className="bg-neutral-800 border-b border-amber-600/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-amber-400 tracking-wider">
                MESTRE DOS MAGOS
              </h1>
              <p className="text-xs text-gray-400">Painel Administrativo</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-gray-400">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Gerenciar Imagens dos Produtos
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Clique em "Trocar Imagem" para atualizar qualquer produto
            </p>
          </div>

          <button
            onClick={loadProducts}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/30 text-amber-400 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-800 rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-neutral-700"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                    <div className="h-3 bg-neutral-700 rounded w-1/2"></div>
                    <div className="h-10 bg-neutral-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-500 text-sm mt-2">
              Adicione produtos no banco de dados para gerenciá-los aqui
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCardAdmin
                key={product.id}
                product={product}
                onUpdate={loadProducts}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
