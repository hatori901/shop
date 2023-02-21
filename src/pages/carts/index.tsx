import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { APIHelper } from "@/helpers/APIHelper";

interface Data {
	id: number;
	userId: number;
	product: {
		id: number;
		title: string;
		price: number;
		quantity: number;
		total: number;
	}[];
	totalProducts: number;
	totalQuantity: number;
	total: number;
}

const Cart = ({
	carts,
	onShowModal,
}: {
	carts: {
		id: number;
		userId: number;
		product: {
			id: number;
			title: string;
			price: number;
			quantity: number;
			total: number;
		}[];
		totalProducts: number;
		totalQuantity: number;
		total: number;
	}[];
	onShowModal: (cart: any) => void;
}) => {
	return (
		<tbody className="divide-y divide-gray-200 bg-white">
			{carts.length > 0 ? (
				carts.map((cart) => (
					<tr key={cart.id}>
						<td className="w-full max-w-0 py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
							{cart.id}
							<dl className="font-normal lg:hidden">
								<dt className="sr-only">User</dt>
								<dd className="mt-1 truncate text-gray-700">{cart.userId}</dd>
							</dl>
						</td>
						<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
							{cart.userId}
						</td>
						<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
							{cart.totalProducts}
						</td>
						<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
							{cart.totalQuantity}
						</td>
						<td className="px-3 py-4 text-sm text-gray-500">${cart.total}</td>
						<td className="py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
							<div
								className="text-indigo-600 hover:text-indigo-900"
								onClick={() => {
									onShowModal(cart);
								}}
							>
								Show<span className="sr-only">, {cart.userId}</span>
							</div>
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
	const [data, setData] = useState<any>();
	const [showModal, setShowModal] = useState(false);
	const onShowModal = (cart: any) => {
		setData(cart);
		setShowModal(true);
	};
	const onCloseModal = () => {
		setShowModal(false);
	};

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
						<Cart carts={carts} onShowModal={onShowModal} />
					</table>
				</div>
			</div>
			<Modal title="Cart" show={showModal} onClose={onCloseModal}>
				{data && (
					<div className="px-6 lg:px-8">
						{data.products.map((item: any) => (
							<div key={item.id} className="py-5">
								<div className="flex justify-between">
									<div className="text-gray-700">{item.title}</div>
									<div className="text-gray-700">${item.price}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-gray-700">Qty: {item.quantity}</div>
									<div className="text-gray-700">Total: ${item.total}</div>
								</div>
							</div>
						))}
						<div>
							<div className="flex justify-between">
								<div className="text-gray-700">Total Products</div>
								<div className="text-gray-700">{data.totalProducts}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-gray-700">Total Quantity</div>
								<div className="text-gray-700">{data.totalQuantity}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-gray-700">Total Amount</div>
								<div className="text-gray-700">${data.total}</div>
							</div>
						</div>
					</div>
				)}
			</Modal>
		</Layout>
	);
}
