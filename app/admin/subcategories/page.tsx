'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, Layers, Leaf, ShoppingCart, AlertCircle, RefreshCw, FolderOpen } from 'lucide-react';
import type { Subcategory } from '@/lib/types';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminSubcategoriesPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'nutra' | 'ecom'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [bulkUpdating, setBulkUpdating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    setDeleteError(null);
    try {
      const url = activeFilter === 'all' 
        ? '/api/subcategories' 
        : `/api/subcategories?type=${activeFilter}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: Failed to load subcategories`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setSubcategories(data);
      } else {
        setSubcategories([]);
        setError(data?.error || 'Invalid data received from server');
      }
    } catch (err: any) {
      console.error('Failed to load subcategories:', err);
      setSubcategories([]);
      setError(err?.message || 'Failed to connect to the server. Please check your connection and try again.');
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
      const res = await fetch(`/api/subcategories/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setDeleteError(data?.error || 'Failed to delete subcategory');
      } else {
        load();
      }
    } catch (err) {
      setDeleteError('An unexpected error occurred while deleting the subcategory');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleType = async (id: string, currentType?: string) => {
    const isCurrentNutra = (currentType || '').toUpperCase() === 'NUTRA';
    const nextType: 'NUTRA' | 'ECOM' = isCurrentNutra ? 'ECOM' : 'NUTRA';

    // Optimistic update
    setSubcategories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, categoryType: nextType } : s))
    );
    setTogglingId(id);

    try {
      const res = await fetch(`/api/subcategories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryType: nextType }),
      });
      if (!res.ok) {
        throw new Error('Failed to update subcategory type');
      }
    } catch (err: any) {
      console.error('Error toggling subcategory type:', err);
      // Revert optimistic update
      setSubcategories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, categoryType: currentType as any } : s))
      );
      setError('No se pudo cambiar el tipo de subcategoría.');
    } finally {
      setTogglingId(null);
    }
  };

  const handleBulkChange = async (targetType: 'NUTRA' | 'ECOM') => {
    if (selectedIds.length === 0) return;
    setBulkUpdating(true);
    const affected = new Set(selectedIds);
    const previous = [...subcategories];

    // Optimistic update
    setSubcategories((prev) =>
      prev.map((s) => (affected.has(s.id) ? { ...s, categoryType: targetType } : s))
    );

    try {
      const res = await fetch('/api/subcategories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, categoryType: targetType }),
      });
      if (!res.ok) {
        throw new Error('Bulk update failed');
      }
      setSelectedIds([]);
    } catch (err) {
      console.error('Error bulk updating subcategories:', err);
      setSubcategories(previous);
      setError('No se pudieron actualizar las subcategorías seleccionadas.');
    } finally {
      setBulkUpdating(false);
    }
  };

  const filtered = useMemo(() => {
    const list = Array.isArray(subcategories) ? subcategories : [];
    if (!search.trim()) return list;
    const term = search.toLowerCase().trim();
    return list.filter((s) => {
      const nameMatch = s.name?.toLowerCase().includes(term);
      const descMatch = s.description?.toLowerCase().includes(term);
      const catMatch = (s as any).category?.name?.toLowerCase().includes(term);
      return Boolean(nameMatch || descMatch || catMatch);
    });
  }, [subcategories, search]);

  const allFilteredSelected = useMemo(() => {
    if (filtered.length === 0) return false;
    return filtered.every((s) => selectedIds.includes(s.id));
  }, [filtered, selectedIds]);

  const isIndeterminate = useMemo(() => {
    if (filtered.length === 0 || allFilteredSelected) return false;
    return filtered.some((s) => selectedIds.includes(s.id));
  }, [filtered, selectedIds, allFilteredSelected]);

  const handleSelectAll = () => {
    if (allFilteredSelected) {
      const filteredIds = new Set(filtered.map((s) => s.id));
      setSelectedIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      const newIds = Array.from(new Set([...selectedIds, ...filtered.map((s) => s.id)]));
      setSelectedIds(newIds);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-french_blue to-bright_teal_blue flex items-center justify-center shadow-sm shadow-bright_teal_blue/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Subcategories</h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {loading ? 'Loading…' : `${subcategories.length} total ${activeFilter !== 'all' ? `(${activeFilter.toUpperCase()})` : ''}`}
            </p>
          </div>
        </div>
        <Link
          href="/admin/subcategories/new"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-french_blue to-bright_teal_blue hover:brightness-110 text-white rounded-xl text-sm font-medium transition-all shadow-sm shadow-bright_teal_blue/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Subcategory
        </Link>
      </div>

      {/* Delete or Load Error Message */}
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

      {/* Filter Tabs & Search Bar */}
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
            All Subcategories
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

        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subcategories…"
            className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-bright_teal_blue/20 focus:border-bright_teal_blue bg-white"
          />
        </div>
      </div>

      {/* Main Content Area */}
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
            <table className="w-full text-sm min-w-[620px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={allFilteredSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isIndeterminate;
                      }}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-french_blue focus:ring-bright_teal_blue cursor-pointer"
                      aria-label="Seleccionar todas las subcategorías"
                    />
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Category</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Type</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 hidden md:table-cell">Description</th>
                  <th className="px-5 py-3 w-20 text-right font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((sub) => {
                  const typeUpper = (sub.categoryType || '').toUpperCase();
                  const isNutra = typeUpper === 'NUTRA';
                  const isSelected = selectedIds.includes(sub.id);
                  const isToggling = togglingId === sub.id;
                  const parentCategory = (sub as any).category;
                  const prodCount = (sub as any)._count?.products ?? ((sub as any).products?.length || 0);

                  return (
                    <tr
                      key={sub.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-sky-50/50 hover:bg-sky-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(sub.id)}
                          className="w-4 h-4 rounded border-gray-300 text-french_blue focus:ring-bright_teal_blue cursor-pointer"
                          aria-label={`Seleccionar ${sub.name}`}
                        />
                      </td>

                      {/* Name & Image */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100 flex items-center justify-center">
                            {sub.image ? (
                              <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                            ) : (
                              <Layers className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 block">{sub.name}</span>
                            <span className="text-[11px] text-gray-400 font-mono">/{sub.slug}</span>
                          </div>
                        </div>
                      </td>

                      {/* Parent Category */}
                      <td className="px-5 py-3.5">
                        {parentCategory ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700">
                            <FolderOpen className="w-3.5 h-3.5 text-gray-400" />
                            <span>{parentCategory.name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">None</span>
                        )}
                      </td>

                      {/* Type badge */}
                      <td className="px-5 py-3.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleType(sub.id, sub.categoryType);
                          }}
                          disabled={isToggling}
                          title={`Click para cambiar a ${isNutra ? 'E-Com' : 'Nutra'}`}
                          className={`group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border active:scale-95 shadow-xs ${
                            isNutra
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                              : 'bg-sky-50 text-french_blue border-sky-200 hover:bg-sky-100 hover:border-sky-300'
                          } ${isToggling ? 'opacity-60 pointer-events-none' : ''}`}
                        >
                          {isToggling ? (
                            <RefreshCw className="w-3 h-3 animate-spin text-gray-500" />
                          ) : isNutra ? (
                            <Leaf className="w-3 h-3 text-emerald-600 group-hover:rotate-12 transition-transform" />
                          ) : (
                            <ShoppingCart className="w-3 h-3 text-french_blue group-hover:scale-110 transition-transform" />
                          )}
                          <span>{isNutra ? 'Nutra' : 'E-Com'}</span>
                          <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity ml-0.5">⇄</span>
                        </button>
                      </td>

                      {/* Description & Product count */}
                      <td className="px-5 py-3.5 text-gray-400 hidden md:table-cell">
                        <div className="max-w-xs">
                          <span className="line-clamp-1 text-gray-600">{sub.description || '—'}</span>
                          <span className="text-[11px] text-gray-400">{prodCount} product(s)</span>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Link
                            href={`/admin/subcategories/${sub.id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-bright_teal_blue hover:bg-light_cyan/20 transition-colors"
                            title="Edit Subcategory"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Subcategory"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete subcategory?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  <strong>{sub.name}</strong> will be permanently deleted.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(sub.id)}
                                  disabled={deletingId === sub.id}
                                  className="rounded-xl bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer"
                                >
                                  {deletingId === sub.id ? 'Deleting…' : 'Delete'}
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
                <Layers className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-medium">
                {search ? 'No subcategories match your search' : 'No subcategories found in this category'}
              </p>
              {!search && (
                <Link href="/admin/subcategories/new" className="text-xs text-bright_teal_blue hover:underline font-semibold">
                  Create your first subcategory →
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900/95 text-white backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-gray-700/60 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 pr-3 border-r border-gray-700 text-xs font-semibold text-gray-200">
            <span className="w-5 h-5 rounded-full bg-bright_teal_blue text-white flex items-center justify-center text-[11px] font-bold">
              {selectedIds.length}
            </span>
            <span>seleccionados</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={bulkUpdating}
              onClick={() => handleBulkChange('NUTRA')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Leaf className="w-3.5 h-3.5" />
              {bulkUpdating ? 'Cambiando…' : 'Cambiar a Nutra'}
            </button>
            <button
              type="button"
              disabled={bulkUpdating}
              onClick={() => handleBulkChange('ECOM')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {bulkUpdating ? 'Cambiando…' : 'Cambiar a E-Com'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer ml-1 underline underline-offset-2"
          >
            Deseleccionar
          </button>
        </div>
      )}
    </div>
  );
}
