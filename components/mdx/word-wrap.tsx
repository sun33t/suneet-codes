import {
	type AnnotationHandler,
	InnerLine,
	InnerPre,
	InnerToken,
} from "codehike/code";

export const wordWrap: AnnotationHandler = {
	name: "word-wrap",
	Pre: (props) => <InnerPre className="whitespace-pre-wrap" merge={props} />,
	Line: (props) => (
		<InnerLine merge={props}>
			<div
				style={{
					textIndent: `${-props.indentation}ch`,
					marginLeft: `${props.indentation}ch`,
				}}
			>
				{props.children}
			</div>
		</InnerLine>
	),
	Token: (props) => <InnerToken merge={props} style={{ textIndent: 0 }} />,
};
