import Axios from 'axios';

const axiosInst=Axios.create({
 baseURL:"https://react-burger-builder-6abde.firebaseio.com/"
});

export default axiosInst;