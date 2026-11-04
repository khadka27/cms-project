'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  FlaskConical,
  FileText,
  Search,
  Sparkles,
  User,
  Package,
  Eye,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
} from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUpload from '@/components/admin/ImageUpload';

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-bright_teal_blue focus:border-transparent bg-white transition-all';

interface IngredientEditorData {
  id?: string;
  articleId?: string | null;
  name: string;
  slug: string;
  description: string;
  content: string;
  keyFeatures: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  authorId: string;
  status: 'PUBLISHED' | 'DRAFT';
  productIds: string[];
}

interface Props {
  initialData?: any;
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  accent = 'teal',
  children,
  collapsible = false,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  accent?: string;
  children: React.ReactNode;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const accents: Record<string, string> = {
    teal: 'from-french_blue via-bright_teal_blue to-turquoise_surf',
    violet: 'from-deep_twilight to-french_blue',
    sky: 'from-turquoise_surf to-sky_aqua',
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${accents[accent] || accents.teal}`} />
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        className={`w-full px-6 py-4.5 border-b border-gray-50 flex items-center gap-3.5 ${
          collapsible ? 'cursor-pointer hover:bg-gray-50/60' : 'cursor-default'
        }`}
      >
        <div
          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${
            accents[accent] || accents.teal
          } flex items-center justify-center flex-shrink-0 shadow-sm shadow-bright_teal_blue/20`}
        >
          <Icon className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {collapsible &&
          (open ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ))}
      </button>
      {(!collapsible || open) && <div className="p-6 space-y-5">{children}</div>}
    </div>
  );
}

export default function IngredientEditor({ initialData }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  const [form, setForm] = useState<IngredientEditorData>({
    id: initialData?.id || undefined,
    articleId: initialData?.articleId || null,
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    keyFeatures: initialData?.keyFeatures || '',
    image: initialData?.image || '',
    imageAlt: initialData?.imageAlt || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    metaKeywords: initialData?.metaKeywords || '',
    authorId: initialData?.authorId || '',
    status: (initialData?.status as 'PUBLISHED' | 'DRAFT') || 'PUBLISHED',
    productIds: Array.isArray(initialData?.productIds) ? initialData.productIds : [],
  });

  const [authors, setAuthors] = useState<{ id: string; name: string; title: string | null }[]>([]);
  const [availableProducts, setAvailableProducts] = useState<
    { id: string; name: string; price: number; slug: string }[]
  >([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [slugManual, setSlugManual] = useState(Boolean(initialData?.slug));

  // Load authors and products
  useEffect(() => {
    fetch('/api/authors')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAuthors(data);
      })
      .catch(console.error);

    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.products)) {
          setAvailableProducts(data.products);
        } else if (Array.isArray(data)) {
          setAvailableProducts(data);
        }
      })
      .catch(console.error);
  }, []);

  // Update slug automatically when typing name unless manually changed
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, name: newName };
      if (!slugManual) {
        updated.slug = newName
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      }
      return updated;
    });
  };

  const set = (key: keyof IngredientEditorData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // Word count & Read time calculation
  const plainText = form.content.replace(/<[^>]*>/g, '').trim();
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const handleSubmit = async (e?: React.FormEvent, targetStatus?: 'PUBLISHED' | 'DRAFT') => {
    if (e) e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const statusToSave = targetStatus || form.status;
      const url = isEdit ? `/api/ingredients/${initialData.id}` : '/api/ingredients';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          status: statusToSave,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to save ingredient');
      }

      const result = await res.json();
      setSaved(true);

      if (!isEdit && result?.id) {
        router.push(`/admin/ingredients/${result.id}`);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to save ingredient. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin/ingredients"
            className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-french_blue to-bright_teal_blue flex items-center justify-center shadow-md shadow-bright_teal_blue/20">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {isEdit ? 'Edit Ingredient' : 'New Ingredient'}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  form.status === 'PUBLISHED'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {form.status === 'PUBLISHED' ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit
                ? `Update monograph, editorial article, and SEO for /ingredients/${form.slug}`
                : 'Create a new supplement ingredient monograph and guide'}
            </p>
          </div>
        </div>

        {form.slug && (
          <div className="flex items-center gap-2">
            <Link
              href={`/ingredients/${form.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-french_blue bg-light_cyan/40 hover:bg-light_cyan/70 border border-turquoise_surf/40 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live</span>
              <ExternalLink className="w-3 h-3 text-french_blue/70" />
            </Link>
          </div>
        )}
      </div>

      {/* ── Status Messages ── */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-3.5 rounded-2xl text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3.5 rounded-2xl text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span className="font-medium">Ingredient and editorial article saved successfully!</span>
        </div>
      )}

      {/* ── Main Two-Column Layout ── */}
      <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Primary Content & SEO */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Main Monograph & Article */}
          <SectionCard
            icon={FileText}
            title="Ingredient & Article Content"
            subtitle="Title, URL slug, monograph description, and full editorial article body"
            accent="teal"
          >
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Ingredient Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.name}
                onChange={handleNameChange}
                className={`${inputCls} text-base font-semibold`}
                placeholder="e.g. Vitamina D3 (Colecalciferol) or Magnesio Bisglicinato"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-french_blue bg-light_cyan/40 px-2 py-0.5 rounded-md">
                  /ingredients/{form.slug || 'your-slug'}
                </span>
              </div>
              <input
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugManual(true);
                  set('slug')(e);
                }}
                className={`${inputCls} font-mono text-sm`}
                placeholder="vitamina-d3-colecalciferol"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Scientific Overview & Short Description
              </label>
              <textarea
                value={form.description}
                onChange={set('description')}
                rows={3}
                className={`${inputCls} resize-none leading-relaxed`}
                placeholder="Brief scientific definition and primary physiological benefits (1–3 sentences)..."
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Used in the ingredient directory cards, page header lead paragraph, and meta fallback.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Full Editorial Article Body (CMS Content)
                </label>
                <span className="text-xs text-gray-400">
                  {wordCount} words · {readTime} min read
                </span>
              </div>
              <RichTextEditor
                value={form.content}
                onChange={(val) => setForm((p) => ({ ...p, content: val }))}
                placeholder="Write the in-depth ingredient article... Type / for headings, tables, callout boxes, and lists."
              />
              <p className="text-[11px] text-gray-400 mt-1.5">
                Tip: Use headings (H2, H3), clinical comparison tables, and FAQ questions to maximize SEO and readability.
              </p>
            </div>
          </SectionCard>

          {/* Section 2: Clinical Key Features */}
          <SectionCard
            icon={Sparkles}
            title="Clinical Highlights & Key Features"
            subtitle="Key bullet points displayed in the monograph highlights strip"
            accent="sky"
          >
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Highlights (One per line)
              </label>
              <textarea
                value={form.keyFeatures}
                onChange={set('keyFeatures')}
                rows={4}
                className={`${inputCls} font-mono text-xs leading-relaxed`}
                placeholder="Eficacia de elevación sérica superior a la vitamina D2&#10;Esencial para la activación de células del sistema inmune&#10;Acción sinérgica con vitamina K2 para fijación ósea&#10;Soluble en grasas para una óptima absorción oral"
              />
              <p className="text-[11px] text-gray-400 mt-1.5">
                Each line becomes a verified bullet point with a check badge on the ingredient page.
              </p>
            </div>
          </SectionCard>

          {/* Section 3: SEO Settings & SERP Preview */}
          <SectionCard
            icon={Search}
            title="SEO Settings & Google Preview"
            subtitle="Meta title, description, keywords, and live search snippet"
            accent="violet"
            collapsible
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Meta Title
                </label>
                <span
                  className={`text-xs font-bold ${
                    form.metaTitle.length > 60 ? 'text-amber-500' : 'text-gray-400'
                  }`}
                >
                  {form.metaTitle.length}/60 chars
                </span>
              </div>
              <input
                value={form.metaTitle}
                onChange={set('metaTitle')}
                className={inputCls}
                placeholder={form.name ? `${form.name} — Guía Científica y Beneficios` : 'SEO Title'}
              />
              {form.metaTitle.length > 60 && (
                <p className="text-xs text-amber-500 mt-1 font-medium">
                  Title is over 60 characters; search engines may truncate it.
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Meta Description
                </label>
                <span
                  className={`text-xs font-bold ${
                    form.metaDescription.length > 160 ? 'text-amber-500' : 'text-gray-400'
                  }`}
                >
                  {form.metaDescription.length}/160 chars
                </span>
              </div>
              <textarea
                value={form.metaDescription}
                onChange={set('metaDescription')}
                rows={3}
                className={`${inputCls} resize-none`}
                placeholder={
                  form.description ||
                  'Análisis científico, evidencia clínica, dosis recomendadas y combinaciones óptimas.'
                }
              />
              {form.metaDescription.length > 160 && (
                <p className="text-xs text-amber-500 mt-1 font-medium">
                  Description is over 160 characters; keep under 160 for best SERP appearance.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Meta Keywords
              </label>
              <input
                value={form.metaKeywords}
                onChange={set('metaKeywords')}
                className={inputCls}
                placeholder="vitamina d3, colecalciferol, absorcion, dosis optima, salud osea"
              />
              <p className="text-[11px] text-gray-400 mt-1">Comma-separated terms</p>
            </div>

            {/* Google SERP Card Preview */}
            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200/80">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Google Search Result Preview
              </p>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-mono truncate">
                  https://nutritionalreviews.org/ingredients/{form.slug || 'slug'}
                </p>
                <h4 className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1">
                  {form.metaTitle || form.name || 'Título de Ingrediente'} | NutritionalReviews
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {form.metaDescription ||
                    form.description ||
                    'Perfil científico, evidencia médica, dosis recomendadas y suplementos evaluados.'}
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right Column (4 cols): Sidebar settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publish & Actions Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: 'PUBLISHED' }))}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    form.status === 'PUBLISHED'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: 'DRAFT' }))}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    form.status === 'DRAFT'
                      ? 'bg-white text-amber-700 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-french_blue to-bright_teal_blue hover:from-deep_twilight hover:to-french_blue text-white font-bold text-sm shadow-md shadow-bright_teal_blue/20 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isEdit ? 'Update Ingredient' : 'Create Ingredient'}</span>
                  </>
                )}
              </button>

              {form.slug && (
                <Link
                  href={`/ingredients/${form.slug}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview Page</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>
              )}

              <Link
                href="/admin/ingredients"
                className="w-full flex items-center justify-center py-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel and return
              </Link>
            </div>
          </div>

          {/* Scientific Author / Reviewer Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-50">
              <User className="w-4 h-4 text-french_blue" />
              <h3 className="text-sm font-bold text-gray-900">Medical & Scientific Reviewer</h3>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Assign Author / Expert
              </label>
              <select
                value={form.authorId}
                onChange={set('authorId')}
                className={inputCls}
              >
                <option value="">— Select Scientific Reviewer —</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} {a.title ? `(${a.title})` : ''}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-gray-400 mt-1.5">
                Displays author byline, credentials, avatar, and verification badge.
              </p>
            </div>
          </div>

          {/* Featured Image & Thumbnail */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-50">
              Thumbnail & Featured Image
            </h3>
            <ImageUpload
              value={form.image}
              onChange={(url) => setForm((p) => ({ ...p, image: url }))}
              alt={form.imageAlt}
              onAltChange={(alt) => setForm((p) => ({ ...p, imageAlt: alt }))}
            />
          </div>

          {/* Associated Products */}
          {availableProducts.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-bright_teal_blue" />
                  <h3 className="text-sm font-bold text-gray-900">Associated Products</h3>
                </div>
                <span className="text-xs text-gray-400 font-bold">
                  {form.productIds.length} linked
                </span>
              </div>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {availableProducts.map((p) => {
                  const checked = form.productIds.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        checked
                          ? 'border-bright_teal_blue/50 bg-light_cyan/30 text-slate-900 font-bold'
                          : 'border-gray-100 hover:bg-gray-50 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setForm((prev) => ({
                            ...prev,
                            productIds: checked
                              ? prev.productIds.filter((id) => id !== p.id)
                              : [...prev.productIds, p.id],
                          }));
                        }}
                        className="rounded border-gray-300 text-bright_teal_blue focus:ring-bright_teal_blue"
                      />
                      <span className="truncate flex-1">{p.name}</span>
                      {p.price > 0 && (
                        <span className="text-gray-400 font-normal shrink-0">
                          ${p.price.toFixed(2)}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
