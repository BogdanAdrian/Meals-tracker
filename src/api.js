import axios from 'axios';

const baseURL = 'https://us-central1-stayhealthy-94800.cloudfunctions.net/';

const API = axios.create({ baseURL });

export default API;