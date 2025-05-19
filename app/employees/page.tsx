import { prisma } from "@/lib/prisma"
import EmployeesClient from "./employees-client"

export default async function EmployeesPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      position: true,
      department: true,
      phone: true,
      description: true,
    },
  })

  return <EmployeesClient users={users} />
}
