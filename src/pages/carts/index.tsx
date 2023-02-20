import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { APIHelper } from "@/helpers/APIHelper";

const Cart = ({
	carts,
}: {
	carts: {
		id: number;
		userId: number;
		totalProducts: number;
		totalQuantity: number;
		total: number;
	}[];
}) => {
	return (
		<tbody className="divide-y divide-gray-200 bg-white">
			{carts.length > 0 ? (
				carts.map((cart) => (
					<tr key={cart.id}>
						<td className="w-full max-w-0 py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
							{cart.userId}
							<dl className="font-normal lg:hidden">
								<dt className="sr-only">Brand</dt>
								<dd className="mt-1 truncate text-gray-700">{cart.userId}</dd>
							</dl>
						</td>
						<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
							{cart.totalProducts}
						</td>
						<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
							{cart.totalQuantity}
						</td>
						<td className="px-3 py-4 text-sm text-gray-500">${cart.total}</td>
						<td className="py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
							<a href="#" className="text-indigo-600 hover:text-indigo-900">
								Edit<span className="sr-only">, {cart.userId}</span>
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
	);
};

export default function Carts() {
	const [carts, setCarts] = useState([]);

	useEffect(() => {
		APIHelper.getAllCarts().then(
			(res: {
				data: {
					carts: any;
				};
			}) => {
				setCarts(res.data.carts);
			}
		);
	}, []);

	return (
		<Layout title="Carts">
			<div className="px-6 lg:px-8">
				<div className="-mx-6 mt-8 sm:-mx-0">
					<table className="min-w-full divide-y divide-gray-300">
						<thead>
							<tr>
								<th
									scope="col"
									className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 cursor-pointer"
								>
									Id
								</th>
								<th
									scope="col"
									className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
								>
									UserId
								</th>
								<th
									scope="col"
									className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
								>
									Total Products
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Total Qty
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Total Amount
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<Cart carts={carts} />
					</table>
				</div>
			</div>
		</Layout>
	);
}
