import { IAddressApi, IDistrict, IUserAddress, IWard } from '../interfaces/interfaces';

const getDistrictOfProvince = (province_code: string | number, data: IAddressApi[]) => {
    const province = data.find((province) => {
        return province.code === Number(province_code);
    });

    if (province) {
        return province.districts;
    }

    return data[0].districts;
};

const getWardsOfDistrict = (province_code: string | number, district_code: string | number, data: IAddressApi[]) => {
    const districts = getDistrictOfProvince(province_code, data);
    if (districts) {
        const district = districts.find((element) => {
            // console.log(province_code, element.code);
            return element.code === Number(district_code);
        });
        return district ? district.wards : [];
    }
    return data[0].districts[0].wards;
};

const getProvinceNameByCode = (province_code: string | number, data: IAddressApi[]) => {
    const province = data.find((province) => {
        return Number(province_code) === province.code;
    });
    return province ? province.name : '';
};

const getDistrictNameByCode = (province_code: string | number, district_code: string | number, data: IAddressApi[]) => {
    const districts = getDistrictOfProvince(province_code, data);
    if (districts) {
        const district = districts.find((district: IDistrict) => {
            return district.code === Number(district_code);
        });
        return district ? district.name : '';
    }
    return '';
};

const getWardNameByCode = (
    province_code: string | number,
    district_code: string | number,
    ward_code: string | number,
    data: IAddressApi[],
) => {
    const wards = getWardsOfDistrict(province_code, district_code, data);
    if (wards) {
        const ward = wards.find((ward: IWard) => {
            return ward.code === Number(ward_code);
        });
        return ward ? ward.name : '';
    }
    return '';
};

const checkAddressDefault = (listAddress: IUserAddress[]) => {
    const defaultAddress = listAddress.find((address) => {
        return address.isDefault === true;
    });
    return defaultAddress && defaultAddress.id ? defaultAddress.id : '';
};

const getAddressByUserId = (user_id: string, address: IUserAddress[]) => {
    const user_address = address.filter((e) => {
        return e.user_id === user_id;
    });
    return user_address;
};

export {
    getDistrictOfProvince,
    getProvinceNameByCode,
    getWardNameByCode,
    getWardsOfDistrict,
    getDistrictNameByCode,
    checkAddressDefault,
    getAddressByUserId,
};
