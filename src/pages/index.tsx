import { useState, useEffect } from "react";
import Head from "next/head";

import { APIHelper } from "@/helpers/APIHelper";
import Layout from "@/components/Layout";

const Product = ({
	products,
}: {
	products: {
		title: string;
		brand: string;
		category: string;
		price: number;
		stock: number;
	}[];
}) => {
	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead>
				<tr>
					<th
						scope="col"
						className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					>
						Title
					</th>
					<th
						scope="col"
						className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
					>
						Brand
					</th>
					<th
						scope="col"
						className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
					>
						Category
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Price
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					>
						Stock
					</th>
					<th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
						<span className="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 bg-white">
				{products.length > 0 ? (
					products.map((product) => (
						<tr key={product.title}>
							<td className="w-full max-w-0 py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
								{product.title}
								<dl className="font-normal lg:hidden">
									<dt className="sr-only">Brand</dt>
									<dd className="mt-1 truncate text-gray-700">
										{product.brand}
									</dd>
								</dl>
							</td>
							<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
								{product.title}
							</td>
							<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
								{product.category}
							</td>
							<td className="px-3 py-4 text-sm text-gray-500">
								${product.price}
							</td>
							<td className="px-3 py-4 text-sm text-gray-500">
								{product.stock}
							</td>
							<td className="py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
								<a href="#" className="text-indigo-600 hover:text-indigo-900">
									Edit<span className="sr-only">, {product.title}</span>
								</a>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td>No data</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		APIHelper.getProducts().then((res) => {
			setProducts(res.data.products);
		});
	}, []);
	return (
		<>
			<Layout title="Dashboard">
				<div className="px-6 lg:px-8">
					<div className="-mx-6 mt-8 sm:-mx-0">
						<Product products={products} />
					</div>
				</div>
			</Layout>
		</>
	);
}
