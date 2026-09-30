import { getProject } from '@/data/projects'
import ProjectTemplate from '@/components/project/ProjectTemplate'

export const metadata = {
  title: 'Luckinn Ivy Residence — Westlands | The Ivy Group',
  description: 'Premium 2 & 3 bedroom apartments on Mogotio Road, Westlands. 20 floors, 120 units in the heart of Nairobi.',
  alternates: { canonical: '/luckinn-ivy' },
}

export default function LuckinnIvyPage() {
  const data = getProject('luckinn-ivy')!
  return <ProjectTemplate data={data} />
}
