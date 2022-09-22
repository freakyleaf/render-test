import axios from 'axios';

const PUBLIC_BASE_URL = import.meta.env.PUBLIC_BASE_URL;
const PUBLIC_SERVER_PORT_NUMBER = import.meta.env.PUBLIC_SERVER_PORT_NUMBER;

const url = `${PUBLIC_BASE_URL}:${PUBLIC_SERVER_PORT_NUMBER}/api/tag/`;

class TagService {
    // Get all
    static async getTags () {
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
    static async getTagById (_id) {
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

    static async getTagByName (name) {
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
    static async addTag ({
        attributes,
        contentPatterns,
        description,
        name,
        notes,
        notesOpinionated,
        references,
        subtype,
        type,
    }) {
        try {
            const response = await axios.post(url, {
                attributes,
                contentPatterns,
                description,
                name,
                notes,
                notesOpinionated,
                references,
                subtype,
                type,
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
    static async updateTag ({
        _id,
        attributes,
        contentPatterns,
        description,
        name,
        notes,
        notesOpinionated,
        references,
        subtype,
        type,
    }) {
        try {
            const response = await axios.patch(`${url}${_id}`, {
                attributes,
                contentPatterns,
                description,
                name,
                notes,
                notesOpinionated,
                references,
                subtype,
                type,
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
    static removeTag (_id) {
        return axios.delete(`${url}${_id}`);
    }
}

export default TagService;
