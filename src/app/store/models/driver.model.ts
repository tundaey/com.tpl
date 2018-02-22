
export interface Driver {
    id: string,
    _id: any,
    last_name?: string;
    first_name?: string;
    dob?: Date;
    mobile?: string;
    land_line?: string;
    address?: string;
    email?: string;
    phone?: string;
    last_drug_test?: Date;
    physical_exp?: Date;
    cdl_exp?: Date;
    drv_license?: string ;
    hazmat?: string;
    checked: boolean;
    enable?: boolean;
}

// export interface Driver {
//     id: string;
//     name: string;
//     progress: string;
//     checked: boolean;
//     enable: boolean;
//     color: string;
//     date: Date
// }