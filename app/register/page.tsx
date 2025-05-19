'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    position: '',
    department: '',
    phone: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.push('/login')
    } else {
      alert('Kayıt başarısız!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Ad Soyad</Label>
              <Input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Şifre</Label>
              <Input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Pozisyon</Label>
              <Input
                type="text"
                value={form.position}
                onChange={e => setForm({ ...form, position: e.target.value })}
              />
            </div>
            <div>
              <Label>Departman</Label>
              <Input
                type="text"
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
              />
            </div>
            <div>
              <Label>Telefon</Label>
              <Input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Hakkında</Label>
              <Input
                type="text"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              Kaydol
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
