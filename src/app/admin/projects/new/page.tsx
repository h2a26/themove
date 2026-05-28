import { createProject } from './actions';
import { ProjectForm } from '../_components/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[4px] text-[var(--mode-text-tertiary)] mb-1">Projects</p>
        <h1 className="text-2xl font-semibold tracking-wide text-[var(--mode-text-primary)]">New Project</h1>
      </div>
      <ProjectForm action={createProject} />
    </div>
  );
}
