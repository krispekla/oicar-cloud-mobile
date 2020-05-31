class CloudDbSQL {
	constructor(
		id,
		instance,
		ram,
		cpuCores,
		baskupSize,
		averageHoursPerDay,
		averageDaysPerWeek,
		sqlServerType,
		cloudProvider,
		price
	) {
		this.id = id;
		this.instance = instance;
		this.ram = ram;
		this.cpuCores = cpuCores;
		this.baskupSize = baskupSize;
		this.averageHoursPerDay = averageHoursPerDay;
		this.averageDaysPerWeek = averageDaysPerWeek;
		this.sqlServerType = sqlServerType;
		this.cloudProvider = cloudProvider;
		this.price = price;
	}
}

export default CloudDbSQL;
