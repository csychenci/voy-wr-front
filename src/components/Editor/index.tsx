import React, { FC, useRef, useState } from "react";
import MonacoEditor, { OnMount, OnChange } from "@monaco-editor/react";
import "./index.less";

const Editor: FC<{}> = (props) => {
	const [resultList, setResultList] = useState<string[]>([
		"### WRITE YOUR CODE BELOW HERE ###",
		"# 1. Set the note to play for each switch (numbers between 21 and 108):",
		"switch_1_note = 60 # middle C",
		"switch_2_note = 62 # D",
		"switch_3_note = 64 # E",
		"switch_4_note = 65 # F"
	]);
	const [currentVal, setCurrentVal] = useState(">>> ");
	const editorRef = useRef<Parameters<OnMount>[0]>(null);

	const handleEditorMount: OnMount = (editor, monaco) => {
		const model = editor.getModel();
		// 定义装饰器
		editor.addCommand(monaco.KeyCode.Enter, () => {
			const model = editor.getModel();
			const lastLineNumber = model.getLineCount();
			const code = model.getLineMaxColumn(lastLineNumber);
		});

		editor.onDidChangeCursorPosition(function (event) {
			const currentPosition = event.position;
			const model = editor.getModel();
			const lastLineNumber = model.getLineCount();
			if (currentPosition.lineNumber !== lastLineNumber) {
				editor.setPosition({
					lineNumber: lastLineNumber,
					column: model.getLineMaxColumn(lastLineNumber)
				});
			}
		});

		editorRef.current = editor;
	};

	return (
		<div className="voy-editor">
			<MonacoEditor
				height="100%"
				language={"python"}
				options={{
					fontSize: 14,
					scrollBeyondLastLine: false,
					// 到了末尾依然可以滚动一行
					scrollbar: {
						// 控制滚动条size
						verticalScrollbarSize: 6,
						horizontalSliderSize: 6
					},
					readOnly: false,
					lineNumbers: "off",
					minimap: { enabled: false }
				}}
				onMount={handleEditorMount}
				// onChange={handleEditorChange}
				value={[...resultList, currentVal]?.join("\n")}
			/>
			<div className="editor-command">
				<input />
			</div>
		</div>
	);
};

export default Editor;
