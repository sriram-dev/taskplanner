function CustomTimePicker(from,to){
	var pickercol = Ti.UI.createPickerColumn({
		left:'5%'
	});
	for(i=from;i<=to;i++){
		var row = Ti.UI.createPickerRow({
			title:i
		});
		pickercol.add(row);
	}
	return pickercol;
}
