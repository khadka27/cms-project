'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleEditor from '@/components/admin/ArticleEditor';

export default function NewArticlePage() {
  const router = useRouter();
  const [createdId, setCreatedId] = useState<string | null>(null);

  const handleSave = async (data: any, publish: boolean) => {
    // If the article has already been created in this session, update it via PUT instead of creating duplicate
    const targetId = createdId || data?.id;

    if (targetId) {
      const status = publish ? 'PUBLISHED' : (data.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT');
      const res = await fetch(`/api/articles/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, status }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update article');
      }
      return await res.json();
    }

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, status: publish ? 'PUBLISHED' : 'DRAFT' }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create article');
    }

    const article = await res.json();
    setCreatedId(article.id);
    if (article.id) {
      router.replace(`/admin/articles/${article.id}`);
    }
    return article;
  };

  return <ArticleEditor onSave={handleSave} />;
}
