class CloudVM {
	constructor(
		id,
		instanceNb,
		operatingSystem,
		core,
		ram,
		storage,
		storageType,
		averageHoursPerDay,
		averageDaysPerWeek,
		cloudProvider,
		price
	) {
		this.id = id;
		this.instanceNb = instanceNb;
		this.operatingSystem = operatingSystem;
		this.core = core;
		this.ram = ram;
		this.storage = storage;
		this.storageType = storageType;
		this.averageHoursPerDay = averageHoursPerDay;
		this.averageDaysPerWeek = averageDaysPerWeek;
		this.cloudProvider = cloudProvider;
		this.price = price;
	}
}

export default CloudVM;
