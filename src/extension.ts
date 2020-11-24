// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Parser } from './parser';
// 引入 TreeViewProvider 的类
import { TaskTreeDataProvider } from './TaskTreeDataProvider';

import { Info } from "./Info";
import { TaskTreeItem } from './TaskTreeItem';
import { info } from 'console';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "test" is now active!');

	const Provider = new TaskTreeDataProvider();
	vscode.window.registerTreeDataProvider("treeView-item1", Provider);

	let task1 = vscode.commands.registerCommand("task.task1", () => {
		async function handler() {
			const editor = vscode.window.activeTextEditor;
			if (editor) {

				//读取文件类型，判断是不是.ts文件
				const document = editor.document;
				const languageId = document.languageId;
				vscode.window.showInformationMessage(languageId);
				if (languageId == 'typescript') {
					// 如果是，则区分文件内部注释/非注释
					let parser: Parser = new Parser();
					parser.SetRegex(editor, languageId);
					parser.FindSingleLineComments(editor);
					parser.FindMultilineComments(editor);
					// // 将注释删掉
					vscode.workspace.applyEdit(parser.edit);
					let aaa = new vscode.WorkspaceEdit();
					vscode.workspace.applyEdit(aaa);
				}			
			}	
		}
	
		handler().then();
	  });

	let task2 = vscode.commands.registerCommand("task.task2", () => {
		async function handler() {
		const editor = vscode.window.activeTextEditor;
		if (editor) {			
			// 将聚焦的文件中前两行输出成消息弹窗
			let startPos = new vscode.Position(0, 0);
			let endPos = new vscode.Position(2, 0);
			let range = new vscode.Range(startPos, endPos);
			vscode.window.showInformationMessage(editor.document.getText(range));
		}

		}
		handler().then();

	});

	let task3 = vscode.commands.registerCommand("task.task3", () => {
		async function handler() {
		const editor = vscode.window.activeTextEditor;
			if (editor) {

				// 新文件的路径

				let uri_v2 = editor.document.uri;
				let uri_path = uri_v2.path;
				var splitted = uri_path.split('/');
				var uri_filename = splitted.reverse()[0];
				var uri_dir = uri_path.split(uri_filename)[0];
				let uri2_path = uri_dir + "back" + uri_filename;
				let uri2 = vscode.Uri.file(uri2_path);
				// 把当前文件拷贝到新文件路径
				vscode.workspace.fs.copy(uri_v2,uri2);
			}
		}
		handler().then();
	});
	

	  context.subscriptions.push(task1, task2, task3);
}




// this method is called when your extension is deactivated
export function deactivate() { }
