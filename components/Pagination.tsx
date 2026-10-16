import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-bright_teal_blue disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              currentPage === page
                ? 'bg-gradient-to-r from-french_blue to-bright_teal_blue text-white shadow-lg shadow-bright_teal_blue/25 ring-2 ring-bright_teal_blue/30'
                : 'bg-white border border-slate-100 text-slate-600 hover:border-turquoise_surf/40 hover:bg-light_cyan/20'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-bright_teal_blue disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
