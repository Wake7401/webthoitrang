import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import { DataContext } from "../store/GlobalState"
import CartItem from "../components/CartItem"
import Link from 'next/link'
import { getData, postData } from "../utils/fetchData"
import Footer from '../components/Footer'

function Cart() {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [total, setTotal] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(res)
    }

    getTotal()
  }, [cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__devat'))
    if (cartLocal && cartLocal.length > 0) {
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, sold } = res.product
          if (inStock > 0) {
            newArr.push({
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock ? 1 : item.quantity
            })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
      }

      updateCart()
    }
  }, [])



  const handleOrder = async () => {
    if (!address || !mobile)
      return dispatch({ type: 'NOTIFY', payload: { error: 'Vui lòng điền đầy đủ thông tin của bạn.' } })

    if (!paymentMethod)
      return dispatch({ type: 'NOTIFY', payload: { error: 'Vui lòng chọn phương thức thanh toán.' } });

    dispatch({ type: 'NOTIFY', payload: { loading: true } })


    postData('order', { address, mobile, cart, total, paymentMethod }, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch({ type: 'ADD_CART', payload: [] })

        const newOrder = {
          ...res.newOrder,
          user: auth.user
        }
        dispatch({ type: 'ADD_ORDERS', payload: [newOrder] })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      })

  }


  if (cart.length === 0) return <img className='img-responsive w-100' src="/empty_cart.jpg" alt="" />
  return (
    <div>
      <div className='row mx-auto container'>
        <Head>
          <title>Giỏ hàng</title>
        </Head>

        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2>Giỏ hàng của bạn</h2>

          <table className="table my-3">
            <tbody>
              {
                cart.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="col-md-4 my-3 text-left  text-secondary">
          <form>
            <h2>Đơn hàng</h2>
            
            <label htmlFor="mobile">Số điện thoại</label>
            <input type="text" name="mobile" id="mobile"
              className="form-control mb-2" value={mobile}
              onChange={e => setMobile(e.target.value)} />
              
            <label htmlFor="address">Địa chỉ</label>
            <input type="text" name="address" id="address"
              className="form-control mb-2" value={address}
              onChange={e => setAddress(e.target.value)} />

            <div>
              <input type='radio'
                name='exampleRadios'
                id='cod'
                value='cod'
                checked={paymentMethod === 'cod'}
                onChange={e => setPaymentMethod(e.target.value)} />
              <label htmlFor='cod' className='ml-1' name="pay">Thanh toán khi nhận hàng</label>
            </div>

            <div>
              <input type='radio'
                name='exampleRadios'
                id='transfer'
                value='transfer'
                checked={paymentMethod === 'transfer'}
                onChange={e => setPaymentMethod(e.target.value)} />
              <label htmlFor='transfer' className='ml-1' name="pay">Chuyển khoản</label>
            </div>

            <h3>Tổng giá: <span className="text-danger">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span></h3>

            <Link href={auth.user ? '#!' : '/signin'}>
              <a className="btn btn-dark my-2" onClick={handleOrder}>Đặt hàng</a>
            </Link>
          </form>
        </div >

      </div >
      <Footer />
    </div>
  )
}

export default Cart