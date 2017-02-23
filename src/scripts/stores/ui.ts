import {observable} from "mobx";
import Storage from "../storage";

export default class UiStore extends Storage<UiStore>
{
	@observable currentScene: string = "Scene";
	@observable footerHeight: number = 250;

	constructor()
	{
		super("ui.json");
	}
}
