import { useState, useCallback } from 'react';
import { apiRequest } from '../services/api';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (endpoint, options = {}) => {
        setLoading(true);
        setError(null); 
        
        try {
            const data = await apiRequest(endpoint, options);
            return data;
        } catch (err) {
            setError(err.message || 'Ocurrió un error inesperado');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { request, loading, error, setError };
};