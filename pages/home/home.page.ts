import {Locator, Page, expect} from '@playwright/test';
import { FilterFragment, SortOption } from './filter.fragment';

export class HomePage {
readonly page: Page;
readonly productName: Locator;
readonly productPrice: Locator;
readonly filters: FilterFragment;


constructor(page:Page){
    this.page = page;
    this.productName = page.getByTestId("product-name");
    this.productPrice = page.getByTestId("product-price");
    this.filters = new FilterFragment(this.page);
}
async goto(): Promise<void> {
    await this.page.goto('/');
}
async getProductNames(): Promise<string[]> {
    const productNames = await this.productName.allTextContents();
    return productNames;
}
async getProductPrices(): Promise<number[]> {
const productPrices = await this.productPrice.allTextContents();
return productPrices.map((price) => parseInt(price.replace('$','').trim()));
}

async expectSortedProducts (sortBy: SortOption): Promise<void> {
    switch (sortBy) {
        case 'Name (A - Z)': {
            const productNames = await this.getProductNames();
            const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));
            expect(productNames,`Products are not sorted from ${sortBy}`).toEqual(sortedProductNames);
            break;
        }
        case 'Name (Z - A)': {
            const productNames = await this.getProductNames();
            const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
            expect(productNames,`Products are not sorted from ${sortBy}`).toEqual(sortedProductNames);  
            break;
    }
    case 'Price (Low - High)': {
        const productPrices = await this.getProductPrices();
        const sortedProductPrices = [...productPrices].sort((a, b) => a - b );
        expect(productPrices,`Products are not sorted from ${sortBy}`).toEqual(sortedProductPrices);  
        break;
    }
    case 'Price (High - Low)': {
        const productPrices = await this.getProductPrices();
        const sortedProductPrices = [...productPrices].sort((a, b) => b - a );
        expect(productPrices,`Products are not sorted from ${sortBy}`).toEqual(sortedProductPrices);  
        break;
    }
    default:
        throw new Error (`Unknown sort option ${String(sortBy)}`);
}
    }
};