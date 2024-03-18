//데이터 조회
import axios from "axios"

const fetchData = async () => {
    try {
        const res = await axios.get('http://localhost:3001/products');
        console.log("조회되었습니다.");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default fetchData