import axios from 'axios';
import { ICategory } from '../interfaces/interfaces';

const recalculateTheNumberOfProducts = async (
    categoryId: string | number,
    categories: ICategory[],
    quantityChange: number,
) => {
    const category = categories.find((e) => {
        return e.id === categoryId;
    });
    const categoriesWillChange = findAllParentCategories(category as ICategory, categories);
    if (quantityChange !== 0) {
        for (const category of categoriesWillChange) {
            category.products_quantity += quantityChange;
            await axios({
                method: 'put',
                url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/categories/${category.id}`,
                data: category,
            });
        }
    }
};

const findAllParentCategories = (childrenCategory: ICategory, categories: ICategory[]) => {
    const categoriesWillChange = [childrenCategory];
    let parentId = childrenCategory.parent_category_id;

    while (parentId !== 'null') {
        const parentCategory = categories.find((category) => {
            return category.id === parentId;
        });
        if (parentCategory) {
            categoriesWillChange.push(parentCategory);
            parentId = parentCategory.parent_category_id;
        }
    }
    return categoriesWillChange;
};

const recalculateTheNumberOfProductsWhenDeleteCategory = async (
    categoryId: string | number,
    categories: ICategory[],
    quantityChange: number,
) => {
    const category = categories.find((e) => {
        return e.id === categoryId;
    });
    const categoriesWillChange = findAllParentCategories2(category as ICategory, categories);
    if (quantityChange !== 0) {
        for (const category of categoriesWillChange) {
            category.products_quantity += quantityChange;
            await axios({
                method: 'put',
                url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/categories/${category.id}`,
                data: category,
            });
        }
    }
};

const findAllParentCategories2 = (childrenCategory: ICategory, categories: ICategory[]) => {
    const categoriesWillChange = [];
    let parentId = childrenCategory.parent_category_id;

    while (parentId !== 'null') {
        const parentCategory = categories.find((category) => {
            return category.id === parentId;
        });
        if (parentCategory) {
            categoriesWillChange.push(parentCategory);
            parentId = parentCategory.parent_category_id;
        }
    }
    return categoriesWillChange;
};

export { recalculateTheNumberOfProducts, recalculateTheNumberOfProductsWhenDeleteCategory };
