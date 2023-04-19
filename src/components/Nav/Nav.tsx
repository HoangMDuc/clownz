/* eslint-disable no-loop-func */
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import NavItem from '../NavItem/NavItem';
import { ICategory, IMenu } from '../../interfaces/interfaces';

interface CategoryItem {
    id: string;
    name: string;
    childrens: CategoryItem[];
}

const Nav = () => {
    const [categories, setCategories] = useState<IMenu[]>([]);
    // console.log(categories);
    useEffect(() => {
        fetch('https://62890e4b10e93797c162141e.mockapi.io/clownz/categories')
            .then((res) => res.json())
            .then((categories) => {
                function buildCategoryTree(categories: ICategory[]) {
                    const categoryTree: CategoryItem[] = [];
                    categories.forEach((category) => {
                        if (category.parent_category_id === 'null') {
                            const categoryObj: CategoryItem = {
                                id: category.id,
                                name: category.name,
                                childrens: [],
                            };
                            categoryTree.push(categoryObj);
                            buildSubcategoryTree(categoryObj, categories);
                        }
                    });
                    return categoryTree;
                }

                function buildSubcategoryTree(categoryObj: CategoryItem, categories: ICategory[]) {
                    categories.forEach((category) => {
                        if (category.parent_category_id === categoryObj.id) {
                            const subcategoryObj = {
                                id: category.id,
                                name: category.name,
                                childrens: [],
                            };
                            categoryObj.childrens.push(subcategoryObj);
                            buildSubcategoryTree(subcategoryObj, categories);
                        }
                    });
                }

                const categoryTree = buildCategoryTree(categories);
                setCategories(categoryTree);
            });
    }, []);

    return (
        <div className="nav">
            <NavItem padding="10px 20px" to="/">
                Trang chủ
            </NavItem>
            <NavItem padding="10px 20px" to="/about">
                Giới thiệu
            </NavItem>
            <NavItem iconRight={faAngleDown} dropdown={categories} to="/collection/all" id="-1">
                Sản phẩm
            </NavItem>
            <NavItem padding="10px 20px" to="/new-arrival">
                New Arrival
            </NavItem>

            <NavItem padding="10px 20px" to="/contact">
                Liên Hệ
            </NavItem>
        </div>
    );
};

export default Nav;
