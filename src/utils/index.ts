import * as vscode from 'vscode';

export function formatPrompt(prompt: string): string {
    return `Formatted Prompt: ${prompt}`;
}

export async function showQuickPick(items: string[], placeHolder: string): Promise<string | undefined> {
    const selected = await vscode.window.showQuickPick(items, { placeHolder });
    return selected;
}