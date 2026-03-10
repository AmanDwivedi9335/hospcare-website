'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function CategoryForm() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/categories/${editId}` : '/api/categories';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      await fetchCategories();
      setForm({ name: '', slug: '', description: '', image: '' });
      setEditId(null);
    }
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', image: cat.image || '' });
    setEditId(cat._id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, image: data.url });
      }
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 my-5 bg-white shadow-md border rounded-xl space-y-6">
      <h2 className="text-2xl font-semibold text-[#097362]">{editId ? 'Edit Category' : 'Add Category'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-[#097362]">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="slug" className="text-[#097362]">Slug</Label>
          <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="description" className="text-[#097362]">Description</Label>
          <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="image" className="text-[#097362]">Image</Label>
          <Input id="image" type="file" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.image && (
            <p className="text-sm mt-1 break-all">{form.image}</p>
          )}

        </div>
        <Button type="submit" className="w-full bg-gradient-to-b from-[#097362] to-[#0FA78E]">
          {editId ? 'Update' : 'Create'}
        </Button>
      </form>

      <div className="pt-6">
        {categories.map((cat) => (
          <div key={cat._id} className="border-b py-2 flex justify-between items-center">
            <span>{cat.name}</span>
            <div className="space-x-2">
              <Button size="sm" onClick={() => handleEdit(cat)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(cat._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
