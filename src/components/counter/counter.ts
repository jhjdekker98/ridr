import { Component } from '../../component';

export class Counter extends Component {
    static template = `
        <div class="counter">
            <span id="count">0</span>
            <button id="increment">+</button>
        </div>
    `;

    private count = 0;

    protected onMount(): void {
        const btn = this.element?.querySelector('#increment');
        const display = this.element?.querySelector('#count');

        btn?.addEventListener('click', () => {
            this.count++;
            if (display) display.textContent = this.count.toString();
        });
    }
}
