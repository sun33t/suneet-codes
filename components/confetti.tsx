"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export const Confetti = () => {
	useEffect(() => {
		const scalar = 2;
		const unicorn = confetti.shapeFromText({ text: "🦄", scalar });
		const fireConfetti = () => {
			confetti({
				particleCount: 100,
				startVelocity: 30,
				spread: 360,
				shapes: [unicorn || "circle"],
				scalar,

				origin: {
					x: 0.5,
					y: 0,
				},
			});
			confetti({
				particleCount: 100,
				startVelocity: 30,
				spread: 360,
				shapes: ["circle"],
				scalar: 1,

				origin: {
					x: 0.5,
					y: 0,
				},
			});
		};

		fireConfetti();
	}, []);
	return <div className="sr-only" id="confetti"></div>;
};
