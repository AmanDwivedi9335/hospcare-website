"use client";

import { create } from "zustand";
import productData from "@/Constant/Products.js";

export const useProductStore = create((set, get) => ({
	// state
	products: productData,
	filteredProducts: productData,
	currentPage: 1,
	activeCategory: "all",
	filters: {
		categories: [],
		priceRange: [0, 15000],
		inStock: true,
	},

	// actions
	setCurrentPage: (page) => set({ currentPage: page }),
	setActiveCategory: (category) => set({ activeCategory: category }),
	setFilters: (filters) =>
		set((state) => ({
			filters: { ...state.filters, ...filters },
		})),
	applyFilters: () => {
		const { filters, products } = get();

		const filtered = products.filter((product) => {
			// Filter by category
			if (
				filters.categories.length > 0 &&
				!filters.categories.includes(product.category)
			) {
				return false;
			}

			// Filter by price
			if (
				product.price < filters.priceRange[0] ||
				product.price > filters.priceRange[1]
			) {
				return false;
			}

			// Filter by stock
			if (filters.inStock && !product.inStock) {
				return false;
			}

			return true;
		});

		set({ filteredProducts: filtered });
	},
}));

export const useInquiryStore = create((set) => ({
	isOpen: false,
	product: null,
	openInquiry: (product) => set({ isOpen: true, product }),
	closeInquiry: () => set({ isOpen: false, product: null }),
}));
