import connectDB from '../../../utils/connectDB'
import Categories from '../../../models/categoriesModel'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PUT":
            await updateCategory(req, res)
            break;
        case "DELETE":
            await deleteCategory(req, res)
            break;
    }
}

const updateCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Xác thực không hợp lệ."})

        const {id} = req.query
        const {name} = req.body

        const newCategory = await Categories.findOneAndUpdate({_id: id}, {name})
        res.json({
            msg: "Thành công! Cập nhật một danh mục mới.",
            category: {
                ...newCategory._doc,
                name
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Xác thực không hợp lệ."})

        const {id} = req.query

        const products = await Products.findOne({category: id})
        if(products) return res.status(400).json({
            err: "Vui lòng xóa tất cả các sản phẩm có mối quan hệ."
        })

        await Categories.findByIdAndDelete(id)
        
        res.json({msg: "Thành công! Đã xóa một danh mục."})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}