/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
// @ts-nocheck

export {
    unzip,
	unzipSync,
	strFromU8,
	Deflate,
	AsyncDeflate,
	AsyncDecompress,
	AsyncGunzip,
	AsyncGzip,
	AsyncInflate,
	AsyncUnzipInflate,
	AsyncUnzlib,
	AsyncZipDeflate,
	AsyncZlib,
	DecodeUTF8,
	Decompress,
	EncodeUTF8,
	Gunzip,
	Gzip,
	Inflate,
	Unzip,
	UnzipInflate,
	UnzipPassThrough,
	Unzlib,
	Zip,
	ZipDeflate,
	ZipPassThrough,
	Zlib,
} from 'three/examples/jsm/libs/fflate.module';
