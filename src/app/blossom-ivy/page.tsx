import { getProject } from '@/data/projects'
import ProjectTemplate from '@/components/project/ProjectTemplate'

export const metadata = {
  title: 'Blossom Ivy Residence — Kileleshwa | The Ivy Group',
  description: "Luxury 3 & 4 bedroom apartments on Gatundu Road, Kileleshwa. 22 floors, 220 units. Nairobi's finest residential address.",
  alternates: { canonical: '/blossom-ivy' },
}

export default function BlossomIvyPage() {
  const data = getProject('blossom-ivy')!
  return <ProjectTemplate data={data} />
}
