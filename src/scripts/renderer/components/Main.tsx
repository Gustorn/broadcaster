import * as React from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import ScenesStore from "../../stores/scenes";
import SettingsStore from "../../stores/settings";
import UiStore from "../../stores/ui";
import * as styles from "../../../styles/main.scss";
import Sources from "./Sources";
import Dragger from "./Dragger";

const scenesStore = new ScenesStore();
const settingsStore = new SettingsStore();
const uiStore = new UiStore();

function saveStores()
{
	scenesStore.saveSync();
	settingsStore.saveSync();
	uiStore.saveSync();
}

@observer
export default class Main extends React.Component<any, any>
{
	@observable loaded = false;

	async componentDidMount()
	{
		await scenesStore.init();
		await settingsStore.init();
		await uiStore.init();
		this.loaded = true;
		(window as any)["save"] = saveStores;

		window.onbeforeunload = saveStores;
	}

	render()
	{
		return this.loaded ? (
			<div className={styles.container}>
				<section className={styles.preview}>

				</section>
				<footer className={styles.footer} ref={e => (this.refs["dragger"] as any).setElement(e)}>
					<Dragger ref="dragger" uiStore={uiStore}
						min={200} max={window.innerHeight - 100} />

					<Sources scenesStore={scenesStore} uiStore={uiStore} />
				</footer>
			</div>
		) : (
			<div style={{display: "flex", height: "100%"}}>
				{/* TODO: loading screen? */}
			</div>
		);
	}
}
