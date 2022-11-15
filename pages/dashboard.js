import Head from "next/head"
import Footer from "../components/Footer"
import Item from "../components/Item"
import ChartView from "../components/chart/Chart"
import DashboardSlidebar from "../components/DashboardSlidebar"
import { getData } from "../utils/fetchData"
import { useState } from 'react'

function Dashboard(props) {
    const [products, setProducts] = useState(props.products)
    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>

            <div className="row">

                <DashboardSlidebar />

                <div className="col-9">
                    <Item product={products} />
                    <ChartView />
                </div>
            </div>

            <Footer />
        </div>
    )
}
export async function getServerSideProps({query}) {
    const page = query.page || 'all'
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'
  
    const res = await getData(
      `adminproduct?limit=${page}&category=${category}&sort=${sort}&title=${search}`
    )
    // server side rendering
    return {
      props: {
        products: res.products,
        result: res.result
      }, // will be passed to the page component as props
    }
  }
export default Dashboard