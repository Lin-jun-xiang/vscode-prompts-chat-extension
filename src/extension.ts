import * as vscode from 'vscode';
import fetch from 'node-fetch';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('promptsChat.insertPrompt', async () => {
        const url = 'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv';
        let response;
        try {
            response = await fetch(url);
        } catch (err) {
            vscode.window.showErrorMessage('Cannot Get the Prompt.');
            return;
        }
        const csv = await response.text();

        const lines = csv.split('\n').slice(1);
        const prompts = lines
            .map(line => {
                const [act, prompt] = line.split(/,(.+)/);
                return { act: act?.replace(/^"|"$/g, ''), prompt: prompt?.replace(/^"|"$/g, '') };
            })
            .filter(item => item.act && item.prompt);

        const items = prompts.map(p => ({
            label: p.act,
            description: p.prompt,
            prompt: p.prompt
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a prompt'
        });

        if (selected && selected.prompt) {
            try {
                await vscode.env.clipboard.writeText(selected.prompt);
                vscode.window.showInformationMessage('Prompt copied to clipboard, please paste it into Copilot Chat (Ctrl+V)');
            } catch (err) {
                vscode.window.showErrorMessage('Copy Failed: ', String(err));
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}