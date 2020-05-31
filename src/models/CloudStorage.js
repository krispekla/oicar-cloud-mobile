class CloudStorage {
	constructor(
		id,
		totalAmount,
		readOperationsPerMonth,
		writeOperationsPerMonth,
		cloudProvider,
		price
	) {
		this.id = id;
		this.totalAmount = totalAmount;
		this.readOperationsPerMonth = readOperationsPerMonth;
		this.writeOperationsPerMonth = writeOperationsPerMonth;
		this.cloudProvider = cloudProvider;
		this.price = price;
	}
}

export default CloudStorage;
