export const fetchTest = () => {
	fetch('http://localhost:8014/test').then(res => res.json());
};

export const baseUrl = 'http://10.0.2.2:8014/api';
