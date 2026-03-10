"use client";

import { useEffect, useState } from "react";
import { DEFAULT_PRODUCT_DESCRIPTION } from "@/lib/defaults";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 10;

const singleFields = [
  { name: "productType", label: "Product Type" },
  { name: "sellerSku", label: "Seller SKU" },
  { name: "externalProductId", label: "External Product ID" },
  { name: "manufacturer", label: "Manufacturer" },
  { name: "modelName", label: "Model Name" },
  { name: "closureType", label: "Closure Type" },
  { name: "soleMaterial", label: "Sole Material" },
  { name: "heelType", label: "Heel Type" },
  { name: "heelHeight", label: "Heel Height" },
  { name: "outerMaterialType", label: "Outer Material Type" },
  { name: "heelHeightUnitOfMeasure", label: "Heel Height Unit Of Measure" },
  { name: "footwearSizeSystem", label: "Footwear Size System" },
  { name: "shoeSizeAgeGroup", label: "Shoe Size Age Group" },
  { name: "shoeSizeGender", label: "Shoe Size Gender" },
  { name: "shoeSizeClass", label: "Shoe Size Class" },
  { name: "shoeSizeWidth", label: "Shoe Size Width" },
  { name: "shoeSize", label: "Shoe Size" },
  { name: "style", label: "Style" },
  { name: "color", label: "Color" },
  { name: "size", label: "Size" },
  { name: "colourMap", label: "Colour Map" },
  { name: "manufacturerContact", label: "Manufacturer Contact" },
  { name: "sizeMap", label: "Size Map" },
  { name: "unitCountType", label: "Unit Count Type" },
  { name: "unitCount", label: "Unit Count" },
  { name: "itemLengthLongerEdge", label: "Item Length Longer Edge" },
  { name: "itemLengthUnit", label: "Item Length Unit" },
  { name: "itemWidthShorterEdge", label: "Item Width Shorter Edge" },
  { name: "itemWidthUnit", label: "Item Width Unit" },
  { name: "itemWeight", label: "Item Weight" },
  { name: "itemWeightUnit", label: "Item Weight Unit" },
  { name: "hoseLength", label: "Hose Length" },
  { name: "hoseLengthUnitOfMeasure", label: "Hose Length Unit Of Measure" },
  { name: "seatHeight", label: "Seat Height" },
  { name: "seatHeightUnitOfMeasure", label: "Seat Height Unit Of Measure" },
  { name: "shoeHeightMap", label: "Shoe Height Map" },
  { name: "packageHeightUnit", label: "Package Height Unit" },
  { name: "packageLength", label: "Package Length" },
  { name: "packageWidth", label: "Package Width" },
  { name: "packageWeightUnit", label: "Package Weight Unit" },
  { name: "packageHeight", label: "Package Height" },
  { name: "packageWidthUnit", label: "Package Width Unit" },
  { name: "packageLengthUnit", label: "Package Length Unit" },
  { name: "packageWeight", label: "Package Weight" },
  { name: "externalProductInformation", label: "External Product Information" },
  { name: "maximumRetailPrice", label: "Maximum Retail Price" },
  { name: "yourPriceInr", label: "Your Price INR (IN)" },
];

const arrayFields = [
  { name: "materialTypes", label: "Material Type" },
  { name: "materialFabricRegulations", label: "Material/Fabric Regulations" },
];

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(search);
      setPage(1); 
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async (pageNum = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products/getProducts?page=${pageNum}&limit=${PAGE_SIZE}&search=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      setProducts(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, searchDebounced);
  }, [page, searchDebounced]);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setForm({
      category: product.category?._id || "",
      name: product.name || "",
      slug: product.slug || "",
      description: product.description || "",
      longDescription: product.longDescription || "",
      image: product.image || "",
      gallery: (product.gallery || []).join("\n"),
      keyFeatures: (product.keyFeatures || []).join("\n"),
      additionalFeatures: (product.additionalFeatures || []).join("\n"),
      weight: product.weight || "",
      dimension: product.dimension || "",
      specifications: (product.specifications || [])
        .map((s) => `${s.key}: ${s.value}`)
        .join("\n"),
      productType: product.productType || "",
      sellerSku: product.sellerSku || "",
      externalProductId: product.externalProductId || "",
      manufacturer: product.manufacturer || "",
      modelName: product.modelName || "",
      closureType: product.closureType || "",
      soleMaterial: product.soleMaterial || "",
      heelType: product.heelType || "",
      heelHeight: product.heelHeight || "",
      outerMaterialType: product.outerMaterialType || "",
      heelHeightUnitOfMeasure: product.heelHeightUnitOfMeasure || "",
      footwearSizeSystem: product.footwearSizeSystem || "",
      shoeSizeAgeGroup: product.shoeSizeAgeGroup || "",
      shoeSizeGender: product.shoeSizeGender || "",
      shoeSizeClass: product.shoeSizeClass || "",
      shoeSizeWidth: product.shoeSizeWidth || "",
      shoeSize: product.shoeSize || "",
      style: product.style || "",
      color: product.color || "",
      size: product.size || "",
      colourMap: product.colourMap || "",
      manufacturerContact: product.manufacturerContact || "",
      materialTypes: (product.materialTypes || []).join("\n"),
      sizeMap: product.sizeMap || "",
      unitCountType: product.unitCountType || "",
      unitCount: product.unitCount || "",
      itemLengthLongerEdge: product.itemLengthLongerEdge || "",
      itemLengthUnit: product.itemLengthUnit || "",
      itemWidthShorterEdge: product.itemWidthShorterEdge || "",
      itemWidthUnit: product.itemWidthUnit || "",
      itemWeight: product.itemWeight || "",
      itemWeightUnit: product.itemWeightUnit || "",
      hoseLength: product.hoseLength || "",
      hoseLengthUnitOfMeasure: product.hoseLengthUnitOfMeasure || "",
      seatHeight: product.seatHeight || "",
      seatHeightUnitOfMeasure: product.seatHeightUnitOfMeasure || "",
      shoeHeightMap: product.shoeHeightMap || "",
      packageHeightUnit: product.packageHeightUnit || "",
      packageLength: product.packageLength || "",
      packageWidth: product.packageWidth || "",
      packageWeightUnit: product.packageWeightUnit || "",
      packageHeight: product.packageHeight || "",
      packageWidthUnit: product.packageWidthUnit || "",
      packageLengthUnit: product.packageLengthUnit || "",
      packageWeight: product.packageWeight || "",
      externalProductInformation: product.externalProductInformation || "",
      materialFabricRegulations: (product.materialFabricRegulations || []).join("\n"),
      maximumRetailPrice: product.maximumRetailPrice || "",
      yourPriceInr: product.yourPriceInr || "",
    });
  };

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
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

  const handleUpdate = async () => {
    const body = {
      ...form,
      gallery: form.gallery.split("\n").filter(Boolean),
      keyFeatures: form.keyFeatures.split("\n").filter(Boolean),
      additionalFeatures: form.additionalFeatures.split("\n").filter(Boolean),
      materialTypes: form.materialTypes.split("\n").filter(Boolean),
      materialFabricRegulations: form.materialFabricRegulations.split("\n").filter(Boolean),
      specifications: form.specifications
        .split("\n")
        .map((l) => {
          const [key, value] = l.split(":");
          return { key: key?.trim(), value: value?.trim() };
        })
        .filter((s) => s.key),
    };

    const res = await fetch(`/api/products/${editProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setEditProduct(null);
      fetchProducts(page, searchDebounced);
    }
  };

  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-full shadow-md"
        />
      </div>

      <div className="relative border rounded-lg bg-white shadow-md">
        <div className=" w-full">
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[80px]">Image</TableHead>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="min-w-[150px]">Category</TableHead>
                <TableHead className="min-w-[300px]">Description</TableHead>
                <TableHead className="min-w-[250px]">Long Description</TableHead>
                <TableHead className="min-w-[100px]">Weight</TableHead>
                <TableHead className="min-w-[120px]">Dimension</TableHead>
                <TableHead className="sticky right-0 bg-white border-l min-w-[100px] z-20">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Loading products...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!loading && products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.png";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category?.name || "No Category"}</TableCell>
                    <TableCell>
                      <div
                        className="max-w-[280px] truncate"
                        title={product.description}
                      >
                        {product.description || DEFAULT_PRODUCT_DESCRIPTION}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="max-w-[230px] truncate"
                        title={product.longDescription}
                      >
                        {product.longDescription || "No long description"}
                      </div>
                    </TableCell>
                    <TableCell>{product.weight || "N/A"}</TableCell>
                    <TableCell>{product.dimension || "N/A"}</TableCell>
                    <TableCell className="sticky right-0 bg-white border-l z-10">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(product)}
                        className="w-full"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : !loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    {search ? `No products found for "${search}"` : "No products found."}
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {getPaginationNumbers().map((pageNum, index) => (
                <PaginationItem key={index}>
                  {pageNum === "..." ? (
                    <span className="px-3 py-2">...</span>
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(Number(pageNum));
                      }}
                      isActive={page === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                  className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="!max-w-6xl w-full max-h-[95vh] overflow-y-auto">
          <DialogHeader>Edit Product</DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-3"
          >
            <div>
              <Label>Title</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div>
              <Label>Product Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Long Description</Label>
              <Textarea
                value={form.longDescription}
                onChange={(e) =>
                  setForm({ ...form, longDescription: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Main Image URL</Label>
              <Input type="file" onChange={handleImageUpload} disabled={uploading} />
              {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
              {form.image && (
                <>
                  <p className="text-xs break-all mt-1">{form.image}</p>
                  <img
                    src={form.image}
                    alt="Product Image Preview"
                    className="mt-2 w-48 h-auto rounded border"
                  />
                </>
              )}
            </div>
            <div>
              <Label>Other Image URLs</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;
                  setUploading(true);
                  try {
                    const urls = [];
                    for (const file of files) {
                      const url = await uploadFile(file);
                      if (url) urls.push(url);
                    }
                    setForm((prev) => ({
                      ...prev,
                      gallery: [...prev.gallery.split("\n").filter(Boolean), ...urls].join(
                        "\n"
                      ),
                    }));
                  } finally {
                    setUploading(false);
                  }
                }}
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploading gallery images...</p>
              )}

              {form.gallery && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {form.gallery.split("\n").map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Gallery ${idx}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <Label>Bullet Points</Label>
              <Textarea
                value={form.keyFeatures}
                onChange={(e) => setForm({ ...form, keyFeatures: e.target.value })}
                placeholder="Enter features, one per line"
              />
            </div>
            <div>
              <Label>Additional Features</Label>
              <Textarea
                value={form.additionalFeatures}
                onChange={(e) =>
                  setForm({ ...form, additionalFeatures: e.target.value })
                }
                placeholder="Enter additional features, one per line"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Weight</Label>
                <Input
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                />
              </div>
              <div>
                <Label>Dimension</Label>
                <Input
                  value={form.dimension}
                  onChange={(e) => setForm({ ...form, dimension: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Specifications</Label>
              <Textarea
                value={form.specifications}
                onChange={(e) =>
                  setForm({ ...form, specifications: e.target.value })
                }
                placeholder="Enter specifications as 'Key: Value', one per line"
              />
            </div>
            {singleFields.map(({ name, label }) => (
              <div key={name}>
                <Label>{label}</Label>
                <Input
                  value={form[name] || ""}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                />
              </div>
            ))}
            {arrayFields.map(({ name, label }) => (
              <div key={name}>
                <Label>{label}</Label>
                <Textarea
                  value={form[name] || ""}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  placeholder="Enter values, one per line"
                />
              </div>
            ))}
            <Button
              type="submit"
              className="w-full bg-gradient-to-b from-[#097362] to-[#0FA78E]"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Update"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
