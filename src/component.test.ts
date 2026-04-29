import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Counter } from './components/counter/counter';

describe('Component System', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // This is the missing piece!
        // Without this, document.body just grows and grows with every test.
        document.body.innerHTML = '';
    });

    it('should mount the template into the parent', async () => {
        const counter = new Counter(container);
        await counter.mount();

        expect(container.querySelector('.counter')).not.toBeNull();
        expect(container.querySelector('#count')?.textContent).toBe('0');
    });

    it('should increment count on click', async () => {
        const counter = new Counter(container);
        await counter.mount();

        // Let's use a more specific selector to be safe
        const btn = container.querySelector('#increment') as HTMLButtonElement;

        // Ensure the button actually exists before clicking
        expect(btn).toBeDefined();

        btn.click();

        expect(container.querySelector('#count')?.textContent).toBe('1');
    });

    it('should clean up DOM on unmount', async () => {
        const counter = new Counter(container);
        await counter.mount();
        await counter.unmount();

        expect(container.innerHTML).toBe('');
    });

    it('should be remountable', async () => {
        const counter = new Counter(container);
        await counter.mount();
        await counter.unmount();
        await counter.mount();

        expect(container.querySelector('.counter')).not.toBeNull();
    })
});
