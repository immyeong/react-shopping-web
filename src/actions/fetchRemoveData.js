//데이터 삭제
import axios from 'axios'

const fetchRemoveData = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:3001/products/${id}`);
        console.log("삭제되었습니다.");
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchRemoveData