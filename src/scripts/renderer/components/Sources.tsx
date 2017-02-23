import * as React from "react";
import {computed} from "mobx";
import {observer} from "mobx-react";
import t from "../../i18n";
import UiStore from "../../stores/ui";
import ScenesStore, {Scene, Source} from "../../stores/scenes";
import {List, ListItem} from "./List";

interface SourcesProps
{
	scenesStore: ScenesStore;
	uiStore: UiStore;
}

@observer
export default class Sources extends React.Component<SourcesProps, any>
{
	addSource = () => {
		const source = new Source();
		source.name = "Source " + (this.currentScene.sources.length + 1);
		this.currentScene.addSource(source);
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
			<div style={{flex: 1}}>
				<p>{this.currentScene.name} - {t("sources.listTitle")}</p>
				<button onClick={this.addSource}>Add Source</button>
				<List>
					{this.currentScene.sources.map(s =>
						<ListItem key={s.name} name={s.name} />)}
				</List>
			</div>
		);
	}
}
