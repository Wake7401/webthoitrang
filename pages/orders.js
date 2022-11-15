import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import DashboardSlidebar from '../components/DashboardSlidebar'
import Footer from '../components/Footer'
import { DataContext } from '../store/GlobalState'

function Orders() {
    const { state, dispatch } = useContext(DataContext)
    const { orders } = state


    return (
        <div>
            <Head>
                <title>Quản lí đơn hàng</title>
            </Head>
            <div className='row'>
                <DashboardSlidebar />
                <div className='col-9 mt-4'>
                <table className="table table-striped table-bordered w-100">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Ngày đặt</th>
                            <th>Tổng</th>
                            <th>Giao hàng</th>
                            <th>Thanh toán</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.map((order,index) => (
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <th>
                                        <Link href={`/order/${order._id}`}>
                                            <a>{order._id}</a>
                                        </Link>

                                    </th>
                                    <th>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </th>
                                    <th className="text-center text-danger">{order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</th>
                                    <th>
                                        {
                                            order.delivered
                                                ? <i className="fas fa-check text-success"></i>
                                                : <i className="fas fa-times text-danger"></i>
                                        }
                                    </th>
                                    <th>
                                        {
                                            order.paid
                                                ? <i className="fas fa-check text-success"></i>
                                                : <i className="fas fa-times text-danger"></i>
                                        }
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Orders