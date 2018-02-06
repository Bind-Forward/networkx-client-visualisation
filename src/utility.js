import toastr from 'toastr';

const toastrOptions = {
	closeButton: true,
	closeMethod: 'fadeOut',
	closeDuration: 300,
	closeEasing: 'swing',
	progressBar: true,
	timeOut: 5,
	extendedTimeOut: 10
};

export function displayAlertMessages(messages = [], header = "Error", type = 3) {	
	messages.map(msg => {
		return displayAlertMessage(msg, header, type)
	})
}

export function displayAlertMessage(message, header, type) {
	toastr.options = toastrOptions;
	switch (type) {
		case 1:
			toastr.success(message, header);
			break;
		case 2:
			toastr.warning(message, header);
			break;
		default:
			toastr.error(message, header);
	}

}