import axios, { create } from 'axios'

export const AxiosClient = await create({
    baseURL: 'http://192.168.43.133:1337/admin/api',
    headers:{
        "Content-Type": 'application/json',
        Authorization: 'Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}'
    }
})