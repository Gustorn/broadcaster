import {remote, app} from "electron";
import {join} from "path";
import {writeFile, writeFileSync, readFile, readFileSync} from "mz/fs";
import {Exclude, classToClass, serialize, deserialize} from "class-transformer";

export default class Storage<T extends Storage<any>>
{
	@Exclude() private _path: string;
	@Exclude() private _isWriting: boolean;

	constructor(fileName: string)
	{
		this._path = join((app || remote.app).getPath("userData"), fileName);
	}

	async init()
	{
		const data = await this.load(this.constructor as any);
		Object.assign(this, data);
	}

	initSync()
	{
		const data = this.loadSync(this.constructor as any);
		Object.assign(this, data);
	}

	async load(cls: {new(..._: any[]): T}): Promise<T>
	{
		try
		{
			const data = await readFile(this._path, "utf8");
			return deserialize(cls, data);
		}
		catch (e)
		{
			if (e.code == "ENOENT") return classToClass(new cls());
			else throw e;
		}
	}

	loadSync(cls: {new(..._: any[]): T}): T
	{
		try
		{
			const data = readFileSync(this._path, "utf8");
			return deserialize(cls, data);
		}
		catch (e)
		{
			if (e.code == "ENOENT") return classToClass(new cls());
			else throw e;
		}
	}

	async save()
	{
		if (this._isWriting) return;

		this._isWriting = true;
		await writeFile(this._path, serialize(this));
		this._isWriting = false;
	}

	saveSync()
	{
		if (this._isWriting) return;

		this._isWriting = true;
		writeFileSync(this._path, serialize(this));
		this._isWriting = false;
	}
}

export * from "class-transformer";
