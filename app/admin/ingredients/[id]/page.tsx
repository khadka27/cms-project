'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import IngredientEditor from '@/components/admin/IngredientEditor';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditIngredientPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [ingredient, setIngredient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/ingredients/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          const errData = await r.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to load ingredient');
        }
        return r.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setIngredient(data);
        } else {
          setError(data?.error || 'Ingredient not found');
        }
      })
      .catch((err: any) => {
        console.error('Error fetching ingredient:', err);
        setError(err.message || 'Error loading ingredient');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-bright_teal_blue" />
        <p className="text-xs font-bold text-gray-400">Loading ingredient details & CMS content...</p>
      </div>
    );
  }

  if (error || !ingredient) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Ingredient Not Found</h2>
          <p className="text-xs text-gray-500 mt-1">
            {error || 'The requested ingredient could not be loaded.'}
          </p>
        </div>
        <Link
          href="/admin/ingredients"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
        >
          Return to Ingredients List
        </Link>
      </div>
    );
  }

  return <IngredientEditor initialData={ingredient} />;
}
