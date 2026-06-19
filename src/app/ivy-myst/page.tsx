import { getProject } from '@/data/projects'
import ProjectTemplate from '@/components/project/ProjectTemplate'

export const metadata = {
  title: 'Ivy Myst — Launching Soon | The Ivy Group',
  description: 'Luxury 1, 2 & 3 bedroom residences in Kileleshwa. Pre-launch sales open. 0% transaction fees for a limited time.',
}

export default function IvyMystPage() {
  const data = getProject('ivy-myst')!
  return <ProjectTemplate data={data} />
}
