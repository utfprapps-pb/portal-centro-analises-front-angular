export class Stack<T> {
    private elementos: T[] = [];

    // Insere um elemento no topo da pilha
    push(item: T): void {
        this.elementos.push(item);
    }

    // Remove e retorna o elemento no topo da pilha
    pop(): T | undefined {
        return this.elementos.pop();
    }

    // Retorna o elemento no topo da pilha sem removê-lo
    peek(): T | undefined {
        return this.elementos[this.elementos.length - 1];
    }

    // Verifica se a pilha está vazia
    isEmpty(): boolean {
        return this.elementos.length === 0;
    }

    // Força a pilha a ficar vazia
    clear(): void {
        this.elementos = [];
    }

    // Retorna o tamanho da pilha
    size(): number {
        return this.elementos.length;
    }
}
