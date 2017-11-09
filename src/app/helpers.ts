/* [closest]
	can find closest element like jQuery when event is bubling
*/
export function closest(node: any, selector: string): HTMLElement | null {
	while (node) {
		if (node.matches(selector)) return node;
		else node = node.parentElement;
	}
	return null;
}

/* [byte codes]
	We can't take an HTML in JSON, that's why we need to handle HTML.
	Byte codes - is a simplest way to do this.
	The opened and closed tags are named as expected, but angles will be
	replaced by square brackets and the content of tag marking is lightly
	different.
*/
export function parseByteTags(input: string): string {
	let output: string;
	output = input
		// [a]href|name[/a] (links)
		.replace(/\[a\](.+?)\|(.+?)\[\/a\]/gim, '<a href="$1">$2</a>')
		// [b][/b] (bold text)
		.replace(/\[b\](.+?)\[\/b\]/gim, '<b>$1</b>');
	return output;
}

/* [time parsing]
	Parse time from timestamp.
	[default] - takes timestamp, creates date and gives us time in format: hh:mm
	[time to date] - takes timestamp and {captionFlag}. If flag is enabled then we
	need to parse minutes, hours and days from it;
*/
export function parseTime(time: number, captionFlag?: boolean) {
	if (!time) { return ""; }
	let result: string;

	// default
	let date = new Date(time);
	let hours: number = date.getHours(),
			minutes: number = date.getMinutes();

	// temp variables
	let m = 1000 * 60; 	// minutes
	let h = m * 60; 		// hours
	let d = h * 24; 		// days

	// time to date
	let daysTo = Math.floor(time / d);
	let hoursTo = Math.floor(time/h % 24);
	let minutesTo = Math.floor(time/m % 60);
	let secondsTo = Math.floor(time/1000 % 60);

	// checking ( %D | %H hours %M minutes ago | right now || %h:%m )
	result = captionFlag ? daysTo > 0 ? `
		${daysTo > 0 ? '%D day' : ''}${daysTo > 1 ? 's ' : ''} ago
	` : Math.floor(time/m) > 0 ? `
		${hoursTo > 0 ? '%H hour' : ''}${hoursTo > 1 ? 's ' : ''}
		${minutesTo > 0 ? '%M min' : ''}${minutesTo > 1 ? 's ' : ''}
		ago
	` : Math.floor(time/1000) > 5 ? `
		${secondsTo} seconds ago
	` : "right now" : "%h:%m";

	return result
		.replace(/\%\h/gm, handleZero(hours, captionFlag).toString())
		.replace(/\%\m/gm, handleZero(minutes, captionFlag).toString())
		.replace(/\%\M/gm, handleZero(minutesTo, captionFlag).toString())
		.replace(/\%\H/gm, handleZero(hoursTo, captionFlag).toString())
		.replace(/\%\D/gm, handleZero(daysTo, captionFlag).toString());
}

/* [time parsing : helper]
	if value less then 10 we ned to insert zero before symbol
*/
function handleZero(value: string | number, captionFlag: boolean): string | number {
	return captionFlag ? value : value > 9 ? value : "0"+value;
}

/* [time parsing : helper]
	subtract [FROM] timestamp from [NOW] timestamp and retunrs the difference
*/
export function parseTimeFrom(time: number, fromTime?: number){
	if (!fromTime){ fromTime = new Date().getTime(); }
	if (!time) { return ""; }
	return parseTime(fromTime - time, true);
}

/* [shuffling]
	Shuffle array, takes and returns array
*/
export function shuffleArray(a: any) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
	return a;
}

/* [final event]
	Waiting for final event. For example, we need to send search string to
	server only if typing was finished. Not every keyup.
*/
export let waitForFinalEvent: any = (function(): any {
	let timers: any = {};
	return function (callback: any, ms: number, id: string | number) {
		if (!id) { id = "Don't call this twice without a id"; }
		if (timers[id]) { clearTimeout(timers[id]); }
		timers[id] = setTimeout(callback, ms);
	};
})();

/* [extending]
	Extends one object by another object
*/
export function extend(obj1: any, obj2: any):any {
	if (!obj2){
		console.log(`[warning] Helpers.extend :: there is no second object`);
		return obj1;
	}
	let resultObj: any = {};
	for (let key in obj2){
		resultObj[key] = obj2[key] || obj1[key];
	}
	return resultObj;
}

/* [clamping]
	Clamps value between two point
*/
export function clamp(val: number, min: number, max: number) {
	return val > max ? max : val < min ? min : val;
}

/* [dashes escaping]
	converting "string_like_this" to "String like this"
*/
export function escape(str: string) {
	return str.split('_').map((word: any, i: number)=> {
		return i === 0 ? word.substr(0,1).toUpperCase() + word.substr(1) : word;
	}).join(' ');
}

/*

*/
export function dropDoubleUsers(arr: any) {
	let result: any,
			foundedNames: string[] = [];
	result = arr.filter((obj: any)=> {
		if (foundedNames.indexOf(obj.name) === -1){
			foundedNames.push(obj.name);
			return true;
		}
		return false;
	});
	return result;
}