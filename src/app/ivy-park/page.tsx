import { getProject } from '@/data/projects'
import ProjectTemplate from '@/components/project/ProjectTemplate'

export const metadata = {
  title: 'Ivy Park Residence — Kilimani | The Ivy Group',
  description: '1, 2 & 3 bedroom apartments near Yaya Centre, Kilimani. 660 units across 3 blocks. Early-bird pricing available.',
  alternates: { canonical: '/ivy-park' },
}

export default function IvyParkPage() {
  const data = getProject('ivy-park')!
  return <ProjectTemplate data={data} />
}
