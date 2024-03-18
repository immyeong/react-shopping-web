//데이터 수정
import axios from "axios";

const fetchPutData = async (product , cnt) => {
    try {
        const res = await axios.put(`http://localhost:3001/products/${product.id}`, {
            id : product.id,
            title: product.title,
            image: product.image,
            category: product.category,
            price: product.price,
            count : cnt
        });
        console.log("수정되었습니다.");
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchPutData