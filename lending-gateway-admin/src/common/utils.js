export const users = [
    { racf: 'sengpst', pwd: 'admin', name: "Prashant" },
    { racf: 'kumamfs', pwd: 'admin', name: "Manish" },
    { racf: 'aggaalh', pwd: 'admin', name: "Lavish" },
    { racf: 'sahadb', pwd: 'admin', name: "Dibendu" },
    { racf: 'rsbct', pwd: 'admin', name: "Sahadevan" }
]


export const status={
    // SUBMITTED :"yel"
    // || IN-REVIEW || APPROVED || PARTIALAPPROVED || REJECTED
}

export const downloadFiles = (files = []) => {
    files.forEach(fileData => {
        const [filename, mimeType, base64String] = fileData.split('|');
        // Create a Blob from the base64 string
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(link.href);
    });
};