//데이터 삽입
import axios from "axios";

const fetchPostData = async (product, cnt) => {
    try {
        const res = await axios.post(`http://localhost:3001/products`, {
                id : `${product.id}`,
                title : product.title, 
                image : product.image,
                category : product.category,
                price : product.price,
                count : cnt
        });
        console.log("전송되었습니다.");
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchPostData