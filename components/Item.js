import { useContext } from 'react'
import { DataContext } from "../store/GlobalState"

const Item = ({product}) => {

    const { state, dispatch } = useContext(DataContext)
    const { orders, users } = state

    let totalSale = 0
    if (orders) {
        orders.map((order) => {
            order.paid === true ? (totalSale = totalSale + order.total) : null
        })
    }

    
    return (
        <div className='row mt-3'>
            <div className='col-xl-3 col-md-6 mb-4'>
                <div className="card shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Tổng thu nhập</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {totalSale.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-xl-3 col-md-6 mb-4'>
                <div className="card shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Đơn hàng</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {orders ? <span>{orders.length}</span> : <span>0</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-xl-3 col-md-6 mb-4'>
                <div className="card shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Sản phẩm</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {product ? <span>{product.length}</span> : <span>0</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-xl-3 col-md-6 mb-4'>
                <div className="card shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Tài khoản</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {users ? <span>{users.length}</span> : <span>0</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item