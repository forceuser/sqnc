const ad = require("active-data");

ad.setOptions({
	immediateAutorun: true // make recalculations for each change
});

const data = ad.makeObservable({
	welcomeMessage: "Hello,",
	firstName: "Luke",
	lastName: "Skywalker"
});

ad.makeComputed(data, "fullName", self => `${self.firstName} ${self.lastName}`);

ad.makeAutorun(() => {
	console.log(data.welcomeMessage + " " + data.fullName);
});
// "Hello, Luke Skywalker" will be printed immediately (can be configured)

data.firstName = "Leia"; // will print "Hello, Leia Skywalker"

ad.run(() => {
	// group changes and run autorun function only at the end
	data.firstName = "Anakin";
	data.welcomeMessage = "Welcome to dark side,";
});
