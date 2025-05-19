// app/dashboard/dashboard-client.tsx
"use client"

import { useState } from "react"
import {
  Users, Briefcase, Clock, ArrowUp, ArrowDown, Activity
} from "lucide-react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface DashboardPageProps {
  userCount: number
}

export default function DashboardPage({ userCount }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // lineChartData ve diğer state'ler aynı...

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Çalışan</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCount}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +2 {/* örnek olarak bıraktım */}
                </span>{" "}
                geçen aydan beri
              </p>
            </CardContent>
          </Card>

          {/* Diğer kartlar aynı kalıyor... */}
        </div>

        {/* Grafik ve tabs bölümü de aynı kalabilir */}
      </div>
    </DashboardLayout>
  )
}
