"use client"

import React, { useState } from "react"
import { Search } from "lucide-react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface User {
  id: string
  name: string | null
  email: string
  position?: string | null
  department?: string | null
  phone?: string | null
  description?: string | null
}

interface EmployeesClientProps {
  users: User[]
}

function SimpleAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden bg-primary text-primary-foreground rounded-full h-16 w-16 sm:h-20 sm:w-20 text-lg font-medium">
      {initials}
    </div>
  )
}

function DetailAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden bg-primary text-primary-foreground rounded-full h-24 w-24 text-xl font-medium">
      {initials}
    </div>
  )
}

export default function EmployeesClient({ users }: EmployeesClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredEmployees = users.filter(
    (emp) =>
      (emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (emp.position?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (emp.department?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false),
  )

  const handleEmployeeClick = (employee: User) => {
    setSelectedEmployee(employee)
    setIsDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Çalışanlar</h1>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Çalışan ara..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => handleEmployeeClick(employee)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center gap-4">
                  <SimpleAvatar name={employee.name ?? "İsimsiz"} />
                  <div className="space-y-1 text-center">
                    <h3 className="font-medium">{employee.name ?? "İsimsiz"}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position ?? "-"}</p>
                    <p className="text-xs text-muted-foreground">{employee.department ?? "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            {selectedEmployee && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedEmployee.name}</DialogTitle>
                  <DialogDescription>{selectedEmployee.position}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col sm:flex-row gap-4 py-4">
                  <DetailAvatar name={selectedEmployee.name ?? "İsimsiz"} />
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium">Departman</h4>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.department ?? "-"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">E-posta</h4>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Telefon</h4>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.phone ?? "-"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Hakkında</h4>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.description ?? "-"}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
