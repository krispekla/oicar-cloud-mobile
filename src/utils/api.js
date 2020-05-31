export const fetchTest = () => {
	fetch('http://localhost:8014/test').then(res => res.json());
};

export const baseUrl = 'http://10.0.2.2:5005/api';

export const functionUrl = `http://10.0.2.2:5005/api/CloudFunction`;
export const storageUrl = `http://10.0.2.2:5005/api/CloudStorage`;
export const sqlUrl = `http://10.0.2.2:5005/api/DbSQLCloud`;
export const vmUrl = `http://10.0.2.2:5005/api/CloudVM`;
