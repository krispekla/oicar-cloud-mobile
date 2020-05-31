class CloudFunction {
	constructor(
		id,
		executinPerRequestInMiliseconds,
		memorySizeInMB,
		executionsPerMonth,
		cloudProvider,
		price
	) {
		this.id = id;
		this.executinPerRequestInMiliseconds = executinPerRequestInMiliseconds;
		this.memorySizeInMB = memorySizeInMB;
		this.executionsPerMonth = executionsPerMonth;
		this.cloudProvider = cloudProvider;
		this.price = price;
	}
}

export default CloudFunction;
