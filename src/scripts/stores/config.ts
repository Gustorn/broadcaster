import Storage from "../storage";

export default class ConfigStore extends Storage<ConfigStore>
{
	hardwareAcceleration = false;
	smoothScrolling = false;

	constructor()
	{
		super("config.json");
	}
}
