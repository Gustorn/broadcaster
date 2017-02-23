import * as React from "react";
import {computed} from "mobx";
import {observer} from "mobx-react";
import t from "../../i18n";
import UiStore from "../../stores/ui";
import ScenesStore, {Scene, Layer} from "../../stores/scenes";
import * as styles from "../../../styles/layers.scss";
import {List, ListItem} from "./List";

interface LayersProps
{
	scenesStore: ScenesStore;
	uiStore: UiStore;
}

@observer
export default class Layers extends React.Component<LayersProps, any>
{
	addLayer = () => {
		const layer = new Layer();
		layer.name = "Layer " + (this.currentScene.layers.length + 1);
		this.currentScene.addLayer(layer);
	}

	@computed
	get currentScene()
	{
		return this.props.scenesStore.scenes
			.find(s => s.name == this.props.uiStore.currentScene) as Scene;
	}

	render()
	{
		return (
			<div className={styles.container}>
				<p>{this.currentScene.name} - {t("layers.listTitle")}</p>
				<button onClick={this.addLayer}>Add Layer</button>
				<List>
					{this.currentScene.layers.map(l =>
						<ListItem key={l.name} name={l.name} />)}
				</List>
			</div>
		);
	}
}
