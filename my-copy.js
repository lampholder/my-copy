document.body.style.border = "5px solid red";

let formatAsJson = (title, formContent) => {
    return JSON.stringify(formContent, null, 2);
};

let formatAsMarkdown = (title, formContent) => {
    return `# ${title}\n\nWeb form submitted at: ${new Date().toISOString()}\n\n` + formContent.map(field => `\n## ${field.name} (${field.type})\n\n${field.value}\n`).join('\n');
}

window.addEventListener('load', function() {
    console.log('Eye loaded');
    [...document.getElementsByTagName('form')].forEach(form => {
        form.addEventListener('submit', e => {
            try {
                let formContent = [...form].map(field => {
                    return {
                        'name': field.name,
                        'id': field.id,
                        'type': field.type,
                        'value': field.value
                    };
                });

                let message = {
                    content: formatAsMarkdown(document.title, formContent),
                    filename: `${document.title}.${new Date().toISOString()}.txt`.replace(/[/\\?%*:|"<>]/g, '-'),
                    saveAs: false
                };

                console.error(message);

                browser.runtime.sendMessage(message);
            }
            catch (e) {
                console.error(e);
            }

            /*
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(formContent)));

            element.setAttribute('download', 'filefile');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            */
        });
    });
});
