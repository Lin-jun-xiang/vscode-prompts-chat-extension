import * as vscode from 'vscode';
import { fetchPrompts } from '../promptsChatApi';
import { showQuickPick } from '../utils';

export async function addPrompt() {
    const prompts = await fetchPrompts();
    const selectedPrompt = await showQuickPick(prompts, 'Select a prompt to add as a one-time use for GitHub Copilot');

    if (selectedPrompt) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString(selectedPrompt));
            vscode.window.showInformationMessage('Prompt added as a one-time use for GitHub Copilot!');
        } else {
            vscode.window.showWarningMessage('No active editor found.');
        }
    } else {
        vscode.window.showWarningMessage('No prompt selected.');
    }
}