const fs = require('node:fs/promises');
const path = require('node:path');

const token = process.env.FIGMA_TOKEN;
const fileKey = process.env.FILE_KEY;
if (!token || !fileKey) {
	console.error('Missing FIGMA_TOKEN or FILE_KEY env vars.');
	process.exit(1);
}

const api = 'https://api.figma.com/v1';
const headers = { Authorization: `Bearer ${token}` };

async function getJson(url) {
	const res = await fetch(url, { headers });
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(`${res.status} ${res.statusText} for ${url}\n${text}`);
	}
	return res.json();
}

async function fetchFile() {
	return getJson(`${api}/files/${fileKey}`);
}

async function fetchImages(ids, format = 'png', scale = 2) {
	if (!ids.length) return { images: {} };
	const url = new URL(`${api}/images/${fileKey}`);
	url.searchParams.set('ids', ids.join(','));
	url.searchParams.set('format', format);
	url.searchParams.set('scale', String(scale));
	return getJson(url.toString());
}

function collectIdsBy(node, predicate, collected = []) {
	if (!node) return collected;
	if (predicate(node)) collected.push(node.id);
	if (node.children) for (const child of node.children) collectIdsBy(child, predicate, collected);
	return collected;
}

function hasImageFill(node) {
	const fills = node.fills || [];
	return Array.isArray(fills) && fills.some(f => f.type === 'IMAGE');
}

async function download(url, filePath) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to download ${url}`);
	const buf = Buffer.from(await res.arrayBuffer());
	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, buf);
}

async function main() {
	const file = await fetchFile();
	const pages = file.document?.children || [];
	console.log('Pages:', pages.map(p => p.name));

	const allImageNodeIds = [];
	for (const page of pages) collectIdsBy(page, hasImageFill, allImageNodeIds);
	console.log(`Found ${allImageNodeIds.length} image nodes`);

	const outDir = path.join(process.cwd(), 'exports');
	await fs.mkdir(path.join(outDir, 'json'), { recursive: true });
	await fs.writeFile(path.join(outDir, 'json', 'file.json'), JSON.stringify(file, null, 2));
	console.log('Wrote exports/json/file.json');

	if (allImageNodeIds.length) {
		const { images } = await fetchImages(allImageNodeIds, 'png', 2);
		for (const [nodeId, imgUrl] of Object.entries(images)) {
			if (!imgUrl) continue;
			const outPath = path.join(outDir, 'images', `${nodeId}.png`);
			await download(imgUrl, outPath);
			console.log('Saved', outPath);
		}
	}
}

main().catch(err => { console.error(err); process.exit(1); });

