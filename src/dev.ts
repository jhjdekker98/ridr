import { Counter } from './components/counter/counter';

const app = document.getElementById('app');

if (app) {
    const counter = new Counter(app);
    counter.mount();
    console.log('Ridr Dev Sandbox: Counter mounted.');
}
