import { getCategories } from '@/shared/lib/blob-data';
import { createProject } from './actions';
import { ProjectForm } from '../_components/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function NewProjectPage() {
  const categories = await getCategories().catch(() => []);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-2"
        >
          <ArrowLeft size={12} />
          Projects
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">New Project</h1>
      </div>
      <ProjectForm action={createProject} categories={categories} />
    </div>
  );
}
