"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import LoadingSpinner from "@/components/Admin/Blogs/LoadingSpinner.jsx";

export default function SubscriberTable() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data || []);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDownload = async () => {
    const res = await fetch("/api/subscribers/export");
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
        <div className="flex gap-2">
          <Button onClick={fetchSubscribers} size="sm">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button onClick={handleDownload} size="sm" variant="secondary">
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      </div>
      <div className="bg-white border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="2">
                  <LoadingSpinner className="py-4" />
                </TableCell>
              </TableRow>
            ) : subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan="2" className="text-center p-4">
                  No subscribers found.
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((s) => (
                <TableRow key={s._id}>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{new Date(s.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

