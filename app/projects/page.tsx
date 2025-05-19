// app/projects/page.tsx
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { prisma } from '@/lib/prisma'
import { Search, Clock, Users, CheckCircle, Plus } from "lucide-react"
import { format } from "date-fns"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export const revalidate = 0 // opsiyonel, sayfa her istekte yeniden üretilsin

async function getProjects() {
  return prisma.project.findMany({
    include: { users: true },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <DashboardLayout>
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projeler</h1>
      {projects.length === 0 && <p>Henüz proje yok.</p>}
        <Card>
                        <CardHeader>
                                  <ul>
      
        {projects.map(project => (
          <li key={project.id} className="border p-4 mb-3 rounded">
            <CardTitle> <h2 className="text-xl font-semibold">{project.title}</h2></CardTitle>
            
            <p>{project.description}</p>
            <p className="text-sm mt-2 font-medium">Projede çalışanlar:</p>
            <CardContent> <ul className="list-disc list-inside">
              {project.users.map(user => (
                <li key={user.id}>{user.name || user.email}</li>
              ))}
            </ul></CardContent>
           
          </li>
        ))}
      </ul> </CardHeader>

       
        </Card>
     
    </main>
    </DashboardLayout>
  )
}
