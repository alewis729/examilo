import React from "react";
import { Transition, animated, config } from "react-spring";
import lorem from "lorem-ipsum";

let id = 0;
let spring = { ...config.default, precision: 0.1 };
let generateMsg = () => ({ key: id++, msg: lorem() });

const SpringAlerts = () => {
	state = { items: [] };
	cancelMap = new WeakMap();
	add = () =>
		this.setState((state) => ({ items: [...state.items, generateMsg()] }));
	remove = (item) =>
		this.setState((state) => ({
			items: state.items.filter((i) => i.key !== item.key)
		}));
	config = (item, state) =>
		state === "leave" ? [{ duration: 4000 }, spring, spring] : spring;
	cancel = (item) => this.cancelMap.has(item) && this.cancelMap.get(item)();
	leave = (item) => async (next, cancel) => {
		this.cancelMap.set(item, cancel);
		await next({ life: 0 });
		await next({ opacity: 0 });
		await next({ height: 0 }, true); // Inform Keyframes that is is the last frame
	};

	return (
		<div className="main">
			<button onClick={this.add}>Add message</button>
			<div className="container">
				<Transition
					native
					items={this.state.items}
					keys={(item) => item.key}
					from={{ opacity: 0, height: 0, life: 1 }}
					enter={{ opacity: 1, height: "auto" }}
					leave={this.leave}
					onRest={this.remove}
					config={this.config}
				>
					{(item) => ({ life, ...props }) => (
						<animated.div style={props} className="msg">
							<div className="content">
								<animated.div
									style={{
										right: life.interpolate(
											(l) => `calc(${l * 100}%)`
										)
									}}
									className="life"
								/>
								<p>{item.msg}</p>
								<button onClick={() => this.cancel(item)} />
							</div>
						</animated.div>
					)}
				</Transition>
			</div>
		</div>
	);
};

export default SpringAlerts;
