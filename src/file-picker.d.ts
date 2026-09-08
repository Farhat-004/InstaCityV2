interface FilePickerAcceptType {
    description?: string;
    accept: Record<string, string[]>;
}

interface FilePickerOptions {
    types?: FilePickerAcceptType[];
    multiple?: boolean;
}

interface Window {
    showOpenFilePicker(
        options?: FilePickerOptions,
    ): Promise<FileSystemFileHandle[]>;
}