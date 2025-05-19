// app/dashboard/page.tsx (SERVER COMPONENT)
import DashboardPage from "./dashboard-client"
import { prisma } from "@/lib/prisma"

export default async function Dashboard() {
  const userCount = await prisma.user.count()

  return <DashboardPage userCount={userCount} />
}
