// Super minimal types based on https://www.tampermonkey.net/documentation.php
// I will update/extend as needed
interface GM {
    xmlHttpRequest: (details: {
        method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE";
        url: string | URL | File | Blob;
        headers?: Record<string, string>;
        data?: string | Blob | File | Object | Array | FormData | URLSearchParams;
        responseType?: "arraybuffer" | "blob" | "json" | "stream";
    }) => Promise<{
        status: number;
        statusText: string;
        response: any;
        responseText: string;
    }>;
}

declare const GM: readonly GM;