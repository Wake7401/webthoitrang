import Link from 'next/link'
import { patchData } from '../utils/fetchData'
import { updateItem } from '../store/Actions'
import Footer from './Footer'

const OrderDetail = ({ orderDetail, state, dispatch }) => {
    const { auth, orders } = state

    const handleDelivered = (order) => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        patchData(`order/delivered/${order._id}`, null, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                const { paid, dateOfPayment, method, delivered } = res.result

                dispatch(updateItem(orders, order._id, {
                    ...order, paid, dateOfPayment, method, delivered
                }, 'ADD_ORDERS'))

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }

    if (!auth.user) return null;
    return (
        <>
            {
                orderDetail.map(order => (
                    <div key={order._id} style={{ margin: '20px auto' }} className="row justify-content-around">

                        <div className="my-3" style={{ maxWidth: '600px' }}>
                            <h2 className="text-break">Đơn hàng {order._id}</h2>

                            <div className="mt-4 text-secondary">
                                <p>Tên: {order.user.name}</p>
                                <p>Email: {order.user.email}</p>
                                <p>Địa chỉ: {order.address}</p>
                                <p>Số điện thoại: {order.mobile}</p>
                                <p><strong>Phương thức thanh toán:</strong>{' '}
                                    {order.paymentMethod === 'transfer' ? (
                                        <span className='text-danger'>
                                            Vui lòng chuyển khoản qua stk: 1015826686 Đặng Anh Kiệt -
                                            Vietcombank với nội dung ten_sodienthoai
                                        </span>
                                    ) : (
                                        'Thanh toán khi nhận hàng'
                                    )}</p>
                                <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                                    {
                                        order.delivered ? `Đã giao hàng ${new Date(order.updatedAt).toLocaleDateString()}` : 'Chưa giao hàng'
                                    }
                                    {
                                        auth.user.role === 'admin' && !order.delivered &&
                                        <button className="btn btn-dark text-uppercase"
                                            onClick={() => handleDelivered(order)}>
                                            Đánh dấu là đã giao
                                        </button>
                                    }

                                </div>

                                <h3>Thanh toán</h3>

                                <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                                    {
                                        order.paid ? `Đã thanh toán ${new Date(order.dateOfPayment).toLocaleDateString()}` : 'Chưa thanh toán'
                                    }

                                </div>

                                <div>
                                    <h3>Sản phẩm</h3>
                                    {
                                        order.cart.map(item => (
                                            <div className="row border-bottom mx-0 p-2 justify-content-betwenn
                                    align-items-center" key={item._id} style={{ maxWidth: '550px' }}>
                                                <img src={item.images[0].url} alt={item.images[0].url}
                                                    style={{ width: '50px', height: '45px', objectFit: 'cover' }}  className="col-3"/>

                                                <div className='col-9'>
                                                <h5 className="flex-fill text-secondary m-0">
                                                    <Link href={`/product/${item._id}`}>
                                                        <a>{item.title}</a>
                                                    </Link>
                                                </h5>

                                                <span className="text-info m-0">
                                                    {item.quantity} x {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ = {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                                                </span>
                                                </div>

                                            </div>
                                        ))

                                    }
                                </div>

                            </div>

                        </div>

                        {
                            !order.paid && auth.user.role !== 'admin' &&
                            <div className="p-4">
                                <h2 className="mb-4">Tổng giá: {order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</h2>
                            </div>
                        }

                    </div>
                ))
            }
            <Footer />
        </>
    )
}

export default OrderDetail