/**
 * Options for compressing data into a DEFLATE format
 */
export interface DeflateOptions {
	/**
	 * The level of compression to use, ranging from 0-9.
	 *
	 * 0 will store the data without compression.
	 * 1 is fastest but compresses the worst, 9 is slowest but compresses the best.
	 * The default level is 6.
	 *
	 * Typically, binary data benefits much more from higher values than text data.
	 * In both cases, higher values usually take disproportionately longer than the reduction in final size that results.
	 *
	 * For example, a 1 MB text file could:
	 * - become 1.01 MB with level 0 in 1ms
	 * - become 400 kB with level 1 in 10ms
	 * - become 320 kB with level 9 in 100ms
	 */
	level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
	/**
	 * The memory level to use, ranging from 0-12. Increasing this increases speed and compression ratio at the cost of memory.
	 *
	 * Note that this is exponential: while level 0 uses 4 kB, level 4 uses 64 kB, level 8 uses 1 MB, and level 12 uses 16 MB.
	 * It is recommended not to lower the value below 4, since that tends to hurt performance.
	 * In addition, values above 8 tend to help very little on most data and can even hurt performance.
	 *
	 * The default value is automatically determined based on the size of the input data.
	 */
	mem?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
}
/**
 * Options for compressing data into a GZIP format
 */
export interface GzipOptions extends DeflateOptions {
	/**
	 * When the file was last modified. Defaults to the current time.
	 * Set this to 0 to avoid revealing a modification date entirely.
	 */
	mtime?: Date | string | number | undefined;
	/**
	 * The filename of the data. If the `gunzip` command is used to decompress the data, it will output a file with this name instead of the name of the compressed file.
	 */
	filename?: string | undefined;
}
/**
 * Options for compressing data into a Zlib format
 */
export type ZlibOptions = DeflateOptions;
/**
 * Handler for data (de)compression streams
 * @param dat A The data output from the stream processor
 * @param final Whether this is the final block
 */
export type FlateStreamHandler = (data: Uint8Array, final: boolean) => void;
/**
 * Handler for asynchronous data (de)compression streams
 * @param err Any error that occurred
 * @param dat A The data output from the stream processor
 * @param final Whether this is the final block
 */
export type AsyncFlateStreamHandler = (err: Error, data: Uint8Array, final: boolean) => void;
/**
 * Callback for asynchronous (de)compression methods
 * @param err Any error that occurred
 * @param dat A The resulting data. Only present if `err` is null
 */
export type FlateCallback = (err: Error | string, data: Uint8Array) => void;
export interface AsyncOptions {
	/**
	 * Whether or not to "consume" the source data. This will make the typed array/buffer you pass in unusable but will increase performance and reduce memory usage.
	 */
	consume?: boolean | undefined;
}
/**
 * Options for compressing data asynchronously into a DEFLATE format
 */
export interface AsyncDeflateOptions extends DeflateOptions, AsyncOptions {}
/**
 * Options for decompressing DEFLATE data asynchronously
 */
export interface AsyncInflateOptions extends AsyncOptions {
	/**
	 * The original size of the data. Currently, the asynchronous API disallows writing into a buffer you provide; the best you can do is provide the size in bytes and be given back a new typed array.
	 */
	size?: number | undefined;
}
/**
 * Options for compressing data asynchronously into a GZIP format
 */
export interface AsyncGzipOptions extends GzipOptions, AsyncOptions {}
/**
 * Options for decompressing GZIP data asynchronously
 */
export type AsyncGunzipOptions = AsyncOptions;
/**
 * Options for compressing data asynchronously into a Zlib format
 */
export interface AsyncZlibOptions extends ZlibOptions, AsyncOptions {}
/**
 * Options for decompressing Zlib data asynchronously
 */
export type AsyncUnzlibOptions = AsyncInflateOptions;
/**
 * A terminable compression/decompression process
 */
export interface AsyncTerminable {
	/**
	 * Terminates the worker thread immediately. The callback will not be called.
	 */
	(): void;
}
/**
 * Streaming DEFLATE compression
 */
export interface Deflate {
	/**
	 * Creates a DEFLATE stream
	 * @param opts The compression options
	 * @param cb The callback to call whenever data is deflated
	 */
	new (opts: DeflateOptions, cb?: FlateStreamHandler): this;
	new (cb?: FlateStreamHandler): this;
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
	/**
	 * Pushes a chunk to be deflated
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming DEFLATE compression
 */
export interface AsyncDeflate {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates an asynchronous DEFLATE stream
	 * @param opts The compression options
	 * @param cb The callback to call whenever data is deflated
	 */
	new (opts: DeflateOptions, cb?: AsyncFlateStreamHandler): this;
	/**
	 * Creates an asynchronous DEFLATE stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb?: AsyncFlateStreamHandler): this;
	/**
	 * Pushes a chunk to be deflated
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
	/**
	 * A method to terminate the stream's internal worker. Subsequent calls to push() will silently fail.
	 */
	terminate: AsyncTerminable;
}
/**
 * Asynchronously compresses data with DEFLATE without any wrapper
 * @param dat A The data to compress
 * @param opts The compression options
 * @param cb The function to be called upon compression completion
 * @returns A function that can be used to immediately terminate the compression
 */
export interface deflate {
	(data: Uint8Array, opts: AsyncDeflateOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchronously compresses data with DEFLATE without any wrapper
 * @param dat A The data to compress
 * @param cb The function to be called upon compression completion
 */
export interface deflate {
	(data: Uint8Array, cb: FlateCallback): AsyncTerminable;
}
/**
 * Compresses data with DEFLATE without any wrapper
 * @param dat A The data to compress
 * @param opts The compression options
 * @returns The deflated version of the data
 */
export interface deflateSync {
	(data: Uint8Array, opts?: DeflateOptions): Uint8Array;
}
/**
 * Streaming DEFLATE decompression
 */
export interface Inflate {
	/**
	 * Creates an inflation stream
	 * @param cb The callback to call whenever data is inflated
	 */
	new (cb?: FlateStreamHandler): this;
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
	/**
	 * Pushes a chunk to be inflated
	 * @param chunk The chunk to push
	 * @param final Whether this is the final chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming DEFLATE decompression
 */
export interface AsyncInflate {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates an asynchronous inflation stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb?: AsyncFlateStreamHandler): this;
	/**
	 * Pushes a chunk to be inflated
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
	/**
	 * A method to terminate the stream's internal worker. Subsequent calls to push() will silently fail.
	 */
	terminate: AsyncTerminable;
}
/**
 * Asynchronously expands DEFLATE data with no wrapper
 * @param dat A The data to decompress
 * @param opts The decompression options
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface inflate {
	(data: Uint8Array, opts: AsyncInflateOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchronously expands DEFLATE data with no wrapper
 * @param dat A The data to decompress
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface inflate {
	(data: Uint8Array, cb: FlateCallback): AsyncTerminable;
}
/**
 * Expands DEFLATE data with no wrapper
 * @param dat A The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
export interface inflateSync {
	(data: Uint8Array, out?: Uint8Array): Uint8Array;
}
/**
 * Streaming GZIP compression
 */
export interface Gzip {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
	/**
	 * Creates a GZIP stream
	 * @param opts The compression options
	 * @param cb The callback to call whenever data is deflated
	 */
	new (opts: GzipOptions, cb?: FlateStreamHandler): this;
	/**
	 * Creates a GZIP stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb?: FlateStreamHandler): this;
	/**
	 * Pushes a chunk to be GZIPped
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming GZIP compression
 */
export interface AsyncGzip {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates an asynchronous GZIP stream
	 * @param opts The compression options
	 * @param cb The callback to call whenever data is deflated
	 */
	new (opts: GzipOptions, cb?: AsyncFlateStreamHandler): this;
	/**
	 * Creates an asynchronous GZIP stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb?: AsyncFlateStreamHandler): this;
	/**
	 * Pushes a chunk to be GZIPped
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
	/**
	 * A method to terminate the stream's internal worker. Subsequent calls to push() will silently fail.
	 */
	terminate: AsyncTerminable;
}
/**
 * Asynchronously compresses data with GZIP
 * @param dat A The data to compress
 * @param opts The compression options
 * @param cb The function to be called upon compression completion
 * @returns A function that can be used to immediately terminate the compression
 */
export interface gzip {
	(data: Uint8Array, opts: AsyncGzipOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchronously compresses data with GZIP
 * @param dat A The data to compress
 * @param cb The function to be called upon compression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface gzip {
	(data: Uint8Array, cb: FlateCallback): AsyncTerminable;
}
/**
 * Compresses data with GZIP
 * @param dat A The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */
export interface gzipSync {
	(data: Uint8Array, opts?: GzipOptions): Uint8Array;
}
/**
 * Streaming GZIP decompression
 */
export interface Gunzip {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
	/**
	 * Creates a GUNZIP stream
	 * @param cb The callback to call whenever data is inflated
	 */
	new (cb?: FlateStreamHandler): this;
	/**
	 * Pushes a chunk to be GUNZIPped
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming GZIP decompression
 */
export interface AsyncGunzip {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;

	/**
	 * Creates an asynchronous GUNZIP stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb: AsyncFlateStreamHandler): this;

	/**
	 * Pushes a chunk to be GUNZIPped
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;

	/**
	 * A method to terminate the stream's internal worker. Subsequent calls to push() will silently fail.
	 */
	terminate: AsyncTerminable;
}
/**
 * Asynchronously expands GZIP data
 * @param dat A The data to decompress
 * @param opts The decompression options
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface gunzip {
	(data: Uint8Array, opts: AsyncGunzipOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchronously expands GZIP data
 * @param dat A The data to decompress
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface gunzip {
	(data: Uint8Array, cb: FlateCallback): AsyncTerminable;
}
/**
 * Expands GZIP data
 * @param dat A The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */
export interface gunzipSync {
	(data: Uint8Array, out?: Uint8Array): Uint8Array;
}
/**
 * Streaming Zlib compression
 */
export interface Zlib {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
	/**
	 * Creates a Zlib stream
	 * @param opts The compression options
	 * @param cb The callback to call whenever data is deflated
	 */
	new (opts: ZlibOptions, cb?: FlateStreamHandler): this;
	/**
	 * Creates a Zlib stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb?: FlateStreamHandler): this;
	/**
	 * Pushes a chunk to be zlibbed
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming Zlib compression
 */
export interface AsyncZlib {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates an asynchronous DEFLATE stream
	 * @param opts The compression options
	 * @param cb The callback to call whenever data is deflated
	 */
	new (opts: ZlibOptions, cb?: AsyncFlateStreamHandler): this;
	/**
	 * Creates an asynchronous DEFLATE stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb?: AsyncFlateStreamHandler): this;
	/**
	 * Pushes a chunk to be deflated
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
	/**
	 * A method to terminate the stream's internal worker. Subsequent calls to push() will silently fail.
	 */
	terminate: AsyncTerminable;
}
/**
 * Asynchronously compresses data with Zlib
 * @param dat A The data to compress
 * @param opts The compression options
 * @param cb The function to be called upon compression completion
 */
export interface zlib {
	(data: Uint8Array, opts: AsyncZlibOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchronously compresses data with Zlib
 * @param dat A The data to compress
 * @param cb The function to be called upon compression completion
 * @returns A function that can be used to immediately terminate the compression
 */
export interface zlib {
	(data: Uint8Array, cb: FlateCallback): AsyncTerminable;
}
/**
 * Compress data with Zlib
 * @param dat A The data to compress
 * @param opts The compression options
 * @returns The zlib-compressed version of the data
 */
export interface zlibSync {
	(data: Uint8Array, opts: ZlibOptions): Uint8Array;
}
/**
 * Streaming Zlib decompression
 */
export interface Unzlib {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
	/**
	 * Creates a Zlib decompression stream
	 * @param cb The callback to call whenever data is inflated
	 */
	new (cb?: FlateStreamHandler): this;
	/**
	 * Pushes a chunk to be unzlibbed
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming Zlib decompression
 */
export interface AsyncUnzlib {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates an asynchronous Zlib decompression stream
	 * @param cb The callback to call whenever data is deflated
	 */
	new (cb?: AsyncFlateStreamHandler): this;
	/**
	 * Pushes a chunk to be decompressed from Zlib
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
	/**
	 * A method to terminate the stream's internal worker. Subsequent calls to push() will silently fail.
	 */
	terminate: AsyncTerminable;
}
/**
 * Asynchronously expands Zlib data
 * @param dat A The data to decompress
 * @param opts The decompression options
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface unzlib {
	(data: Uint8Array, opts: AsyncGunzipOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchronously expands Zlib data
 * @param dat A The data to decompress
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface unzlib {
	(data: Uint8Array, cb: FlateCallback): AsyncTerminable;
}
/**
 * Expands Zlib data
 * @param dat A The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
export interface unzlibSync {
	(data: Uint8Array, out?: Uint8Array): Uint8Array;
}
export { gzip as compress, AsyncGzip as AsyncCompress };
export { gzipSync as compressSync, Gzip as Compress };
/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */
export interface Decompress {
	/**
	 * Creates a decompression stream
	 * @param cb The callback to call whenever data is decompressed
	 */
	new (cb?: FlateStreamHandler): this;
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
	/**
	 * Pushes a chunk to be decompressed
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */
export interface AsyncDecompress {
	/**
	 * Creates an asynchronous decompression stream
	 * @param cb The callback to call whenever data is decompressed
	 */
	new (cb?: AsyncFlateStreamHandler): this;
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * Pushes a chunk to be decompressed
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchrononously expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param dat A The data to decompress
 * @param opts The decompression options
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface decompress {
	(data: Uint8Array, opts: AsyncInflateOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchrononously expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param dat A The data to decompress
 * @param cb The function to be called upon decompression completion
 * @returns A function that can be used to immediately terminate the decompression
 */
export interface decompress {
	(data: Uint8Array, cb: FlateCallback): AsyncTerminable;
}
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param dat A The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
export interface decompressSync {
	(data: Uint8Array, out?: Uint8Array): Uint8Array;
}
/**
 * Attributes for files added to a ZIP archive object
 */
export interface ZipAttributes {
	/**
	 * The operating system of origin for this file. The value is defined by PKZIP's APPNOTE.txt, section 4.4.2.2. For example, 0 (the default) is MS/DOS, 3 is UNIX, 19 is macOS.
	 */
	os?: number | undefined;
	/**
	 * The file's attributes. These are traditionally somewhat complicated and platform-dependent, so using them is scarcely necessary. However, here is a representation of what this is, bit by bit:
	 *
	 * `TTTTugtrwxrwxrwx0000000000ADVSHR`
	 * TTTT = file type (rarely useful)
	 * u = setuid, g = setgid, t = sticky
	 * rwx = user permissions, rwx = group permissions, rwx = other permissions
	 * 0000000000 = unused
	 * A = archive, D = directory, V = volume label, S = system file, H = hidden, R = read-only
	 * If you want to set the Unix permissions, for instance, just bit shift by 16, e.g. 0644 << 16
	 */
	attrs?: number | undefined;

	/**
	 * Extra metadata to add to the file. This field is defined by PKZIP's APPNOTE.txt, section 4.4.28. At most 65,535 bytes may be used in each ID. The ID must be an integer between 0 and 65,535, inclusive.
	 *
	 * This field is incredibly rare and almost never needed except for compliance with proprietary standards and software.
	 */
	extra?: Record<number, Uint8Array> | undefined;

	/**
	 * The comment to attach to the file. This field is defined by PKZIP's APPNOTE.txt, section 4.4.26. The comment must be at most 65,535 bytes long UTF-8 encoded. This field is not read by consumer software.
	 */
	comment?: string | undefined;
	/**
	 * When the file was last modified. Defaults to the current time.
	 */
	mtime?: GzipOptions['mtime'] | undefined;
}
/**
 * Options for creating a ZIP archive
 */
export interface ZipOptions extends DeflateOptions, ZipAttributes {}
/**
 * Options for asynchronously creating a ZIP archive
 */
export interface AsyncZipOptions extends AsyncDeflateOptions, ZipAttributes {}
/**
 * Options for asynchronously expanding a ZIP archive
 */
export type AsyncUnzipOptions = AsyncOptions;
/**
 * A file that can be used to create a ZIP archive
 */
export type ZippableFile = Uint8Array | [Uint8Array, ZipOptions];
/**
 * A file that can be used to asynchronously create a ZIP archive
 */
export type AsyncZippableFile = Uint8Array | [Uint8Array, AsyncZipOptions];
/**
 * The complete directory structure of a ZIPpable archive
 */
export interface Zippable {
	[path: string]: Zippable | ZippableFile;
}
/**
 * The complete directory structure of an asynchronously ZIPpable archive
 */
export interface AsyncZippable {
	[path: string]: AsyncZippable | AsyncZippableFile;
}
/**
 * An unzipped archive. The full path of each file is used as the key,
 * and the file is the value
 */
export interface Unzipped {
	[path: string]: Uint8Array;
}
/**
 * Handler for string generation streams
 * @param dat A The string output from the stream processor
 * @param final Whether this is the final block
 */
export type StringStreamHandler = (data: string, final: boolean) => void;
/**
 * Callback for asynchronous ZIP decompression
 * @param err Any error that occurred
 * @param dat A The decompressed ZIP archive
 */
export type UnzipCallback = (err: Error | string, data: Unzipped) => void;
/**
 * Handler for streaming ZIP decompression
 * @param file The file that was found in the archive
 */
export type UnzipFileHandler = (file: UnzipFile) => void;
/**
 * Streaming UTF-8 decoding
 */
export interface DecodeUTF8 {
	/**
	 * Creates a UTF-8 decoding stream
	 * @param cb The callback to call whenever data is decoded
	 */
	new (cb?: StringStreamHandler): this;
	/**
	 * Pushes a chunk to be decoded from UTF-8 binary
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
	/**
	 * The handler to call whenever data is available
	 */
	ondata: StringStreamHandler;
}
/**
 * Streaming UTF-8 encoding
 */
export interface EncodeUTF8 {
	/**
	 * Creates a UTF-8 decoding stream
	 * @param cb The callback to call whenever data is encoded
	 */
	new (cb?: FlateStreamHandler): this;
	/**
	 * Pushes a chunk to be encoded to UTF-8
	 * @param chunk The string data to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: string, final?: boolean): void;
	/**
	 * The handler to call whenever data is available
	 */
	ondata: FlateStreamHandler;
}
/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */
export interface strToU8 {
	(str: string, latin1?: boolean): Uint8Array;
}
/**
 * Converts a Uint8Array to a string
 * @param dat The data to decode to string
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless encoding to binary string.
 * @returns The original UTF-8/Latin-1 string
 */
export interface strFromU8 {
	(dat: Uint8Array, latin1?: boolean): string;
}
/**
 * A stream that can be used to create a file in a ZIP archive
 */
export interface ZipInputFile extends ZipAttributes {
	/**
	 * The filename to associate with the data provided to this stream. If you want a file in a subdirectory, use forward slashes as a separator (e.g. `directory/filename.ext`). This will still work on Windows.
	 */
	filename: string;
	/**
	 * The size of the file in bytes. This attribute may be invalid after the file is added to the ZIP archive; it must be correct only before the stream completes.
	 *
	 * If you don't want to have to compute this yourself, consider extending the ZipPassThrough class and overriding its process() method, or using one of ZipDeflate or AsyncZipDeflate.
	 */
	size: number;
	/**
	 * A CRC of the original file contents. This attribute may be invalid after the file is added to the ZIP archive; it must be correct only before the stream completes.
	 *
	 * If you don't want to have to generate this yourself, consider extending the ZipPassThrough class and overriding its process() method, or using one of ZipDeflate or AsyncZipDeflate.
	 */
	crc: number;
	/**
	 * The compression format for the data stream. This number is determined by the spec in PKZIP's APPNOTE.txt, section 4.4.5. For example, 0 = no compression, 8 = deflate, 14 = LZMA
	 */
	compression: number;
	/**
	 * Bits 1 and 2 of the general purpose bit flag, specified in PKZIP's APPNOTE.txt, section 4.4.4. Should be between 0 and 3. This is unlikely to be necessary.
	 */
	flag?: number | undefined;
	/**
	 * The handler to be called when data is added. After passing this stream to the ZIP file object, this handler will always be defined. To call it:
	 *
	 * `stream.ondata(error, chunk, final)`
	 *
	 * error = any error that occurred (null if there was no error)
	 *
	 * chunk = a Uint8Array of the data that was added (null if there was an
	 * error)
	 *
	 * final = boolean, whether this is the final chunk in the stream
	 */
	ondata?: AsyncFlateStreamHandler | undefined;
	/**
	 * A method called when the stream is no longer needed, for clean-up purposes. This will not always be called after the stream completes, so you may wish to call this.terminate() after the final chunk is processed if you have clean-up logic.
	 */
	terminate?: AsyncTerminable | undefined;
}
/**
 * A pass-through stream to keep data uncompressed in a ZIP archive.
 */
export interface ZipPassThrough {
	filename: string;
	crc: number;
	size: number;
	compression: number;
	os?: number | undefined;
	attrs?: number | undefined;
	comment?: string | undefined;
	extra?: Record<number, Uint8Array> | undefined;
	mtime?: GzipOptions['mtime'] | undefined;
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates a pass-through stream that can be added to ZIP archives
	 * @param filename The filename to associate with this data stream
	 */
	new (filename: string): this;
	/**
	 * Processes a chunk and pushes to the output stream. You can override this method in a subclass for custom behavior, but by default this passes the data through. You must call this.ondata(err, chunk, final) at some point in this method.
	 * @param chunk The chunk to process
	 * @param final Whether this is the last chunk
	 */
	process(chunk: Uint8Array, final: boolean): void;
	/**
	 * Pushes a chunk to be added. If you are subclassing this with a custom compression algorithm, note that you must push data from the source file only, pre-compression.
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate for better performance
 */
export interface ZipDeflate {
	filename: string;
	crc: number;
	size: number;
	compression: number;
	flag: 0 | 1 | 2 | 3;
	os?: number | undefined;
	attrs?: number | undefined;
	comment?: string | undefined;
	extra?: Record<number, Uint8Array> | undefined;
	mtime?: GzipOptions['mtime'] | undefined;
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates a DEFLATE stream that can be added to ZIP archives
	 * @param filename The filename to associate with this data stream
	 * @param opts The compression options
	 */
	new (filename: string, opts?: DeflateOptions): this;

	process(chunk: Uint8Array, final: boolean): void;
	/**
	 * Pushes a chunk to be deflated
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * Asynchronous streaming DEFLATE compression for ZIP archives
 */
export interface AsyncZipDeflate {
	filename: string;
	crc: number;
	size: number;
	compression: number;
	flag: 0 | 1 | 2 | 3;
	os?: number | undefined;
	attrs?: number | undefined;
	comment?: string | undefined;
	extra?: Record<number, Uint8Array> | undefined;
	mtime?: GzipOptions['mtime'] | undefined;
	ondata: AsyncFlateStreamHandler;
	terminate: AsyncTerminable;
	/**
	 * Creates a DEFLATE stream that can be added to ZIP archives
	 * @param filename The filename to associate with this data stream
	 * @param opts The compression options
	 */
	new (filename: string, opts?: DeflateOptions): this;
	process(chunk: Uint8Array, final: boolean): void;
	/**
	 * Pushes a chunk to be deflated
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): void;
}
/**
 * A zippable archive to which files can incrementally be added
 */
export interface Zip {
	/**
	 * Creates an empty ZIP archive to which files can be added
	 * @param cb The callback to call whenever data for the generated ZIP archive
	 *           is available
	 */
	new (cb?: AsyncFlateStreamHandler): this;
	/**
	 * Adds a file to the ZIP archive
	 * @param file The file stream to add
	 */
	add(file: ZipInputFile): void;
	/**
	 * Ends the process of adding files and prepares to emit the final chunks.
	 * This *must* be called after adding all desired files for the resulting
	 * ZIP file to work properly.
	 */
	end(): void;
	/**
	 * A method to terminate any internal workers used by the stream. Subsequent calls to add() will fail.
	 */
	terminate(): void;
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
}
/**
 * Asynchronously creates a ZIP file
 * @param dat A The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @param cb The callback to call with the generated ZIP archive
 * @returns A function that can be used to immediately terminate the compression
 */
export interface zip {
	(data: AsyncZippable, opts: AsyncZipOptions, cb: FlateCallback): AsyncTerminable;
}
/**
 * Asynchronously creates a ZIP file
 * @param dat A The directory structure for the ZIP archive
 * @param cb The callback to call with the generated ZIP archive
 * @returns A function that can be used to immediately terminate the compression
 */
export interface zip {
	(data: AsyncZippable, cb: FlateCallback): AsyncTerminable;
}
/**
 * Synchronously creates a ZIP file. Prefer using `zip` for better performance
 * with more than one file.
 * @param dat A The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @returns The generated ZIP archive
 */
export interface zipSync {
	(data: Zippable, opts?: ZipOptions): Uint8Array;
}
/**
 * A decoder for files in ZIP streams
 */
export interface UnzipDecoder {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * Pushes a chunk to be decompressed
	 * @param dat A The data in this chunk. Do not consume (detach) this data.
	 * @param final Whether this is the last chunk in the data stream
	 */
	push(data: Uint8Array, final: boolean): void;
	/**
	 * A method to terminate any internal workers used by the stream. Subsequent calls to push() should silently fail.
	 */
	terminate?: AsyncTerminable | undefined;
}
/**
 * A constructor for a decoder for unzip streams
 */
export interface UnzipDecoderConstructor {
	/**
	 * Creates an instance of the decoder
	 * @param filename The name of the file
	 * @param size The compressed size of the file
	 * @param originalSize The original size of the file
	 */
	new (filename: string, size?: number, originalSize?: number): UnzipDecoder;
	/**
	 * The compression format for the data stream. This number is determined by the spec in PKZIP's APPNOTE.txt, section 4.4.5. For example, 0 = no
	 * compression, 8 = deflate, 14 = LZMA
	 */
	compression: number;
}
/**
 * Streaming file extraction from ZIP archives
 */
export interface UnzipFile {
	/**
	 * The handler to call whenever data is available
	 */
	ondata: AsyncFlateStreamHandler;
	/**
	 * The name of the file
	 */
	name: string;
	/**
	 * The compression format for the data stream. This number is determined by the spec in PKZIP's APPNOTE.txt, section 4.4.5. For example, 0 = no compression, 8 = deflate, 14 = LZMA. If start() is called but there is no decompression stream available for this method, start() will throw.
	 */
	compression: number;
	/**
	 * The compressed size of the file
	 */
	size?: number | undefined;
	/**
	 * The original size of the file
	 */
	originalSize?: number | undefined;
	/**
	 * Starts reading from the stream. Calling this function will always enable this stream, but ocassionally the stream will be enabled even without this being called.
	 */
	start(): void;
	/**
	 * A method to terminate any internal workers used by the stream. ondata will not be called any further.
	 */
	terminate: AsyncTerminable;
}
/**
 * Streaming pass-through decompression for ZIP archives
 */
export interface UnzipPassThrough {
	compression: number;
	ondata: AsyncFlateStreamHandler;
	push(data: Uint8Array, final: boolean): void;
}
/**
 * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
 * better performance.
 */
export interface UnzipInflate {
	compression: number;
	ondata: AsyncFlateStreamHandler;
	/**
	 * Creates a DEFLATE decompression that can be used in ZIP archives
	 */
	new (): this;
	push(data: Uint8Array, final: boolean): void;
}
/**
 * Asynchronous streaming DEFLATE decompression for ZIP archives
 */
export interface AsyncUnzipInflate {
	compression: number;
	ondata: AsyncFlateStreamHandler;
	terminate: AsyncTerminable;
	/**
	 * Creates a DEFLATE decompression that can be used in ZIP archives
	 */
	new (_: string, sz?: number): this;
	push(data: Uint8Array, final: boolean): void;
}
/**
 * A ZIP archive decompression stream that emits files as they are discovered
 */
export interface Unzip {
	/**
	 * Creates a ZIP decompression stream
	 * @param cb The callback to call whenever a file in the ZIP archive is found
	 */
	new (cb?: UnzipFileHandler): this;
	/**
	 * Pushes a chunk to be unzipped
	 * @param chunk The chunk to push
	 * @param final Whether this is the last chunk
	 */
	push(chunk: Uint8Array, final?: boolean): any;
	/**
	 * Registers a decoder with the stream, allowing for files compressed with the compression type provided to be expanded correctly
	 * @param decoder The decoder constructor
	 */
	register(decoder: UnzipDecoderConstructor): void;
	/**
	 * The handler to call whenever a file is discovered
	 */
	onfile: UnzipFileHandler;
}
/**
 * Asynchronously decompresses a ZIP archive
 * @param dat A The raw compressed ZIP file
 * @param cb The callback to call with the decompressed files
 * @returns A function that can be used to immediately terminate the unzipping
 */
export interface unzip {
	(data: Uint8Array, cb: UnzipCallback): AsyncTerminable;
}
/**
 * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
 * performance with more than one file.
 * @param dat A The raw compressed ZIP file
 * @returns The decompressed files
 */
export interface unzipSync {
	(data: Uint8Array): Unzipped;
}
export interface Stats {
	(): Stats;
	REVISION: number;
	dom: HTMLDivElement;
	addPanel(panel: Panel): Panel;
	showPanel(id: number): void;
	begin(): void;
	end(): void;
	update(): void;
	domElement: HTMLDivElement;
	setMode(id: number): void;
}

export interface GUI {
	new (param: any): this;
}

export interface Panel {
	(name?: string, fg?: string, bg?: string): Panel;
	dom: HTMLCanvasElement;
	update(value: number, maxValue: number): void;
}

export interface TweenUnknownProps {
	[key: string]: any;
}

export interface Tween {
	new (object: TweenUnknownProps, group?: TweenGroup | false): this;
	getId(): number;
	isPlaying(): boolean;
	isPaused(): boolean;
	to(properties: TweenUnknownProps, duration?: number): this;
	duration(d?: number): this;
	start(time?: number): this;
	stop(): this;
	end(): this;
	pause(time?: number): this;
	resume(time?: number): this;
	stopChainedTweens(): this;
	group(group?: TweenGroup): this;
	delay(amount?: number): this;
	repeat(times?: number): this;
	repeatDelay(amount?: number): this;
	yoyo(yoyo?: boolean): this;
	easing(easingFunction?: EasingFunction): this;
	interpolation(interpolationFunction?: InterpolationFunction): this;
	chain(...tweens: Array<Tween>): this;
	onStart(callback?: (object: TweenUnknownProps) => void): this;
	onEveryStart(callback?: (object: TweenUnknownProps) => void): this;
	onUpdate(callback?: (object: TweenUnknownProps, elapsed: number) => void): this;
	onRepeat(callback?: (object: TweenUnknownProps) => void): this;
	onComplete(callback?: (object: TweenUnknownProps) => void): this;
	onStop(callback?: (object: TweenUnknownProps) => void): this;
	/**
	 * @returns true if the tween is still playing after the update, false
	 * otherwise (calling update on a paused tween still returns true because
	 * it is still playing, just paused).
	 */
	update(time?: number, autoStart?: boolean): boolean;
}

export type EasingFunction = (amount: number) => number;

/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
export interface Easing {
	Linear: {
		None: EasingFunction;
	};
	Quadratic: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Cubic: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Quartic: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Quintic: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Sinusoidal: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Exponential: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Circular: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Elastic: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Back: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	Bounce: {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
	generatePow(power?: number): {
		In: EasingFunction;
		Out: EasingFunction;
		InOut: EasingFunction;
	};
}

export type InterpolationFunction = (v: number[], k: number) => number;

/**
 *
 */
export interface Interpolation {
	Linear: InterpolationFunction;
	Bezier: InterpolationFunction;
	CatmullRom: InterpolationFunction;
	Utils: {
		Linear: (p0: number, p1: number, t: number) => number;
		Bernstein: (n: number, i: number) => number;
		Factorial: (n: number) => number;
		CatmullRom: (p0: number, p1: number, p2: number, p3: number, t: number) => number;
	};
}

export interface TweenGroup {
	new (): this;
	getAll(): Array<Tween>;
	removeAll(): void;
	add(tween: Tween): void;
	remove(tween: Tween): void;
	update(time?: number, preserve?: boolean): boolean;
}

export interface TWEEN {
	update(time?: number, preserve?: boolean): boolean;
	getAll(): Array<Tween>;
	removeAll(): void;
	nextId(): number;
	now(): number;
	Easing: Easing;
	Interpolation: InterpolationFunction;
	Tween: Tween;
	Group: TweenGroup;
}
