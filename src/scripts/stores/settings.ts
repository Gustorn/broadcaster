import Storage from "../storage";

export default class SettingsStore extends Storage<SettingsStore>
{
	hardwareAcceleration = false;
	smoothScrolling = false;

	constructor()
	{
		super("settings.json");
	}
}
