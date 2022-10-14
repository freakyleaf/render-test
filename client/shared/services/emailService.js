import axios from 'axios';

const PUBLIC_BASE_URL = import.meta.env.PUBLIC_BASE_URL;
const PUBLIC_SERVER_PORT_NUMBER = import.meta.env.PUBLIC_SERVER_PORT_NUMBER;

const url = `${PUBLIC_BASE_URL}${PUBLIC_SERVER_PORT_NUMBER ? `:${PUBLIC_SERVER_PORT_NUMBER}` : ''}/api/email/`;

class EmailService {
    static async sendEmail ({
        body,
        itemName,
        itemCategory,
        senderEmail,
        senderName,
    }) {
        try {
            const response = await axios.post(url, {
                body,
                itemName,
                itemCategory,
                senderEmail,
                senderName,
            });
            return response;
        } catch (error) {
            let errorMessage = '';
            if (error.response && error.response.status === 400) {
                errorMessage = error.response.data.message;
            }
            throw new Error(errorMessage);
        }
    }
}

export default EmailService;
