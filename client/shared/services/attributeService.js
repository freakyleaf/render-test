import axios from 'axios';

const PUBLIC_BASE_URL = import.meta.env.PUBLIC_BASE_URL;
const PUBLIC_SERVER_PORT_NUMBER = import.meta.env.PUBLIC_SERVER_PORT_NUMBER;

const url = `${PUBLIC_BASE_URL}${PUBLIC_SERVER_PORT_NUMBER ? `:${PUBLIC_SERVER_PORT_NUMBER}` : ''}/api/attribute/`;

class AttributeService {
    // Get all
    static async getAttributes () {
        try {
            const res = await axios.get(url);
            const {
                data,
            } = res;
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Get one
    static async getAttributeById (_id) {
        try {
            const res = await axios.get(`${url}${_id}?type=id`);
            const {
                data,
            } = res;
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAttributeByName (name) {
        try {
            const res = await axios.get(`${url}${name}?type=name`);
            const {
                data,
            } = res;
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Add
    static async addAttribute ({
        codepen,
        contentPatterns,
        description,
        name,
        notes,
        notesOpinionated,
        references,
        since,
        subtypes,
        type,
        typeAlsoGlobal,
        valueTypes,
        valueValues,
    }) {
        try {
            const response = await axios.post(url, {
                codepen,
                contentPatterns,
                description,
                name,
                notes,
                notesOpinionated,
                references,
                since,
                subtypes,
                type,
                typeAlsoGlobal,
                valueTypes,
                valueValues,
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

    // Edit
    static async updateAttribute ({
        _id,
        codepen,
        contentPatterns,
        description,
        name,
        notes,
        notesOpinionated,
        references,
        since,
        subtypes,
        type,
        typeAlsoGlobal,
        valueTypes,
        valueValues,
    }) {
        try {
            const response = await axios.patch(`${url}${_id}`, {
                codepen,
                contentPatterns,
                description,
                name,
                notes,
                notesOpinionated,
                references,
                since,
                subtypes,
                type,
                typeAlsoGlobal,
                valueTypes,
                valueValues,
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

    // Remove
    static removeAttribute (_id) {
        return axios.delete(`${url}${_id}`);
    }
}

export default AttributeService;
