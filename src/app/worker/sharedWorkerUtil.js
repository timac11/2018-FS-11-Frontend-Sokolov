import workerCode from './sharedWorker';

const getSharedWorker = () => {
    const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', (event) => {
            const worker = new SharedWorker(event.target.result);
            window.addEventListener('beforeunload', () => {
                worker.port.postMessage('disconnect');
            });
            res(worker);
        });
        reader.addEventListener('error', rej);
        reader.readAsDataURL(workerFile);
    });
};

export default getSharedWorker;