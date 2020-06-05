export const fetchTest = () => {
	fetch('http://localhost:8014/test').then(res => res.json());
};

export const baseUrl = 'http://10.0.2.2:5005/api';

export const functionUrl = `${baseUrl}/CloudFunction`;
export const storageUrl = `${baseUrl}/CloudStorage`;
export const sqlUrl = `h${baseUrl}/DbSQLCloud`;
export const vmUrl = `${baseUrl}/CloudVM`;
export const userUrl = `${baseUrl}/User`;
export const suggestionUrl = `${baseUrl}/Statistic`;
