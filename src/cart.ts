export type ItemId = number;
export interface CartItem {
  title: string;
  price: number;
}
export interface CartJson {
  items: Record<ItemId,CartItem>;
}

export class Cart {

  private nextId = 0;
  private items: Map<ItemId,CartItem> = new Map();

  constructor(initialItems: CartItem[]) {
    initialItems.forEach(item => {
      this.addItem(item);
    });
  }

  listAll(): CartJson {
    const items: Record<ItemId,CartItem> = {};
    for (const [id, item] of this.items) {
      items[id] = item;
    }
    // Using "items" key here allows extra information to
    // be added to the API later.
    return { items };
  }

  addItem(item: CartItem): ItemId {
    const id = this.nextId++;
    this.items.set(id, item);
    return id;
  }

  deleteAll(): void {
    this.items.clear();
  }

  deleteItem(id: ItemId): CartItem | undefined {
    const item = this.items.get(id);
    this.items.delete(id);
    return item;
  }

}