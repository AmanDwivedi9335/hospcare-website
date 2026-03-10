'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const singleFields = [
  { name: 'productType', label: 'Product Type' },
  { name: 'sellerSku', label: 'Seller SKU' },
  { name: 'externalProductId', label: 'External Product ID' },
  { name: 'manufacturer', label: 'Manufacturer' },
  { name: 'modelName', label: 'Model Name' },
  { name: 'closureType', label: 'Closure Type' },
  { name: 'soleMaterial', label: 'Sole Material' },
  { name: 'heelType', label: 'Heel Type' },
  { name: 'heelHeight', label: 'Heel Height' },
  { name: 'outerMaterialType', label: 'Outer Material Type' },
  { name: 'heelHeightUnitOfMeasure', label: 'Heel Height Unit Of Measure' },
  { name: 'footwearSizeSystem', label: 'Footwear Size System' },
  { name: 'shoeSizeAgeGroup', label: 'Shoe Size Age Group' },
  { name: 'shoeSizeGender', label: 'Shoe Size Gender' },
  { name: 'shoeSizeClass', label: 'Shoe Size Class' },
  { name: 'shoeSizeWidth', label: 'Shoe Size Width' },
  { name: 'shoeSize', label: 'Shoe Size' },
  { name: 'style', label: 'Style' },
  { name: 'color', label: 'Color' },
  { name: 'size', label: 'Size' },
  { name: 'colourMap', label: 'Colour Map' },
  { name: 'manufacturerContact', label: 'Manufacturer Contact' },
  { name: 'sizeMap', label: 'Size Map' },
  { name: 'unitCountType', label: 'Unit Count Type' },
  { name: 'unitCount', label: 'Unit Count' },
  { name: 'itemLengthLongerEdge', label: 'Item Length Longer Edge' },
  { name: 'itemLengthUnit', label: 'Item Length Unit' },
  { name: 'itemWidthShorterEdge', label: 'Item Width Shorter Edge' },
  { name: 'itemWidthUnit', label: 'Item Width Unit' },
  { name: 'itemWeight', label: 'Item Weight' },
  { name: 'itemWeightUnit', label: 'Item Weight Unit' },
  { name: 'hoseLength', label: 'Hose Length' },
  { name: 'hoseLengthUnitOfMeasure', label: 'Hose Length Unit Of Measure' },
  { name: 'seatHeight', label: 'Seat Height' },
  { name: 'seatHeightUnitOfMeasure', label: 'Seat Height Unit Of Measure' },
  { name: 'shoeHeightMap', label: 'Shoe Height Map' },
  { name: 'packageHeightUnit', label: 'Package Height Unit' },
  { name: 'packageLength', label: 'Package Length' },
  { name: 'packageWidth', label: 'Package Width' },
  { name: 'packageWeightUnit', label: 'Package Weight Unit' },
  { name: 'packageHeight', label: 'Package Height' },
  { name: 'packageWidthUnit', label: 'Package Width Unit' },
  { name: 'packageLengthUnit', label: 'Package Length Unit' },
  { name: 'packageWeight', label: 'Package Weight' },
  { name: 'externalProductInformation', label: 'External Product Information' },
  { name: 'maximumRetailPrice', label: 'Maximum Retail Price' },
  { name: 'yourPriceInr', label: 'Your Price INR (IN)' },
];

const arrayFields = [
  { name: 'materialTypes', label: 'Material Type' },
  { name: 'materialFabricRegulations', label: 'Material/Fabric Regulations' },
];

const initialForm = {
  category: '',
  name: '',
  slug: '',
  description: '',
  longDescription: '',
  image: '',
  gallery: '',
  keyFeatures: '',
  additionalFeatures: '',
  weight: '',
  dimension: '',
  specifications: '',
  productType: '',
  sellerSku: '',
  externalProductId: '',
  manufacturer: '',
  modelName: '',
  closureType: '',
  soleMaterial: '',
  heelType: '',
  heelHeight: '',
  outerMaterialType: '',
  heelHeightUnitOfMeasure: '',
  footwearSizeSystem: '',
  shoeSizeAgeGroup: '',
  shoeSizeGender: '',
  shoeSizeClass: '',
  shoeSizeWidth: '',
  shoeSize: '',
  style: '',
  color: '',
  size: '',
  colourMap: '',
  manufacturerContact: '',
  materialTypes: '',
  sizeMap: '',
  unitCountType: '',
  unitCount: '',
  itemLengthLongerEdge: '',
  itemLengthUnit: '',
  itemWidthShorterEdge: '',
  itemWidthUnit: '',
  itemWeight: '',
  itemWeightUnit: '',
  hoseLength: '',
  hoseLengthUnitOfMeasure: '',
  seatHeight: '',
  seatHeightUnitOfMeasure: '',
  shoeHeightMap: '',
  packageHeightUnit: '',
  packageLength: '',
  packageWidth: '',
  packageWeightUnit: '',
  packageHeight: '',
  packageWidthUnit: '',
  packageLengthUnit: '',
  packageWeight: '',
  externalProductInformation: '',
  materialFabricRegulations: '',
  maximumRetailPrice: '',
  yourPriceInr: '',
};

export default function ProductForm() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);


  const fetchData = async () => {
    const [catRes, prodRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/products'),
    ]);
    setCategories(await catRes.json());
    setProducts(await prodRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...form,
      gallery: form.gallery.split('\n').filter(Boolean),
      keyFeatures: form.keyFeatures.split('\n').filter(Boolean),
      additionalFeatures: form.additionalFeatures.split('\n').filter(Boolean),
      materialTypes: form.materialTypes.split('\n').filter(Boolean),
      materialFabricRegulations: form.materialFabricRegulations.split('\n').filter(Boolean),
      specifications: form.specifications.split('\n').map((l) => {
        const [key, value] = l.split(':');
        return { key: key?.trim(), value: value?.trim() };
      }).filter((s) => s.key),
    };
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/products/${editId}` : '/api/products';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      await fetchData();
      setForm(initialForm);
      setEditId(null);
    }
  };

  const handleEdit = (p) => {
    setForm({
      ...initialForm,
      category: p.category?._id || '',
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      longDescription: p.longDescription || '',
      image: p.image || '',
      gallery: (p.gallery || []).join('\n'),
      keyFeatures: (p.keyFeatures || []).join('\n'),
      additionalFeatures: (p.additionalFeatures || []).join('\n'),
      weight: p.weight || '',
      dimension: p.dimension || '',
      specifications: (p.specifications || []).map((s) => `${s.key}: ${s.value}`).join('\n'),
      productType: p.productType || '',
      sellerSku: p.sellerSku || '',
      externalProductId: p.externalProductId || '',
      manufacturer: p.manufacturer || '',
      modelName: p.modelName || '',
      closureType: p.closureType || '',
      soleMaterial: p.soleMaterial || '',
      heelType: p.heelType || '',
      heelHeight: p.heelHeight || '',
      outerMaterialType: p.outerMaterialType || '',
      heelHeightUnitOfMeasure: p.heelHeightUnitOfMeasure || '',
      footwearSizeSystem: p.footwearSizeSystem || '',
      shoeSizeAgeGroup: p.shoeSizeAgeGroup || '',
      shoeSizeGender: p.shoeSizeGender || '',
      shoeSizeClass: p.shoeSizeClass || '',
      shoeSizeWidth: p.shoeSizeWidth || '',
      shoeSize: p.shoeSize || '',
      style: p.style || '',
      color: p.color || '',
      size: p.size || '',
      colourMap: p.colourMap || '',
      manufacturerContact: p.manufacturerContact || '',
      materialTypes: (p.materialTypes || []).join('\n'),
      sizeMap: p.sizeMap || '',
      unitCountType: p.unitCountType || '',
      unitCount: p.unitCount || '',
      itemLengthLongerEdge: p.itemLengthLongerEdge || '',
      itemLengthUnit: p.itemLengthUnit || '',
      itemWidthShorterEdge: p.itemWidthShorterEdge || '',
      itemWidthUnit: p.itemWidthUnit || '',
      itemWeight: p.itemWeight || '',
      itemWeightUnit: p.itemWeightUnit || '',
      hoseLength: p.hoseLength || '',
      hoseLengthUnitOfMeasure: p.hoseLengthUnitOfMeasure || '',
      seatHeight: p.seatHeight || '',
      seatHeightUnitOfMeasure: p.seatHeightUnitOfMeasure || '',
      shoeHeightMap: p.shoeHeightMap || '',
      packageHeightUnit: p.packageHeightUnit || '',
      packageLength: p.packageLength || '',
      packageWidth: p.packageWidth || '',
      packageWeightUnit: p.packageWeightUnit || '',
      packageHeight: p.packageHeight || '',
      packageWidthUnit: p.packageWidthUnit || '',
      packageLengthUnit: p.packageLengthUnit || '',
      packageWeight: p.packageWeight || '',
      externalProductInformation: p.externalProductInformation || '',
      materialFabricRegulations: (p.materialFabricRegulations || []).join('\n'),
      maximumRetailPrice: p.maximumRetailPrice || '',
      yourPriceInr: p.yourPriceInr || '',
    });
    setEditId(p._id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    return data.url;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      if (url) setForm({ ...form, image: url });
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const f of files) {
        const url = await uploadFile(f);
        if (url) uploaded.push(url);
      }
      setForm({ ...form, gallery: uploaded.join('\n') });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-5 bg-white shadow-md border rounded-xl space-y-6 overflow-auto">
      <h2 className="text-2xl font-semibold text-[#097362]">{editId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="category" className="text-[#097362]">Category</Label>
          <select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border rounded px-2 py-1">
            <option value="">Select</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="name" className="text-[#097362]">Title</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="slug" className="text-[#097362]">Slug</Label>
          <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="description" className="text-[#097362]">Product Description</Label>
          <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="longDescription" className="text-[#097362]">Long Description</Label>
          <Textarea id="longDescription" rows={4} value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="image" className="text-[#097362]">Main Image URL</Label>
          <Input id="image" type="file" onChange={handleImageUpload} />
          {form.image && (
            <p className="text-sm mt-1 break-all">{form.image}</p>
          )}
        </div>
        <div>
          <Label htmlFor="gallery" className="text-[#097362]">Other Image URLs</Label>
          <Input id="gallery" type="file" multiple onChange={handleGalleryUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.gallery && (
            <Textarea id="galleryUrls" rows={3} value={form.gallery} readOnly />
          )}

        </div>
        <div>
          <Label htmlFor="keyFeatures" className="text-[#097362]">Bullet Points (one per line)</Label>
          <Textarea id="keyFeatures" rows={3} value={form.keyFeatures} onChange={(e) => setForm({ ...form, keyFeatures: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="additionalFeatures" className="text-[#097362]">Additional Features (one per line)</Label>
          <Textarea id="additionalFeatures" rows={3} value={form.additionalFeatures} onChange={(e) => setForm({ ...form, additionalFeatures: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight" className="text-[#097362]">Weight</Label>
            <Input id="weight" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="dimension" className="text-[#097362]">Dimension</Label>
            <Input id="dimension" value={form.dimension} onChange={(e) => setForm({ ...form, dimension: e.target.value })} />
          </div>
        </div>
        <div>
          <Label htmlFor="specifications" className="text-[#097362]">Specifications (key: value per line)</Label>
          <Textarea id="specifications" rows={3} value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} />
        </div>
        {singleFields.map(({ name, label }) => (
          <div key={name}>
            <Label htmlFor={name} className="text-[#097362]">{label}</Label>
            <Input id={name} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} />
          </div>
        ))}
        {arrayFields.map(({ name, label }) => (
          <div key={name}>
            <Label htmlFor={name} className="text-[#097362]">{label} (one per line)</Label>
            <Textarea id={name} rows={3} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} />
          </div>
        ))}
        <Button type="submit" className="w-full bg-gradient-to-b from-[#097362] to-[#0FA78E]">
          {editId ? 'Update' : 'Create'}
        </Button>
      </form>

      <div className="pt-6">
        {products.map((p) => (
          <div key={p._id} className="border-b py-2 flex justify-between items-center">
            <span>{p.name}</span>
            <div className="space-x-2">
              <Button size="sm" onClick={() => handleEdit(p)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
