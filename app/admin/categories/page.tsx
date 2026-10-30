'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, FolderOpen, Leaf, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import type { Category } from '@/lib/types';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'nutra' | 'ecom'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    setDeleteError(null);
    try {
      const url = activeFilter === 'all' 
        ? '/api/categories' 
        : `/api/categories?type=${activeFilter}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: Failed to load categories`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]);
        setError(data?.error || 'Invalid data received from server');
      }
    } catch (err: any) {
      console.error('Failed to load categories:', err);
      setCategories([]);
      setError(err?.message || 'Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [activeFilter]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setDeleteError(data?.error || 'Failed to delete category');
      } else {
        load();
      }
    } catch (err) {
      setDeleteError('An unexpected error occurred while deleting the category');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];
    if (!search.trim()) return list;
    const term = search.toLowerCase().trim();
    return list.filter((c) => {
      const nameMatch = c.name?.toLowerCase().includes(term);
      const descMatch = c.description?.toLowerCase().includes(term);
      return Boolean(nameMatch || descMatch);
    });
  }, [categories, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-french_blue to-bright_teal_blue flex items-center justify-center shadow-sm">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {loading ? 'Loading…' : `${categories.length} total ${activeFilter !== 'all' ? `(${activeFilter.toUpperCase()})` : ''}`}
            </p>
          </div>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-french_blue to-bright_teal_blue hover:brightness-110 text-white rounded-xl text-sm font-medium transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Link>
      </div>

      {deleteError && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{deleteError}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reintentar
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white shadow-xs text-gray-900 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            All Categories
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('nutra')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'nutra'
                ? 'bg-white shadow-xs text-emerald-700 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Nutra
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('ecom')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'ecom'
                ? 'bg-white shadow-xs text-french_blue font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-french_blue" /> E-Commerce
          </button>
        </div>

        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories…"
            className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-bright_teal_blue focus:border-transparent bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-0.5 bg-gradient-to-r from-french_blue via-bright_teal_blue to-turquoise_surf" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Type</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 hidden md:table-cell">Description</th>
                  <th className="px-5 py-3 w-20 text-right font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((cat) => {
                  const isNutra = (cat.type || '').toUpperCase() === 'NUTRA';
                  return (
                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100 flex items-center justify-center">
                            {cat.image ? (
                              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            ) : (
                              <FolderOpen className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 block">{cat.name}</span>
                            <span className="text-[11px] text-gray-400 font-mono">/{cat.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {isNutra ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <Leaf className="w-3 h-3 text-emerald-600" /> Nutra
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-french_blue border border-sky-200/60">
                            <ShoppingCart className="w-3 h-3 text-french_blue" /> E-Com
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-gray-400 hidden md:table-cell">
                        <span className="line-clamp-1 max-w-xs">{cat.description || '—'}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Link
                            href={`/admin/categories/${cat.id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-bright_teal_blue hover:bg-light_cyan/30 transition-colors"
                            title="Edit Category"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Category"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete category?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  <strong>{cat.name}</strong> will be permanently deleted.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(cat.id)}
                                  disabled={deletingId === cat.id}
                                  className="rounded-xl bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer"
                                >
                                  {deletingId === cat.id ? 'Deleting…' : 'Delete'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-medium">{search ? 'No categories match your search' : 'No categories found'}</p>
              {!search && (
                <Link href="/admin/categories/new" className="text-xs text-bright_teal_blue hover:underline font-semibold">
                  Create your first category →
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
