import axios from 'axios'
import { StudentDetailsModel } from '../store/models/student'

const url = 'https://easywork-api.onrender.com/api/student'

export const StudentService = {
    addNewStudent: async (studentDetails: StudentDetailsModel) => {
        try {
            // const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `${token}`,
                },
            }
            return await axios.post(url + '/', studentDetails, config)
        } catch (err: any) {
            return err
        }
    },
    getStudents: async () => {
        try {
            // const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `${token}`,
                },
            }
            return await axios.get(url + '/', config)
        } catch (err: any) {
            return err
        }
    },
    updateStudent: async (studentId: string, studentDetails: StudentDetailsModel) => {
        try {
            // const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `${token}`,
                },
            }
            return await axios.put(url + '/' + studentId, studentDetails, config)
        } catch (err: any) {
            return err
        }
    },
    deleteStudent: async (studentId: string) => {
        try {
            // const token: string = getBearerToken()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `${token}`,
                },
            }
            return await axios.delete(url + '/' + studentId, config)
        } catch (err: any) {
            return err
        }
    },
}
