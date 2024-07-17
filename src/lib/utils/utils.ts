export const selfCheck = (path: string, link: string) => {
	const splitPath = path.split('/');
	const splitDest = link.split('/');

	for (let x = 0; x < splitDest.length; x++) {
		if (splitPath[x] !== splitDest[x]) {
			return false;
		}
	}
    
	return true;
};
