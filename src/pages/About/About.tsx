/* eslint-disable no-loop-func */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import styled from 'styled-components';
import { IBranch } from '../../interfaces/interfaces';

const StyledBranchesList = styled.div`
    padding: 30px 50px 50px;
    .city-item {
        margin-bottom: 15px;
        .city-name {
            font-size: 1.4rem;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        .branch-name {
            font-size: 2.2rem;
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        .branch-address {
            text-align: center;
            font-size: 1.4rem;
            color: rgba(61, 61, 61);
            margin-bottom: 15px;
        }
    }
    img {
        width: 100%;
    }
`;

const StyledBanner = styled.div`
    padding-top: 140px;
    img {
        width: 100%;
    }
`;

type BranchOfCities = { id: string; name: string; branches: IBranch[] };

const About = () => {
    const [cities, setCities] = useState<BranchOfCities[]>([]);
    useEffect(() => {
        document.title = 'Giới thiệu | CLOWNZⓇ STREETWEAR';
        axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/store_branches').then((result) => {
            let cites: Set<string> = new Set(
                result.data.map((item: IBranch) => {
                    return item.city;
                }),
            );
            let data: BranchOfCities[] = [];
            cites.forEach((city, index) => {
                const branchesStore: IBranch[] = result.data.filter((item: IBranch) => {
                    return item.city === city;
                });
                data.push({ id: index, name: city, branches: branchesStore });
            });
            console.log(data);
            setCities(data);
        });
    }, []);
    return (
        <div>
            <Header primary={true}></Header>
            <StyledBanner>
                <img src="/images/branches/branch-page-banner.webp" alt="" />
            </StyledBanner>
            <StyledBranchesList>
                {cities &&
                    cities.map((city) => {
                        return (
                            <div key={city.id} className="city-item">
                                <h2 className="city-name">CLOWNZ STORE {city.name}</h2>
                                <div>
                                    {city.branches.length > 0 &&
                                        city.branches.map((branch, index) => {
                                            return (
                                                <div key={branch.id}>
                                                    <h4 className="branch-name">{branch.name}</h4>
                                                    <p className="branch-address">{branch.address}</p>
                                                    <img src={branch.image} alt="" />
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </StyledBranchesList>
            <Footer></Footer>
        </div>
    );
};

export default About;
