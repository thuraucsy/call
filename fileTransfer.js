document.querySelector('input').onchange = function(event) {
	console.log('input onchange');
	const file = event.target.files[0];
	const blob = new Blob(event.target.files, { type: file.type });
	console.log('blob', blob);
	for (var ind in remoteDataConn) {
		console.log('file is sending now...');
		var conn = remoteDataConn[ind];
		conn.send({
			file: blob,
			filename: file.name,
			filetype: file.type
		});
	}

}

function byteToBase64(input) {
	const keyStr =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	let output = ''
	let chr1, chr2, chr3, enc1, enc2, enc3, enc4
	let i = 0
	while (i < input.length) {
		chr1 = input[i++]
		/* Not sure if the index */
		chr2 = i < input.length ? input[i++] : Number.NaN
		/* checks are needed here */
		chr3 = i < input.length ? input[i++] : Number.NaN
		enc1 = chr1 >> 2
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
		enc4 = chr3 & 63
		if (isNaN(chr2)) {
			enc3 = enc4 = 64
		} else if (isNaN(chr3)) {
			enc4 = 64
		}
		output +=
		keyStr.charAt(enc1) +
		keyStr.charAt(enc2) +
		keyStr.charAt(enc3) +
		keyStr.charAt(enc4)
	}
	return output
}

function saveFile(blob, filename) {
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = filename;
	link.textContent = `Click to download '${filename}' (${blob.size} bytes)`;
	link.style.display = 'block';
	// link.click();
	return link;
};