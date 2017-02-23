import {observable, action} from "mobx";
import t from "../i18n";
import Storage, {Type} from "../storage";

export class Layer
{
	@observable name: string = "";
}

export class Scene
{
	@observable name: string = t("scenes.defaultName");
	@observable layers: Layer[] = [];

	@action.bound
	addLayer(layer: Layer)
	{
		this.layers.push(layer);
	}
}

export default class ScenesStore extends Storage<ScenesStore>
{
	@Type(() => Scene)
	@observable scenes: Scene[] = [new Scene()];

	constructor()
	{
		super("scenes.json");
	}

	@action.bound
	addScene(scene: Scene)
	{
		this.scenes.push(scene);
	}
}
